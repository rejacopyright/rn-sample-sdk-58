import { Stack } from 'expo-router'

// animation: 'none' supaya perpindahan FlatList / FlashList / LegendList tanpa transisi
export default function Layout() {
  return <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
}
