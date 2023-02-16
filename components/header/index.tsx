import styles from './index.module.scss'

const Navbar = ({ connectWallet }: { connectWallet: () => void }) => {
  return (
    <header className={styles.container}>
      <div>Kuai MVP DApp</div>
      <div className={styles.items}>
        <span>search</span>
        <span>home</span>
        <span onClick={connectWallet}>wallet</span>
      </div>
    </header>
  )
}

export default Navbar
