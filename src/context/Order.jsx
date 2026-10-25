import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ITEM_BY_ID } from '../data/menu'
import { storage } from '../lib/format'

const OrderCtx = createContext(null)
const KEY = 'bop.order.v1'

export function OrderProvider({ children }) {
  // { [itemId]: qty } — drop ids that no longer exist on the menu
  const [lines, setLines] = useState(() => {
    const saved = storage.get(KEY, {})
    return Object.fromEntries(Object.entries(saved).filter(([id, q]) => ITEM_BY_ID[id] && q > 0))
  })
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => storage.set(KEY, lines), [lines])

  const setQty = useCallback((id, qty) => {
    setLines((prev) => {
      const next = { ...prev }
      const q = Math.max(0, Math.min(50, qty))
      if (q === 0) delete next[id]
      else next[id] = q
      return next
    })
  }, [])

  const add = useCallback((id) => {
    setLines((prev) => ({ ...prev, [id]: Math.min(50, (prev[id] || 0) + 1) }))
    setLastAdded({ id, at: Date.now() })
  }, [])

  const clear = useCallback(() => setLines({}), [])

  const value = useMemo(() => {
    const items = Object.entries(lines).map(([id, qty]) => ({ ...ITEM_BY_ID[id], qty }))
    const count = items.reduce((s, i) => s + i.qty, 0)
    const total = items.reduce((s, i) => s + i.qty * i.price, 0)
    return { lines, items, count, total, add, setQty, clear, open, setOpen, lastAdded }
  }, [lines, add, setQty, clear, open, lastAdded])

  return <OrderCtx.Provider value={value}>{children}</OrderCtx.Provider>
}

export const useOrder = () => useContext(OrderCtx)
