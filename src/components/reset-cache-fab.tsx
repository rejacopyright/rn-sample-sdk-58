import { useQueryClient } from '@tanstack/react-query'
import { Pressable, Text } from 'react-native'
import { styles } from './reset-cache-fab.styles'

// FAB: clear the product cache and reload from the first page (list returns to the top)
export function ResetCacheFab() {
  const queryClient = useQueryClient()

  return (
    <Pressable
      style={styles.fab}
      onPress={() => queryClient.resetQueries({ queryKey: ['getProducts'] })}
    >
      <Text style={styles.icon}>↻</Text>
      <Text style={styles.text}>Clear</Text>
    </Pressable>
  )
}
