import { StyleSheet } from 'react-native-unistyles'

// Style khusus grid produk, dipakai bersama oleh FlatList / FlashList / LegendList
export const productList = StyleSheet.create({
  // padding 10 + padding 6 di tiap kartu = jarak 16 dari tepi layar
  content: { paddingHorizontal: 10, paddingBottom: 16 },
  // FlatList saja: supaya item ganjil di baris terakhir tidak melebar
  flatListColumn: { flex: 1, maxWidth: '50%' },
})
