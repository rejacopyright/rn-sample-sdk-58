import { StyleSheet } from 'react-native-unistyles'
import { TAB_BAR_HEIGHT } from '@/styles/layout'

export const styles = StyleSheet.create((theme, rt) => ({
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
  text: { color: theme.colors.onPrimary, fontWeight: '700' },
}))
