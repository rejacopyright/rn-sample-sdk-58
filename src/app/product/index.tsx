import { getProducts } from '@/api/product'
import { getErrorMessage } from '@/lib/axios'
import { favoriteStore } from '@/store/favorite'
import { Image } from 'expo-image'
import { useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export default function Product() {
  const [search, setSearch] = useState('')
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    getProducts({ q: search || undefined })

  const favorites = favoriteStore((s) => s.ids)
  const toggleFavorite = favoriteStore((s) => s.toggle)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder='Cari produk...'
        placeholderTextColor='#888'
        value={search}
        onChangeText={setSearch}
      />

      {isLoading ? (
        <ActivityIndicator style={styles.center} />
      ) : error ? (
        <Text style={styles.text}>{getErrorMessage(error)}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          onRefresh={refetch}
          refreshing={false}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : undefined}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.thumbnail} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>${item.price}</Text>
              </View>
              <Pressable onPress={() => toggleFavorite(item.id)}>
                <Text style={styles.heart}>{favorites.includes(item.id) ? '♥' : '♡'}</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  center: { marginTop: 32 },
  search: {
    borderWidth: 1,
    borderColor: '#8884',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: theme.colors.text,
  },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  image: { width: 64, height: 64, borderRadius: 8 },
  info: { flex: 1 },
  title: { color: theme.colors.text, fontWeight: '600' },
  text: { color: theme.colors.text },
  heart: { fontSize: 24, color: theme.colors.text },
}))
