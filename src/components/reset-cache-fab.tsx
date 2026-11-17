import { useQueryClient } from '@tanstack/react-query'
import { ArrowCounterClockwise } from 'phosphor-react-native'
import { Pressable, Text } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './reset-cache-fab.styles'

// FAB: clear the product cache and reload from the first page (list returns to the top)
export function ResetCacheFab() {
  const queryClient = useQueryClient()
  const { theme } = useUnistyles()

  return (
    <Pressable
      style={styles.fab}
      onPress={() => queryClient.resetQueries({ queryKey: ['getProducts'] })}
    >
      <ArrowCounterClockwise size={16} color={theme.colors.onPrimary} weight='bold' />
      <Text style={styles.text}>Clear</Text>
    </Pressable>
  )
}
