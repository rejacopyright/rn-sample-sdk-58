import { Link } from 'expo-router'
import { Text, TextInput, View } from 'react-native'
import { styles } from './product-header.styles'

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
