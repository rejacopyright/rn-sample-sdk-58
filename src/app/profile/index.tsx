import { Pressable, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { toggleThemeMode, useThemeMode } from '../../providers/theme-provider'

export default function Profile() {
  const mode = useThemeMode()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.button} onPress={toggleThemeMode}>
        <Text style={styles.buttonText}>Switch to {mode === 'light' ? 'dark' : 'light'} mode</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: theme.colors.background,
  },
  title: { fontSize: 20, fontWeight: '600', color: theme.colors.text },
  button: {
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: theme.colors.primary,
  },
  buttonText: { color: theme.colors.onPrimary, fontWeight: '600' },
}))
