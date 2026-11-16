import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  pinned: { paddingTop: rt.insets.top + 12, paddingHorizontal: 16, paddingBottom: 8 },
  searchRow: { flexDirection: 'row', gap: 8 },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#8884',
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
    color: theme.colors.text,
  },
  tabs: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 8 },
  filter: (active: boolean) => ({
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: active ? theme.colors.primary : theme.colors.muted,
  }),
  filterText: (active: boolean) => ({
    fontSize: 18,
    color: active ? theme.colors.onPrimary : theme.colors.text,
  }),
  tab: (active: boolean) => ({
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: active ? theme.colors.primary : theme.colors.muted,
  }),
  tabText: (active: boolean) => ({
    fontWeight: '600' as const,
    userSelect: 'none' as const,
    color: active ? theme.colors.onPrimary : theme.colors.text,
  }),
}))
