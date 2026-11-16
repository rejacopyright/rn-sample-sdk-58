import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage } from 'zustand/middleware'

// Storage adapter for zustand persist (equivalent of localStorage in the browser)
export const asyncStorage = createJSONStorage(() => AsyncStorage)
