import { Text, View } from 'react-native'
import { styles } from './product-banner.styles'

// Promo banner shown at the top of the product list (use as ListHeaderComponent)
type Props = {
  /** Space for the floating header (see useCollapsingHeader) */
  topSpace?: number
}

export function ProductBanner({ topSpace = 0 }: Props) {
  return (
    <View style={[styles.cell, { marginTop: topSpace }]}>
      <View style={styles.banner}>
        <Text style={styles.title}>Free shipping</Text>
        <Text style={styles.subtitle}>On all orders over $50. Limited time offer.</Text>
      </View>
    </View>
  )
}
