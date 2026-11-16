import type { Product } from '@/types/product'
import { Image } from 'expo-image'
import { memo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

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
      <View style={styles.card}>
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

const styles = StyleSheet.create((theme) => ({
  // padding 6 di tiap sisi = jarak 12 antar kartu
  cell: { padding: 6 },
  card: { backgroundColor: theme.colors.card, borderRadius: 12, padding: 10, gap: 4 },
  image: { width: '100%', aspectRatio: 1 },
  title: { color: theme.colors.text, fontWeight: '600', minHeight: 36 },
  price: { color: theme.colors.primary, fontWeight: '700' },
  heartButton: { position: 'absolute', top: 0, right: 0, padding: 4 },
  heart: { fontSize: 22, color: theme.colors.text },
}))
