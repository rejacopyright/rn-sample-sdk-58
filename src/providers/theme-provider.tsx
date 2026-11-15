import AsyncStorage from '@react-native-async-storage/async-storage'
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from 'expo-router'
import { PropsWithChildren, useEffect } from 'react'
import { Appearance } from 'react-native'
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles'
import { ThemeMode } from '../theme/colors'

const STORAGE_KEY = 'theme-mode'

export function setThemeMode(mode: ThemeMode) {
  UnistylesRuntime.setTheme(mode)
  // Make native UI (tab bar, status bar, alerts) follow the chosen mode too
  Appearance.setColorScheme(mode)
  AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {})
}

export function toggleThemeMode() {
  setThemeMode(UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark')
}

export function useThemeMode(): ThemeMode {
  const { rt } = useUnistyles()
  return rt.themeName === 'dark' ? 'dark' : 'light'
}

export default function ThemeProvider({ children }: PropsWithChildren) {
  const mode = useThemeMode()

  // Restore the saved choice (default is light)
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === 'light' || saved === 'dark') {
          UnistylesRuntime.setTheme(saved)
          Appearance.setColorScheme(saved)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <NavigationThemeProvider value={mode === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </NavigationThemeProvider>
  )
}
