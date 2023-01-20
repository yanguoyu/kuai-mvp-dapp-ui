import { WagmiConfig, createClient, mainnet, configureChains } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'

import type { AppProps } from 'next/app'
import '../style/global.scss'
const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()])
const client = createClient({ autoConnect: true, provider, webSocketProvider })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
