import { helpers } from '@ckb-lumos/lumos'
export const txToMsg = (tx: any) => {
  let skeleton = helpers.objectToTransactionSkeleton(tx)
  const msg = skeleton.signingEntries.get(0)?.message
  if (!msg) {
    throw new Error('Invalid tx: no signing entries')
  }
  return msg
}
