import type { FC } from 'react'
import { useRef, useEffect } from 'react'
import { Inter } from '@next/font/google'
import { presetKeys } from '../../utils/constants'
import styles from './index.module.scss'

const inter = Inter({ subsets: ['latin'] })
export type Item = { namespace: string; field?: string }

const UpdateInfoDialog: FC<{
  item: Item
  storage: Record<string, Partial<Record<string, { value?: string; optional?: string }>>>
  onSubmit: (tx: any) => void
  onDismiss: () => void
}> = ({ item, storage, onDismiss, onSubmit }) => {
  const ref = useRef<HTMLDialogElement>(null)
  // todo: use cache to fetch value

  useEffect(() => {
    if (!ref.current) return

    if (item) {
      if (!ref.current.open) {
        ref.current.showModal()
      } else {
        // ignore
      }
    } else if (!ref.current.open) {
      ref.current.close()
    }
  }, [item, ref.current, onDismiss])

  useEffect(() => {
    if (!ref.current) return
    const listener = () => onDismiss()
    ref.current.addEventListener('close', listener)
    return () => ref.current?.removeEventListener('close', listener)
  }, [ref.current])

  const content = storage[item.namespace]?.[item.field ?? '']
  const options = presetKeys[item.namespace as 'profile' | 'dweb' | 'addresses']
  const hasOptions = Array.isArray(options)
  const optionsId = `${item.namespace}-${item.field}-options`
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    console.log({
      field: e.currentTarget['update-field'].value,
      value: e.currentTarget['update-value'].value,
      optional: e.currentTarget['update-optional'].value,
    })
    // request a tx to update info
    const mockTx = 'mock tx'
    onSubmit(mockTx)
  }

  return (
    <dialog ref={ref} className={`${styles.container} ${inter.className}`}>
      <header>{item.field ? `Edit ${item.namespace}` : `Add ${item.namespace}`}</header>
      {/* <div>{item.namespace}</div> */}
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="update-field">Key</label>
          <input id="update-field" defaultValue={item.field} list={hasOptions ? optionsId : undefined} />
        </div>
        <div className={styles.value}>
          <label htmlFor="update-value">Value</label>
          <input id="update-value" defaultValue={content?.value} />
        </div>
        <div className={styles.optional}>
          <label htmlFor="update-optional">
            Label<span>(optional)</span>
          </label>
          <input id="update-optional" defaultValue={content?.optional} />
        </div>
        {hasOptions ? (
          <datalist id={optionsId}>
            {options.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        ) : null}
        <button type="submit" role="button">
          Confirm
        </button>
      </form>
    </dialog>
  )
}
export default UpdateInfoDialog
