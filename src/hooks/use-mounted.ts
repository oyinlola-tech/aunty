import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

/**
 * Returns true only after the component has hydrated in the browser.
 * Use it to gate UI that depends on client-only data (e.g. the persisted
 * cart) so the server HTML and the first client render stay identical and
 * React hydration never mismatches.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}
