import { Stack } from 'expo-router'

// animation: 'none' so switching between FlatList / FlashList / LegendList has no transition.
// The detail screen is the exception: it slides in. Its header is custom (see ProductDetailHeader).
export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name='[id]' options={{ animation: 'default' }} />
    </Stack>
  )
}
