import { getProducts } from '@/api/product'
import { ProductCard } from '@/components/product-card'
import { ProductHeader } from '@/components/product-header'
import { ResetCacheFab } from '@/components/reset-cache-fab'
import { getErrorMessage } from '@/lib/axios'
import { favoriteStore } from '@/store/favorite'
import { useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

// VERSI 1: FlatList bawaan React Native
export default function ProductFlatList() {
  const [search, setSearch] = useState('')
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    getProducts({ q: search || undefined })

  const favorites = favoriteStore((s) => s.ids)
  const toggleFavorite = favoriteStore((s) => s.toggle)

  return (
    <View style={styles.container}>
      <ProductHeader search={search} onSearch={setSearch} active='FlatList' />

      {isLoading ? (
        <ActivityIndicator style={styles.center} />
      ) : error ? (
        <Text style={styles.error}>{getErrorMessage(error)}</Text>
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => String(item.id)}
          onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          onRefresh={refetch}
          refreshing={false}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : undefined}
          // flex + maxWidth: supaya item ganjil di baris terakhir tidak melebar
          renderItem={({ item }) => (
            <View style={styles.column}>
              <ProductCard
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            </View>
          )}
        />
      )}

      <ResetCacheFab />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: { marginTop: 32 },
  error: { color: theme.colors.text, padding: 16 },
  list: { paddingHorizontal: 10, paddingBottom: 16 },
  column: { flex: 1, maxWidth: '50%' },
}))
