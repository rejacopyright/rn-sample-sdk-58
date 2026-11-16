import { StyleSheet } from 'react-native-unistyles'

// Styles specific to the product grid, shared by FlatList / FlashList / LegendList
export const productList = StyleSheet.create({
  // 10 padding + 6 padding on each card = 16 from the screen edge
  content: { paddingHorizontal: 10, paddingBottom: 16 },
  // FlatList only: so an odd item in the last row does not stretch
  flatListColumn: { flex: 1, maxWidth: '50%' },
})
