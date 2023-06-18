import type { FC } from 'react'
import ItemRecord from '../record'
import styles from './index.module.scss'

const sectionIconBaseUrl = 'https://data.did.id/images/components'
const sectionIcon: Record<string, string> = {
  profile: '/title-profiles.png',
  addresses: '/title-addresses.png',
  custom: '/title-custom.png',
  dweb: '/title-dwebs.png',
  permissions: '/title-permissions.png',
}

const Section: FC<{ namespace: string; records: Array<{ key: string; value: string; label?: string }> }> = ({
  namespace,
  records = [],
}) => {
  return (
    <section className={styles.container} style={{ gridArea: namespace }} data-namespace={namespace}>
      <header>
        <img src={`${sectionIconBaseUrl}${sectionIcon[namespace]}`} alt="section" />
        {`${namespace}(${Object.keys(records).length})`}
      </header>
      <div className={styles.list}>
        <button data-edit-actions data-namespace={namespace} data-action="add" className={styles.add}>
          Add New
        </button>
        {records.map(({ key, value, label }) => (
          <ItemRecord key={key} field={key} value={value} optional={label} namespace={namespace} />
        ))}
      </div>
    </section>
  )
}
export default Section
