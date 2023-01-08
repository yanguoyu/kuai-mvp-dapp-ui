import type { FC } from 'react'
import styles from './index.module.scss'

const iconBaseUrl = 'https://data.did.id/images'
const iconUrl: Record<string, string> = {
  twitter: '/social/social-twitter.png',
  github: '/social/social-github.png',
  discord: '/social/social-discord.png',
  website: '/social/social-website.png',
  description: '/social/social-description.png',
  btc: '/chain/chain-btc.png',
  eth: '/chain/chain-eth.png',
  ckb: '/chain/chain-ckb.png',
  ipfs: '/dweb/dweb-ipfs.png',
  ipns: '/dweb/dweb-ipns.png',
  owner: '/chain/chain-eth.png',
  manager: '/chain/chain-eth.png',
}

const getIconUrl = (type: string) => {
  const url = iconUrl[type]
  return url ? iconBaseUrl + url : ''
}

const Record: FC<{ namespace: string; field: string; value: string; optional?: string }> = ({
  namespace,
  field,
  value,
  optional,
}) => {
  const iconUrl = field === 'avatar' ? value : getIconUrl(field)
  return (
    <div className={styles.container} data-namespace={namespace}>
      <div className={styles.icon}>
        {iconUrl ? (
          <img src={iconUrl} alt="icon" />
        ) : (
          <div style={{ background: `rgb(${(field.charCodeAt(0) * 2) % 255},${(field.charCodeAt(1) * 4) % 255},255)` }}>
            {field[0]}
          </div>
        )}
      </div>
      <div className={styles.field}>{field}</div>
      <div className={styles.value}>{value}</div>
      {optional ? (
        <div className={styles.optional}>
          <span>{optional}</span>
        </div>
      ) : null}
      {namespace !== 'permissions' ? (
        <div className={styles.actions} data-edit-actions>
          <button data-namespace={namespace} data-field={field} data-action="edit">
            <img src="/icons/edit.svg" alt="edit" />
          </button>
          <button data-namespace={namespace} data-field={field} data-action="remove">
            <img src="/icons/remove.svg" alt="remove" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Record
