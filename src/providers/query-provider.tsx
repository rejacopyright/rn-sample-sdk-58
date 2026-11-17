import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { keepPreviousData, QueryCache, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { PropsWithChildren, useState } from 'react'

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

export default function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            placeholderData: keepPreviousData,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            gcTime: 1000 * 60 * 60 * 12, // 12 hours
            // Never stale: refetch only on explicit refresh or invalidation (see mutations)
            staleTime: Infinity,
            throwOnError: false,
          },
        },
        queryCache: new QueryCache({
          onError: (err: any) => {
            const errMessage: any = err?.response?.data?.message?.reason || err?.message
            return errMessage
          },
        }),
      }),
  )

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  )
}
