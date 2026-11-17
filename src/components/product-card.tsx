import type { Product } from '@/types/product'
import { common } from '@/styles/common'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './product-card.styles'

type Props = {
  item: Product
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

const LOW_STOCK = 10

// Shared by all three list versions so the comparison is fair
export const ProductCard = memo(function ProductCard({
  item,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const discount = Math.round(item.discountPercentage)
  // dummyjson `price` is already discounted, so derive the original price from the percentage
  const originalPrice = (item.price / (1 - item.discountPercentage / 100)).toFixed(2)

  return (
    <View style={styles.cell}>
      <Pressable
        style={[common.card, styles.card]}
        onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
      >
        <View>
          <Image source={item.thumbnail} style={styles.image} contentFit='contain' />
          {discount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>-{discount}%</Text>
            </View>
          ) : null}
          <Pressable style={styles.heartButton} onPress={() => onToggleFavorite(item.id)}>
            <Text style={styles.heart}>{isFavorite ? '♥' : '♡'}</Text>
          </Pressable>
        </View>
        <Text style={styles.category} numberOfLines={1}>
          {item.category.replace(/-/g, ' ')}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.rating}>★ {item.rating.toFixed(1)}</Text>
          {item.stock < LOW_STOCK ? (
            <Text style={styles.lowStock}>Only {item.stock} left</Text>
          ) : null}
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          {discount > 0 ? <Text style={styles.originalPrice}>${originalPrice}</Text> : null}
        </View>
      </Pressable>
    </View>
  )
})
