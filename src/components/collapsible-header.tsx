import type { CollapsingHeader } from '@/hooks/use-collapsing-header'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { styles } from './collapsible-header.styles'

type Props = {
  header: CollapsingHeader
  /** Always visible (e.g. a search field). Put the safe-area top padding here. */
  pinned: ReactNode
  /** Hides while scrolling down (e.g. a row of chips) */
  children: ReactNode
}

// Reusable floating header with a pinned part and a collapsible part, see useCollapsingHeader.
//
// How it works: the whole header slides up by `translateY` and the pinned part slides down by the
// same amount, so the pinned part stays put while the collapsible part moves up underneath it.
// (No height animation or clipping, which keeps the layout measurements reliable.)
export function CollapsibleHeader({ header, pinned, children }: Props) {
  // Destructure first: worklets should only capture the values they use, not the whole object
  const { translateY } = header

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))
  const pinnedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -translateY.value }],
  }))

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.pinned, pinnedStyle]}>
        <View onLayout={header.onPinnedLayout}>{pinned}</View>
      </Animated.View>
      <View style={styles.collapsible} onLayout={header.onCollapsibleLayout}>
        {children}
      </View>
    </Animated.View>
  )
}
