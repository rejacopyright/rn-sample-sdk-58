export const lightTheme = {
  colors: {
    background: '#f3f4f6',
    card: '#ffffff',
    text: '#111827',
    mutedText: '#6b7280',
    primary: '#2563eb',
    onPrimary: '#ffffff',
    danger: '#dc2626',
    border: '#e5e7eb',
  },
} as const

export const darkTheme = {
  colors: {
    background: '#0b0f14',
    card: '#1f2937',
    text: '#f9fafb',
    mutedText: '#9ca3af',
    primary: '#3b82f6',
    onPrimary: '#ffffff',
    danger: '#f87171',
    border: '#374151',
  },
} as const

export type ThemeMode = 'light' | 'dark'
