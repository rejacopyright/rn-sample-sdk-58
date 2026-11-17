import { StyleSheet } from 'react-native-unistyles'

const BAR_HEIGHT = 44

export const styles = StyleSheet.create((theme, rt) => ({
  // overlays the content; the bar itself stays transparent until the screen is scrolled
  container: { position: 'absolute', top: 0, left: 0, right: 0 },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  bar: {
    height: rt.insets.top + BAR_HEIGHT,
    paddingTop: rt.insets.top,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  // translucent circle (dark in light mode, light in dark mode) so it stays visible over any image
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.overlay,
  },
  title: { flex: 1, color: theme.colors.text, fontSize: 16, fontWeight: '600' },
}))
