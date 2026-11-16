import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 },
  // Drawn above the collapsible part, so that part slides away underneath it
  pinned: { zIndex: 1, backgroundColor: theme.colors.background },
  collapsible: { backgroundColor: theme.colors.background },
}))
