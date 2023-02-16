import { commons, helpers } from "@ckb-lumos/lumos";

export class Ethereum {
  static get ethereum(): EthereumProvider {
    if (window.ethereum) {
      return window.ethereum
    }
    throw new Error('there is no ethereum on window, check your chrome plugin')
  }
}

export function connectToMetaMask() {
  return Ethereum.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(([ethAddr]: string[]) => {
      const omniLockScript = commons.omnilock.createOmnilockScript({ auth: { flag: "ETHEREUM", content: ethAddr } })
      return helpers.encodeToAddress(omniLockScript)
    })
}
