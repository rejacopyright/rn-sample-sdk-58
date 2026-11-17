import type { CollapsingHeader } from '@/hooks/use-collapsing-header'
import { filterStore } from '@/store/filter'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { SlidersHorizontal } from 'phosphor-react-native'
import { useRef } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { CategoryFilterSheet } from './category-filter-sheet'
import { CollapsibleHeader } from './collapsible-header'
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
  header: CollapsingHeader
}

// Pinned: search field + filter button. Collapsible: switcher between list versions (comparison only)
export function ProductHeader({ search, onSearch, active, header }: Props) {
  const { theme } = useUnistyles()
  const sheetRef = useRef<BottomSheetModal>(null)
  const hasFilter = !!filterStore((s) => s.category)

  return (
    <CollapsibleHeader
      header={header}
      pinned={
        <View style={styles.pinned}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.search}
              placeholder='Search products...'
              placeholderTextColor='#888'
              value={search}
              onChangeText={onSearch}
            />
            <Pressable
              accessibilityLabel='Filter by category'
              style={styles.filter(hasFilter)}
              onPress={() => sheetRef.current?.present()}
            >
              <SlidersHorizontal
                size={20}
                color={hasFilter ? theme.colors.onPrimary : theme.colors.text}
                weight='duotone'
              />
            </Pressable>
          </View>
          <CategoryFilterSheet ref={sheetRef} />
        </View>
      }
    >
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          // asChild: Pressable handles the press, so the label is a plain Text (not selectable)
          <Link key={tab.label} href={tab.href} replace asChild>
            <Pressable style={styles.tab(tab.label === active)}>
              <Text style={styles.tabText(tab.label === active)}>{tab.label}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </CollapsibleHeader>
  )
}
