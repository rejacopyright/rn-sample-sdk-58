import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create({
  // centered inside the full-screen box; the white fill hugs the image, not the screen
  center: { alignItems: 'center', justifyContent: 'center' },
  fitted: { backgroundColor: '#fff' },
  loading: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
})
