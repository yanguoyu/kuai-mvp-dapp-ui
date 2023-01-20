import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

export const useIsOwner = () => {
  const router = useRouter()
  const account = useAccount()
  return router.query.address === account.address
}
