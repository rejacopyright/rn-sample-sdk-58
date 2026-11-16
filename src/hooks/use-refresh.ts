import { useCallback, useState } from 'react'

/**
 * Tracks the pull-to-refresh state of a list around an async refresh function.
 * Usage: const { refreshing, onRefresh } = useRefresh(refresh)
 *        <List refreshing={refreshing} onRefresh={onRefresh} />
 */
export function useRefresh(refresh: () => Promise<unknown>) {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)

    try {
      await refresh()
    } finally {
      setRefreshing(false)
    }
  }, [refresh])

  return { refreshing, onRefresh }
}
