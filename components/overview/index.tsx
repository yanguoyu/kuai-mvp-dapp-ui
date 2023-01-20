import type { FC } from 'react'
import { useRouter } from 'next/router'
import { useIsOwner } from '../../utils/hooks'
import styles from './index.module.scss'

const bitAvatarBaseUrl = 'https://identicons.did.id/identicon'
const Overview: FC<
  Partial<Record<'avatar' | 'name' | 'description', string>> & { onEditBtnClick: () => void; isEditable: boolean }
> = ({ avatar, name, description, onEditBtnClick, isEditable }) => {
  const isOwner = useIsOwner()

  const {
    query: { address },
  } = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.menu} data-is-owner={isOwner}>
        <button onClick={onEditBtnClick}>{isEditable ? 'View Data' : 'Manage Data'}</button>
      </div>
      <img
        src={avatar || `${bitAvatarBaseUrl}/${name}`}
        alt="avatar"
        className={styles.avatar}
        data-namespace={isEditable ? 'profile' : undefined}
        data-field={isEditable ? 'avatar' : undefined}
        data-action={isEditable ? 'edit' : undefined}
      />
      {address ? <div className={styles.name}>{`${address.slice(0, 6)}...${address.slice(-6)}`}</div> : null}
      {description ? (
        <div
          className={styles.description}
          data-namespace={isEditable ? 'profile' : undefined}
          data-field={isEditable ? 'description' : undefined}
          data-action={isEditable ? 'edit' : undefined}
        >
          {description}
        </div>
      ) : null}
    </div>
  )
}
export default Overview
