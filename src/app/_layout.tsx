import { NativeTabs } from 'expo-router/native-tabs'
import { useUnistyles } from 'react-native-unistyles'
import QueryProvider from '../providers/query-provider'
import ThemeProvider from '../providers/theme-provider'

export default function TabLayout() {
  const { theme } = useUnistyles()

  return (
    <ThemeProvider>
      <QueryProvider>
        <NativeTabs backgroundColor={theme.colors.card} disableTransparentOnScrollEdge>
          <NativeTabs.Trigger name='(home)'>
            <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf='house.fill' md='home' />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name='product'>
            <NativeTabs.Trigger.Label>Product</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf='bag.fill' md='shopping_bag' />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name='profile'>
            <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
            <NativeTabs.Trigger.Icon sf='person.fill' md='person' />
          </NativeTabs.Trigger>
        </NativeTabs>
      </QueryProvider>
    </ThemeProvider>
  )
}
