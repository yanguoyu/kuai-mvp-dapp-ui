import { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import styles from './index.module.scss'

const connector = new InjectedConnector()

const Wallet = () => {
  const [{ address, isConnecting, isDisconnected }, setAccount] = useState<
    Pick<ReturnType<typeof useAccount>, 'address' | 'isConnecting' | 'isDisconnected'>
  >({ isConnecting: false, isDisconnected: true, address: undefined })

  const { address: wagmiAddress, isConnecting: wagmiIsConnecting, isDisconnected: wagmiIsDisconnected } = useAccount()
  const { connect, error, isError } = useConnect()

  const handleConnect = () => {
    connect({ connector })
  }

  useEffect(() => {
    if (isError && error) {
      window.alert(error.message)
    }
  }, [error, isError])

  useEffect(() => {
    // use side effect to avoid hydration error
    setAccount({
      address: wagmiAddress,
      isConnecting: wagmiIsConnecting,
      isDisconnected: wagmiIsDisconnected,
    })
  }, [wagmiAddress, wagmiIsConnecting, wagmiIsDisconnected])

  if (isConnecting) {
    return <span className={styles.container}>Connecting</span>
  }

  if (isDisconnected) {
    return (
      <button onClick={handleConnect} className={styles.container}>
        Connect
      </button>
    )
  }

  if (!address) {
    return <span className={styles.container}>Unknown</span>
  }

  return <span className={styles.container}>{`${address.slice(0, 6)}...${address.slice(-6)}`}</span>
}

export default Wallet
