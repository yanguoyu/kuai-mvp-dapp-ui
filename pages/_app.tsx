import { config } from '@ckb-lumos/lumos';
import type { AppProps } from 'next/app'
import '../style/global.scss'

config.initializeConfig(config.predefined.AGGRON4);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
