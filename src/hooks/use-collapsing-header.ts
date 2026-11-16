import { useCallback, useEffect, useRef, useState } from 'react'
import type { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'

// Minimum scroll distance (in points) between two events before the direction counts
const DIRECTION_THRESHOLD = 4
// Overscroll distance (in points) that counts as a fully pulled refresh indicator
const PULL_DISTANCE = 60
// The collapsible part comes back when scrolling stops for this long (ms)
const IDLE_DELAY = 250
const ANIMATION_MS = 200

export type CollapsingHeader = ReturnType<typeof useCollapsingHeader>

/**
 * State for a header made of two parts (see CollapsibleHeader):
 * - a pinned part that is always visible (e.g. a search field)
 * - a collapsible part that hides while scrolling down and shows again when the user scrolls up a
 *   little, reaches the top, or stops scrolling (e.g. a row of chips)
 *
 * Usage:
 *   const header = useCollapsingHeader()
 *   <CollapsibleHeader header={header} pinned={...}>{collapsible part}</CollapsibleHeader>
 *   <List onScroll={header.onScroll} scrollEventThrottle={16} />   // header floats above the list
 *   leave `header.height` of empty space at the top of the list content
 */
export function useCollapsingHeader() {
  const [pinnedHeight, setPinnedHeight] = useState(0)
  const [collapsibleHeight, setCollapsibleHeight] = useState(0)
  // 0 = fully shown, -collapsibleHeight = fully hidden
  const translateY = useSharedValue(0)
  // 0..1, how far the list is pulled down past the top (iOS overscroll), for RefreshIndicator
  const pull = useSharedValue(0)
  const lastOffset = useRef(0)
  const hidden = useRef(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const setHidden = useCallback(
    (value: boolean) => {
      if (hidden.current === value) return

      hidden.current = value
      translateY.set(withTiming(value ? -collapsibleHeight : 0, { duration: ANIMATION_MS }))
    },
    [collapsibleHeight, translateY],
  )

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = event.nativeEvent.contentOffset.y
      const delta = offset - lastOffset.current

      lastOffset.current = offset
      pull.set(offset < 0 ? Math.min(-offset / PULL_DISTANCE, 1) : 0)

      if (offset <= 0) setHidden(false)
      else if (delta > DIRECTION_THRESHOLD) setHidden(true)
      else if (delta < -DIRECTION_THRESHOLD) setHidden(false)

      // Scrolling stopped: bring the collapsible part back
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setHidden(false), IDLE_DELAY)
    },
    [setHidden, pull],
  )

  const onPinnedLayout = useCallback((event: LayoutChangeEvent) => {
    setPinnedHeight(event.nativeEvent.layout.height)
  }, [])

  const onCollapsibleLayout = useCallback((event: LayoutChangeEvent) => {
    setCollapsibleHeight(event.nativeEvent.layout.height)
  }, [])

  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  return {
    /** Total height of the fully shown header: space to leave at the top of the list content */
    height: pinnedHeight + collapsibleHeight,
    collapsibleHeight,
    translateY,
    pull,
    onScroll,
    onPinnedLayout,
    onCollapsibleLayout,
  }
}
