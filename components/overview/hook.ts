import { useCallback } from "react"
import { claim, clearData, loadData, readData, setData } from '../../utils/api';

export const useAPI = (omnilockAddress: string) => {
  const onClaimData = useCallback(() => {
    if (omnilockAddress) {
      claim(omnilockAddress, BigInt(100000000000)).then(v => console.log(`tx hash is ${v}`))
    }
  }, [omnilockAddress])
  const onReadData = useCallback(() => {
    if (omnilockAddress) {
      readData(omnilockAddress, 'profile')
    }
  }, [omnilockAddress])
  const onLoadData = useCallback(() => {
    if (omnilockAddress) {
      loadData(omnilockAddress)
    }
  }, [omnilockAddress])
  const onSetData = useCallback(() => {
    if (omnilockAddress) {
      setData(omnilockAddress, { profile: [{ key: 'github', value: 'https://github.com/magickbase', label: 'magickbase' }]}).then(v => console.log(`tx hash is ${v}`))
    }
  }, [omnilockAddress])
  const onClearData = useCallback(() => {
    if (omnilockAddress) {
      clearData(omnilockAddress).then(v => console.log(`tx hash is ${v}`))
    }
  }, [omnilockAddress])
  return {
    onClaimData,
    onReadData,
    onLoadData,
    onSetData,
    onClearData
  }
}