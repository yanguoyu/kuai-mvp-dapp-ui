import { sendTx } from "./rpc"

const commFetch = (method: string) => (url: string, options?: {
  body?: object
}) => {
  return fetch(`/api/${url}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: options?.body ? JSON.stringify(options?.body) : undefined
  }).then(res => {
    if (res.ok && res.status === 200) {
      return res.json()
    }
    res.text().then(console.error)
  }).catch(err => {
    console.error(err)
  })
}

const get = commFetch('get')
const post = commFetch('post')

export const claim = (address: string, capacity: BigInt) => {
  return post(`claim/${address}`, { body: { capacity: `0x${capacity.toString(16)}` }}).then(res => {
    if (res) return sendTx(res)
  })
}

export const readData = (address: string, path: string) => {
  return get(`read/${address}/${path}`).then(res => {
    console.log(res)
  })
}

export const loadData = (address: string) => {
  return get(`load/${address}`).then(res => {
    console.log(res)
  })
}

export type ItemData = {
  key: string
  value: string
  label: string
}

export type DAppData = {
  profile?: ItemData[]
  addresses?: ItemData[]
  custom?: ItemData[]
  dweb?: ItemData[]
}

export const setData = (address: string, value: DAppData) => {
  return post(`set/${address}`, { body: { value } }).then(res => {
    if (res) return sendTx(res)
  })
}

export const clearData = (address: string) => {
  return post(`clear/${address}`).then(res => {
    console.log(res)
    if (res) return sendTx(res)
  })
}
