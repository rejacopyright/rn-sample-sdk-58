import { Stack } from 'expo-router'

// animation: 'none' so switching between FlatList / FlashList / LegendList has no transition
export default function Layout() {
  return <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
}
