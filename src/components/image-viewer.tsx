import { X } from 'phosphor-react-native'
import { useState } from 'react'
import { FlatList, Modal, Pressable, Text, View, useWindowDimensions } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated'
import { ImageViewerPage } from './image-viewer-page'
import { styles } from './image-viewer.styles'

type Props = {
  visible: boolean
  images: string[]
  initialIndex?: number
  // Receives the index of the image that was showing when the viewer closed
  onClose: (index: number) => void
}

// Full-screen image viewer: swipe between images, pinch / double tap to zoom, drag down to close.
export function ImageViewer({ visible, images, initialIndex = 0, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      statusBarTranslucent
      onRequestClose={() => onClose(initialIndex)}
    >
      {/* Rendered only while open, so every open starts fresh (index, zoom) */}
      {visible ? <Viewer images={images} initialIndex={initialIndex} onClose={onClose} /> : null}
    </Modal>
  )
}

type ViewerProps = Omit<Props, 'visible'> & { initialIndex: number }

function Viewer({ images, initialIndex, onClose }: ViewerProps) {
  const { width } = useWindowDimensions()
  const [index, setIndex] = useState(initialIndex)
  const [zoomed, setZoomed] = useState(false)
  const dragY = useSharedValue(0)

  const close = () => onClose(index)

  return (
    // A Modal is its own native root on Android, so it needs its own gesture root
    <GestureHandlerRootView style={styles.root}>
      <FadeOnDrag dragY={dragY} style={styles.backdrop} />

      <FlatList
        data={images}
        horizontal
        pagingEnabled
        scrollEnabled={!zoomed}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        keyExtractor={(uri) => uri}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <ImageViewerPage uri={item} dragY={dragY} onZoomChange={setZoomed} onClose={close} />
        )}
      />

      {images.length > 1 ? (
        <FadeOnDrag dragY={dragY} style={styles.counterWrap} pointerEvents='none'>
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {index + 1} / {images.length}
            </Text>
          </View>
        </FadeOnDrag>
      ) : null}

      <FadeOnDrag dragY={dragY} style={styles.fill} pointerEvents='box-none'>
        <Pressable accessibilityLabel='Close' style={styles.close} onPress={close}>
          <X size={20} color='#fff' weight='bold' />
        </Pressable>
      </FadeOnDrag>
    </GestureHandlerRootView>
  )
}

type FadeProps = {
  dragY: SharedValue<number>
  style: object | undefined
  pointerEvents?: 'none' | 'box-none'
  children?: React.ReactNode
}

// Fades out as the image is dragged away, like the Flutter viewer
function FadeOnDrag({ dragY, style, pointerEvents, children }: FadeProps) {
  const fade = useAnimatedStyle(() => ({
    opacity: interpolate(Math.abs(dragY.value), [0, 400], [1, 0.3], 'clamp'),
  }))

  return (
    <Animated.View style={[style, fade]} pointerEvents={pointerEvents ?? 'none'}>
      {children}
    </Animated.View>
  )
}
