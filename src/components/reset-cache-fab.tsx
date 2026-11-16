import { useQueryClient } from '@tanstack/react-query'
import { Pressable, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

// FAB: hapus cache produk lalu muat ulang dari halaman pertama (list kembali ke atas)
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

// Tinggi tab bar bawaan iOS (konten layar memanjang sampai di bawahnya)
const TAB_BAR_HEIGHT = 49

const styles = StyleSheet.create((theme, rt) => ({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: TAB_BAR_HEIGHT + rt.insets.bottom + 16,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.danger,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  icon: { color: theme.colors.onPrimary, fontSize: 18, lineHeight: 22 },
  text: { color: theme.colors.onPrimary, fontWeight: '700' },
}))
