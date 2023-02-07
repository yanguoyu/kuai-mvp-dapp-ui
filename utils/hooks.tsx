import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { helpers, config } from '@ckb-lumos/lumos'
import { IS_MAINNET } from './constants'

const OMNILOCK = IS_MAINNET ? config.predefined.LINA.SCRIPTS.OMNILOCK : config.predefined.AGGRON4.SCRIPTS.OMNILOCK

export const useIsOwner = () => {
  const router = useRouter()
  const account = useAccount()
  return router.query.address === account.address
}

export const useAddresses = () => {
  const account = useAccount()
  const ethAddr = account?.address

  return useMemo(() => {
    if (!ethAddr) return { eth: ethAddr }

    try {
      const omniLock = {
        args: `0x01${ethAddr.slice(2)}00`,
        codeHash: OMNILOCK.CODE_HASH,
        hashType: OMNILOCK.HASH_TYPE,
      }
      const omniLockAddr = helpers.encodeToAddress(omniLock, {
        config: {
          PREFIX: IS_MAINNET ? 'ckb' : 'ckt',
          SCRIPTS: {},
        },
      })
      return {
        eth: ethAddr,
        ckb: omniLockAddr,
        lock: omniLock,
      }
    } catch {
      return {
        eth: ethAddr,
      }
    }
  }, [ethAddr, ethAddr])
}
