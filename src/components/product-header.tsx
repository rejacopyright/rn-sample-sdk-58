import { Link } from 'expo-router'
import { Text, TextInput, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

const tabs = [
  { label: 'FlatList', href: '/product' },
  { label: 'FlashList', href: '/product/flash' },
  { label: 'LegendList', href: '/product/legend' },
] as const

type Props = {
  search: string
  onSearch: (text: string) => void
  active: (typeof tabs)[number]['label']
}

// Kolom cari + pindah antar versi list (hanya untuk keperluan perbandingan)
export function ProductHeader({ search, onSearch, active }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder='Cari produk...'
        placeholderTextColor='#888'
        value={search}
        onChangeText={onSearch}
      />
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Link key={tab.label} href={tab.href} replace style={styles.tab(tab.label === active)}>
            <Text style={styles.tabText(tab.label === active)}>{tab.label}</Text>
          </Link>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create((theme, rt) => ({
  container: { paddingTop: rt.insets.top + 12, paddingHorizontal: 16, paddingBottom: 4, gap: 8 },
  search: {
    borderWidth: 1,
    borderColor: '#8884',
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
    color: theme.colors.text,
  },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: (active: boolean) => ({
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden' as const,
    backgroundColor: active ? theme.colors.primary : theme.colors.card,
  }),
  tabText: (active: boolean) => ({
    fontWeight: '600' as const,
    color: active ? theme.colors.onPrimary : theme.colors.text,
  }),
}))
