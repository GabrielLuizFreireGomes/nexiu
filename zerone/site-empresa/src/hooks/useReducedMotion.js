import { useSyncExternalStore } from 'react'
import { getReducedMotion, subscribeReducedMotion } from '../utils/motionPreference'

const getServerSnapshot = () => false

/** A experiência começa com efeitos ativos; o visitante pode reduzi-los. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerSnapshot)
}
