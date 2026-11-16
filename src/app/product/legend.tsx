import { getProducts } from '@/api/product'
import { ProductCard } from '@/components/product-card'
import { ProductHeader } from '@/components/product-header'
import { ResetCacheFab } from '@/components/reset-cache-fab'
import { getErrorMessage } from '@/lib/axios'
import { favoriteStore } from '@/store/favorite'
import { LegendList } from '@legendapp/list/react-native'
import { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

// VERSI 3: LegendList (@legendapp/list)
export default function ProductLegendList() {
  const [search, setSearch] = useState('')
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    getProducts({ q: search || undefined })

  const favorites = favoriteStore((s) => s.ids)
  const toggleFavorite = favoriteStore((s) => s.toggle)

  return (
    <View style={styles.container}>
      <ProductHeader search={search} onSearch={setSearch} active='LegendList' />

      {isLoading ? (
        <ActivityIndicator style={styles.center} />
      ) : error ? (
        <Text style={styles.error}>{getErrorMessage(error)}</Text>
      ) : (
        <LegendList
          data={data ?? []}
          numColumns={2}
          // estimasi tinggi kartu, dipakai sebelum item diukur
          estimatedItemSize={260}
          recycleItems
          contentContainerStyle={styles.list}
          keyExtractor={(item) => String(item.id)}
          onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          onRefresh={refetch}
          refreshing={false}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : undefined}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={toggleFavorite}
            />
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
}))
