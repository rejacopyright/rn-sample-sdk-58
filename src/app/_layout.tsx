import { NativeTabs } from 'expo-router/native-tabs'
import QueryProvider from '../providers/query-provider'
import ThemeProvider from '../providers/theme-provider'

export default function TabLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <NativeTabs>
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
