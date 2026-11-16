import { StyleSheet } from 'react-native-unistyles'

export const SHEET_MARGIN = 16
export const SHEET_RADIUS = 20

export const styles = StyleSheet.create((theme) => ({
  // floating sheet: does not touch the left/right edges of the device
  sheet: { marginHorizontal: SHEET_MARGIN },
  body: { paddingHorizontal: 16, paddingBottom: 16 },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 12,
    alignSelf: 'stretch',
  },
  // same radius as backgroundStyle so the bottom corners stay rounded
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: theme.colors.card,
    borderBottomLeftRadius: SHEET_RADIUS,
    borderBottomRightRadius: SHEET_RADIUS,
  },
}))
