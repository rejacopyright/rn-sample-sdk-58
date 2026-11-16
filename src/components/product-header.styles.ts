import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
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
