import type { CollapsingHeader } from '@/hooks/use-collapsing-header'
import { ActivityIndicator } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { styles } from './refresh-indicator.styles'

type Props = { header: CollapsingHeader; refreshing: boolean }

// The native pull-to-refresh spinner is drawn at the very top of the list, which is hidden behind
// the floating header. This one sits right below the header instead: it fades in while the list
// is pulled down (iOS) and stays visible while refreshing (iOS and Android).
export function RefreshIndicator({ header, refreshing }: Props) {
  const { pull } = header

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: refreshing ? 1 : pull.value,
  }))

  return (
    <Animated.View
      pointerEvents='none'
      style={[styles.container, { top: header.height + 8 }, animatedStyle]}
    >
      <ActivityIndicator />
    </Animated.View>
  )
}
