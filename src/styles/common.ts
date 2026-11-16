import { StyleSheet } from 'react-native-unistyles'

// Style global yang bisa dipakai ulang di mana saja (seperti utility / global CSS di web).
// Pemakaian: <View style={common.screen} />
// Digabung dengan style lokal: <View style={[common.card, styles.item]} />
export const common = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  center: { marginTop: 32 },
  card: { backgroundColor: theme.colors.card, borderRadius: 12 },
  errorText: { color: theme.colors.text, padding: 16 },
  text: { color: theme.colors.text },
  textBold: { color: theme.colors.text, fontWeight: '600' },
}))
