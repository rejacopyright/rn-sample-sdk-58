import { Image } from 'expo-image'
import { useState } from 'react'
import { ActivityIndicator, View, useWindowDimensions } from 'react-native'
import {
  GestureDetector,
  GestureStateManager,
  usePanGesture,
  usePinchGesture,
  useSimultaneousGestures,
  useExclusiveGestures,
  useCompetingGestures,
  useTapGesture,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { styles } from './image-viewer-page.styles'

const MAX_SCALE = 3
const DOUBLE_TAP_SCALE = 2.5
// Anything above this counts as zoomed in (so paging and drag-to-dismiss step aside)
const ZOOM_EPSILON = 1.01
const AXIS_LOCK_SLOP = 10
const DISMISS_DISTANCE = 100
const DISMISS_VELOCITY = 700

type Props = {
  uri: string
  // Vertical drag offset while swiping to dismiss, shared with the viewer to fade the backdrop
  dragY: SharedValue<number>
  onZoomChange: (zoomed: boolean) => void
  onClose: () => void
}

// One zoomable image: pinch, double tap, pan while zoomed, swipe vertically to dismiss.
export function ImageViewerPage({ uri, dragY, onZoomChange, onClose }: Props) {
  const { width, height } = useWindowDimensions()
  // Size of the fitted image, known once it loads. White so transparent PNGs stay readable.
  const [fit, setFit] = useState<{ width: number; height: number } | null>(null)

  const scale = useSharedValue(1)
  const tx = useSharedValue(0)
  const ty = useSharedValue(0)
  // Size of the image when fitted into the screen at scale 1 (updated once it loads)
  const fitW = useSharedValue(width)
  const fitH = useSharedValue(height)
  const zoomed = useSharedValue(false)

  const start = useSharedValue({ scale: 1, tx: 0, ty: 0, x: 0, y: 0 })

  // Reanimated shared values are meant to be mutated; the lint rule cannot tell them from props
  const setDrag = (value: number, animated = false) => {
    'worklet'
    // eslint-disable-next-line react-hooks/immutability
    dragY.value = animated ? withSpring(value) : value
  }

  const reportZoom = (value: boolean) => {
    'worklet'
    if (zoomed.value === value) return
    zoomed.value = value
    scheduleOnRN(onZoomChange, value)
  }

  // How far the image may be panned at a given scale before its edge would leave the screen
  const limitX = (s: number) => {
    'worklet'
    return Math.max(0, (fitW.value * s - width) / 2)
  }
  const limitY = (s: number) => {
    'worklet'
    return Math.max(0, (fitH.value * s - height) / 2)
  }
  const clamp = (value: number, limit: number) => {
    'worklet'
    return Math.min(limit, Math.max(-limit, value))
  }

  const resetTransform = () => {
    'worklet'
    scale.value = withTiming(1)
    tx.value = withTiming(0)
    ty.value = withTiming(0)
    reportZoom(false)
  }

  const pinch = usePinchGesture({
    onActivate: (e) => {
      'worklet'
      start.value = {
        scale: scale.value,
        tx: tx.value,
        ty: ty.value,
        x: e.focalX - width / 2,
        y: e.focalY - height / 2,
      }
    },
    onUpdate: (e) => {
      'worklet'
      const s = Math.min(MAX_SCALE * 1.2, Math.max(0.5, start.value.scale * e.scale))
      const ratio = s / start.value.scale
      // Keep the point that was under the fingers at the start under the fingers now
      scale.value = s
      tx.value = e.focalX - width / 2 - (start.value.x - start.value.tx) * ratio
      ty.value = e.focalY - height / 2 - (start.value.y - start.value.ty) * ratio
      if (s > ZOOM_EPSILON) reportZoom(true)
    },
    onDeactivate: () => {
      'worklet'
      if (scale.value <= 1) {
        resetTransform()
        return
      }
      const s = Math.min(MAX_SCALE, scale.value)
      scale.value = withSpring(s)
      tx.value = withSpring(clamp(tx.value, limitX(s)))
      ty.value = withSpring(clamp(ty.value, limitY(s)))
    },
  })

  // Activated by hand so a horizontal swipe at scale 1 stays with the pager, while a vertical swipe
  // dismisses and any drag while zoomed pans the image.
  const pan = usePanGesture({
    manualActivation: true,
    onTouchesDown: (e) => {
      'worklet'
      const touch = e.allTouches[0]
      start.value = { ...start.value, x: touch.absoluteX, y: touch.absoluteY }
    },
    onTouchesMove: (e) => {
      'worklet'
      if (e.numberOfTouches > 1) return GestureStateManager.fail(e.handlerTag)

      const dx = e.allTouches[0].absoluteX - start.value.x
      const dy = e.allTouches[0].absoluteY - start.value.y

      if (scale.value > ZOOM_EPSILON) {
        if (Math.hypot(dx, dy) > AXIS_LOCK_SLOP) GestureStateManager.activate(e.handlerTag)
      } else if (Math.abs(dy) > AXIS_LOCK_SLOP && Math.abs(dy) > Math.abs(dx) * 1.2) {
        GestureStateManager.activate(e.handlerTag)
      } else if (Math.abs(dx) > AXIS_LOCK_SLOP) {
        GestureStateManager.fail(e.handlerTag)
      }
    },
    onActivate: () => {
      'worklet'
      start.value = { ...start.value, tx: tx.value, ty: ty.value }
    },
    onUpdate: (e) => {
      'worklet'
      if (scale.value > ZOOM_EPSILON) {
        tx.value = clamp(start.value.tx + e.translationX, limitX(scale.value))
        ty.value = clamp(start.value.ty + e.translationY, limitY(scale.value))
      } else {
        setDrag(e.translationY)
      }
    },
    onDeactivate: (e) => {
      'worklet'
      if (scale.value > ZOOM_EPSILON) {
        const lx = limitX(scale.value)
        const ly = limitY(scale.value)
        tx.value = withDecay({ velocity: e.velocityX, clamp: [-lx, lx] })
        ty.value = withDecay({ velocity: e.velocityY, clamp: [-ly, ly] })
        return
      }
      if (Math.abs(dragY.value) > DISMISS_DISTANCE || Math.abs(e.velocityY) > DISMISS_VELOCITY) {
        scheduleOnRN(onClose)
        return
      }
      setDrag(0, true)
    },
  })

  const doubleTap = useTapGesture({
    numberOfTaps: 2,
    onDeactivate: (e) => {
      'worklet'
      if (e.canceled) return
      if (scale.value > ZOOM_EPSILON) return resetTransform()

      // Zoom in around the tapped point
      const s = DOUBLE_TAP_SCALE
      const tapX = e.x - width / 2
      const tapY = e.y - height / 2
      scale.value = withTiming(s)
      tx.value = withTiming(clamp(tapX * (1 - s), limitX(s)))
      ty.value = withTiming(clamp(tapY * (1 - s), limitY(s)))
      reportZoom(true)
    },
  })

  // A tap on the empty area around the image closes the viewer
  const singleTap = useTapGesture({
    onDeactivate: (e) => {
      'worklet'
      if (e.canceled) return
      const insideX = Math.abs(e.x - width / 2 - tx.value) <= (fitW.value * scale.value) / 2
      const insideY = Math.abs(e.y - height / 2 - ty.value) <= (fitH.value * scale.value) / 2
      if (!insideX || !insideY) scheduleOnRN(onClose)
    },
  })

  const gesture = useCompetingGestures(
    useExclusiveGestures(doubleTap, singleTap),
    useSimultaneousGestures(pinch, pan),
  )

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value + dragY.value },
      { scale: scale.value },
    ],
  }))

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ width, height }} collapsable={false}>
        <Animated.View style={[{ width, height }, styles.center, imageStyle]}>
          <Image
            source={uri}
            style={fit ? [fit, styles.fitted] : { width, height }}
            contentFit='contain'
            onLoad={({ source }) => {
              const ratio = Math.min(width / source.width, height / source.height)
              fitW.value = source.width * ratio
              fitH.value = source.height * ratio
              setFit({ width: source.width * ratio, height: source.height * ratio })
            }}
          />
        </Animated.View>
        {fit ? null : (
          <View style={styles.loading} pointerEvents='none'>
            <ActivityIndicator color='#fff' />
          </View>
        )}
      </View>
    </GestureDetector>
  )
}
