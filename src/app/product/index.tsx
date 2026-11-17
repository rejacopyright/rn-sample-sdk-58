import { getProducts, refreshProducts } from '@/api/product'
import { ProductCard } from '@/components/product-card'
import { ProductBanner } from '@/components/product-banner'
import { ProductHeader } from '@/components/product-header'
import { RefreshIndicator } from '@/components/refresh-indicator'
import { ResetCacheFab } from '@/components/reset-cache-fab'
import { useCollapsingHeader } from '@/hooks/use-collapsing-header'
import { useRefresh } from '@/hooks/use-refresh'
import { getErrorMessage } from '@/lib/axios'
import { favoriteStore } from '@/store/favorite'
import { filterStore } from '@/store/filter'
import { common } from '@/styles/common'
import { productList } from '@/styles/product-list'
import { useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

// VERSION 1: built-in React Native FlatList
export default function ProductFlatList() {
  const [search, setSearch] = useState('')
  const category = filterStore((s) => s.category)
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = getProducts({
    q: search || undefined,
    category,
  })
  const { refreshing, onRefresh } = useRefresh(refreshProducts())
  const header = useCollapsingHeader()

  const favorites = favoriteStore((s) => s.ids)
  const toggleFavorite = favoriteStore((s) => s.toggle)

  return (
    <View style={common.screen}>
      <ProductHeader search={search} onSearch={setSearch} header={header} active='FlatList' />

      {isLoading ? (
        <ActivityIndicator style={[common.center, { marginTop: header.height + 32 }]} />
      ) : error ? (
        <Text style={[common.errorText, { marginTop: header.height }]}>
          {getErrorMessage(error)}
        </Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={2}
          contentContainerStyle={productList.content}
          keyExtractor={(item) => String(item.id)}
          onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          onScroll={header.onScroll}
          scrollEventThrottle={16}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListHeaderComponent={<ProductBanner topSpace={header.height} />}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : undefined}
          // flex + maxWidth: so an odd item in the last row does not stretch
          renderItem={({ item }) => (
            <View style={productList.flatListColumn}>
              <ProductCard
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            </View>
          )}
        />
      )}

      <RefreshIndicator header={header} refreshing={refreshing} />
      <ResetCacheFab />
    </View>
  )
}
