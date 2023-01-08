export const mockAddr = '0x40dfb7df991c9aa6138a60f0cac6ed1d02b834b8'

export const mockAccount = {
  name: 'magickbase.bit',
  storage: {
    profile: {
      github: {
        value: 'https://github.com/magickbase',
      },
      discord: {
        value: 'https://discord.gg/magickbase',
        optional: 'Community',
      },
      website: {
        value: 'https://magickbase.com',
        optional: 'Official website',
      },
      avatar: {
        value: 'https://avatars.githubusercontent.com/u/103997195',
      },
      description: {
        value:
          'As a comprehensive ecosystem that combines powerful decision-making tools, secure blockchain technology, and robust infrastructure, Magickbase is a valuable resource for anyone looking to take control of their data on Nervos CKB and use it in innovative and transformative ways.',
      },
    },
    addresses: {
      btc: {
        value: '3GcU7EGhUqanQxun2oSmx1bAVcVVCSJrrc',
      },
      eth: {
        value: '0xFA8Fa9CF58EAfF86aa208366a14d69dE87867f1D',
        optional: 'MetaMask',
      },
      ckb: {
        value: 'ckt1qpw9q60tppt7l3j7r09qcp7lxnp3vcanvgha8pmvsa3jplykxn32sqfqhzlngdxgeme7520phg4wf6llyl49zpqjsgqdq',
      },
    },
    custom: {
      newsletter: {
        value: 'https://magickbase.substack.com',
        optional: 'Subscribe',
      },
    },
    dweb: {
      ipns: {
        value: 'https://libp2p.io',
      },
    },
  },
  permissions: {
    owner: { value: mockAddr },
    manager: { value: mockAddr },
  },
}
