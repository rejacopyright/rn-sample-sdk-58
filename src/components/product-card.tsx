import type { Product } from '@/types/product'
import { common } from '@/styles/common'
import { Image } from 'expo-image'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './product-card.styles'

type Props = {
  item: Product
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

// Dipakai bersama oleh ketiga versi list supaya perbandingannya adil
export const ProductCard = memo(function ProductCard({
  item,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.cell}>
      <View style={[common.card, styles.card]}>
        <View>
          <Image source={item.thumbnail} style={styles.image} contentFit='contain' />
          <Pressable style={styles.heartButton} onPress={() => onToggleFavorite(item.id)}>
            <Text style={styles.heart}>{isFavorite ? '♥' : '♡'}</Text>
          </Pressable>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  )
})
