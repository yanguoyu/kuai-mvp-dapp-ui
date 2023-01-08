import styles from './index.module.scss'

const Navbar = () => {
  return (
    <header className={styles.container}>
      <div>Kuai MVP DApp</div>
      <div className={styles.items}>
        <span>search</span>
        <span>home</span>
        <span>wallet</span>
      </div>
    </header>
  )
}

export default Navbar
