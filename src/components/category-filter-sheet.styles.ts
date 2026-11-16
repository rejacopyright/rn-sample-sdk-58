import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  item: (selected: boolean) => ({
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: selected ? theme.colors.primary : 'transparent',
  }),
  itemText: (selected: boolean) => ({
    fontWeight: '600' as const,
    color: selected ? theme.colors.onPrimary : theme.colors.text,
  }),
  clear: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  clearText: { color: theme.colors.danger, fontWeight: '700' },
  hint: { color: theme.colors.mutedText, paddingVertical: 12 },
}))
