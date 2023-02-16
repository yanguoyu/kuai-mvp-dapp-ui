import { FC } from 'react'
import { useAPI } from './hook';
import styles from './index.module.scss'

const bitAvatarBaseUrl = 'https://identicons.did.id/identicon'
const Overview: FC<
  Partial<Record<'avatar' | 'name' | 'description', string>> & { onEditBtnClick: () => void; isEditable: boolean; omnilockAddress: string }
> = ({ avatar, name, description, onEditBtnClick, isEditable, omnilockAddress }) => {
  const { onClaimData, onLoadData, onReadData, onSetData, onClearData } = useAPI(omnilockAddress)
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button onClick={onClaimData}>claim</button>
        <button onClick={onLoadData}>load</button>
        <button onClick={onReadData}>read</button>
        <button onClick={onSetData}>set</button>
        <button onClick={onClearData}>clear</button>
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
      <div className={styles.name}>{name}{ omnilockAddress && <span>{omnilockAddress}</span>}</div>
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
