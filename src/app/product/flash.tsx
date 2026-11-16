import { getProducts } from '@/api/product'
import { ProductCard } from '@/components/product-card'
import { ProductHeader } from '@/components/product-header'
import { ResetCacheFab } from '@/components/reset-cache-fab'
import { getErrorMessage } from '@/lib/axios'
import { favoriteStore } from '@/store/favorite'
import { common } from '@/styles/common'
import { productList } from '@/styles/product-list'
import { FlashList } from '@shopify/flash-list'
import { useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

// VERSI 2: FlashList v2 (Shopify)
export default function ProductFlashList() {
  const [search, setSearch] = useState('')
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    getProducts({ q: search || undefined })

  const favorites = favoriteStore((s) => s.ids)
  const toggleFavorite = favoriteStore((s) => s.toggle)

  return (
    <View style={common.screen}>
      <ProductHeader search={search} onSearch={setSearch} active='FlashList' />

      {isLoading ? (
        <ActivityIndicator style={common.center} />
      ) : error ? (
        <Text style={common.errorText}>{getErrorMessage(error)}</Text>
      ) : (
        <FlashList
          data={data}
          numColumns={2}
          contentContainerStyle={productList.content}
          keyExtractor={(item) => String(item.id)}
          onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          onRefresh={refetch}
          refreshing={false}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : undefined}
          // Lebar kolom diatur FlashList, jadi tidak perlu trik maxWidth
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
