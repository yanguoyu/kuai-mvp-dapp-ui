export const presetKeys = {
  profile: ['github', 'discord', 'avatar', 'description', 'twitter', 'website'] as const,
  addresses: ['btc', 'eth', 'ckb', 'doge'] as const,
  dweb: ['ifps', 'ipns', 'arwave'] as const,
}

export const IS_MAINNET = process.env.NEXT_PUBLIC_CHAIN_TYPE === 'mainnet'

export type ProfilePrimaryKey = typeof presetKeys.profile[number]
export type AddressPrimaryKey = typeof presetKeys.addresses[number]
export type DwebPrimaryKey = typeof presetKeys.dweb[number]
export type StorageItem<Key extends string> = Partial<Record<Key, { value: string; optional?: string }>>
