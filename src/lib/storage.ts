import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage } from 'zustand/middleware'

// Storage adapter untuk zustand persist (setara localStorage di browser)
export const asyncStorage = createJSONStorage(() => AsyncStorage)
