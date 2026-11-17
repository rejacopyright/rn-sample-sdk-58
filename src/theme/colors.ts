export const lightTheme = {
  colors: {
    background: '#ffffff',
    card: '#ffffff',
    muted: '#f3f4f6',
    text: '#111827',
    mutedText: '#6b7280',
    primary: '#2563eb',
    onPrimary: '#ffffff',
    danger: '#dc2626',
    star: '#f59e0b',
    border: '#e5e7eb',
    // translucent button over images: dark in light mode, light in dark mode
    overlay: 'rgba(0, 0, 0, 0.2)',
    onOverlay: '#ffffff',
  },
} as const

export const darkTheme = {
  colors: {
    background: '#0b0f14',
    card: '#1f2937',
    muted: '#374151',
    text: '#f9fafb',
    mutedText: '#9ca3af',
    primary: '#3b82f6',
    onPrimary: '#ffffff',
    danger: '#f87171',
    star: '#fbbf24',
    border: '#374151',
    overlay: 'rgba(255, 255, 255, 0.25)',
    onOverlay: '#111827',
  },
} as const

export type ThemeMode = 'light' | 'dark'
