import { getProductCategories } from '@/api/product'
import { filterStore } from '@/store/filter'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { Ref } from 'react'
import { Pressable, Text } from 'react-native'
import { AppBottomSheet } from './app-bottom-sheet'
import { styles } from './category-filter-sheet.styles'

type Props = { ref?: Ref<BottomSheetModal> }

// Product category filter sheet. Example of AppBottomSheet with a scrollable list and a pinned footer.
export function CategoryFilterSheet({ ref }: Props) {
  const { data: categories, isLoading } = getProductCategories()
  const category = filterStore((s) => s.category)
  const setCategory = filterStore((s) => s.setCategory)

  const select = (slug?: string) => {
    setCategory(slug)
    if (typeof ref === 'object') ref?.current?.dismiss()
  }

  return (
    <AppBottomSheet
      ref={ref}
      title='Categories'
      footer={
        <Pressable style={styles.clear} onPress={() => select(undefined)}>
          <Text style={styles.clearText}>Clear filter</Text>
        </Pressable>
      }
    >
      {isLoading ? <Text style={styles.hint}>Loading...</Text> : null}
      {categories?.map((item) => (
        <Pressable
          key={item.slug}
          style={styles.item(item.slug === category)}
          onPress={() => select(item.slug)}
        >
          <Text style={styles.itemText(item.slug === category)}>{item.name}</Text>
        </Pressable>
      ))}
    </AppBottomSheet>
  )
}
