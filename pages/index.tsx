import { useRouter } from 'next/router'
import { Inter } from '@next/font/google'
import styles from './index.module.scss'
import { useAccount } from 'wagmi'
const inter = Inter({ subsets: ['latin'] })
const Index = () => {
  const router = useRouter()
  useAccount({
    onConnect: ({ address }) => {
      if (address) {
        router.replace(`/${address}`)
      }
    },
  })
  return (
    <div className={`${styles.container} ${inter.className}`}>
      <div className={styles.title}>Kuai MVP DApp Demo</div>
      <div className={styles.desc}>Connect a wallet to view its storage</div>
    </div>
  )
}
export default Index
