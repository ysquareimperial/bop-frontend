import { AnimatePresence, motion } from 'framer-motion'
import { useOrder } from '../context/Order'
import { MinusIcon, PlusIcon } from './Icons'

/** "Add" pill that turns into a quantity stepper once the dish is in the order. */
export default function AddButton({ item, tone = 'light' }) {
  const { lines, add, setQty } = useOrder()
  const qty = lines[item.id] || 0

  return (
    <div className={`add add--${tone}`}>
      <AnimatePresence initial={false} mode="popLayout">
        {qty === 0 ? (
          <motion.button
            key="add"
            className="add__btn"
            onClick={() => add(item.id)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label={`Add ${item.name} to order`}
          >
            <PlusIcon /> Add
          </motion.button>
        ) : (
          <motion.div
            key="qty"
            className="add__qty"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button onClick={() => setQty(item.id, qty - 1)} aria-label={`Remove one ${item.name}`}>
              <MinusIcon />
            </button>
            <motion.span key={qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-live="polite">
              {qty}
            </motion.span>
            <button onClick={() => add(item.id)} aria-label={`Add another ${item.name}`}>
              <PlusIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
