import { router } from 'expo-router'
import { CaretLeft } from 'phosphor-react-native'
import { Animated, Pressable } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './product-detail-header.styles'

type Props = {
  title?: string
  scrollY: Animated.Value
  // scroll offset where the background and title are fully visible
  showAt: number
}

// Transparent header with a floating back button. Background and title fade in once scrolled.
export function ProductDetailHeader({ title, scrollY, showAt }: Props) {
  const { theme } = useUnistyles()
  const opacity = scrollY.interpolate({
    inputRange: [showAt - 60, showAt],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/product'))

  return (
    <Animated.View style={styles.container} pointerEvents='box-none'>
      <Animated.View style={[styles.background, { opacity }]} pointerEvents='none' />
      <Animated.View style={styles.bar} pointerEvents='box-none'>
        <Pressable accessibilityLabel='Go back' style={styles.back} onPress={goBack}>
          <CaretLeft size={22} color={theme.colors.onOverlay} weight='bold' />
        </Pressable>
        <Animated.Text style={[styles.title, { opacity }]} numberOfLines={1}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  )
}
