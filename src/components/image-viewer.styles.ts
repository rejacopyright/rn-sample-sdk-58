import { StyleSheet } from 'react-native-unistyles'

// The viewer is always a dark overlay, so it does not follow the light/dark theme
export const styles = StyleSheet.create((_theme, rt) => ({
  root: { flex: 1 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.85)' },
  // wrapper for the close button: covers the screen so the button's absolute position is right
  fill: { ...StyleSheet.absoluteFillObject },
  counterWrap: {
    position: 'absolute',
    bottom: rt.insets.bottom + 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  counter: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  counterText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  close: {
    position: 'absolute',
    top: rt.insets.top + 8,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}))
