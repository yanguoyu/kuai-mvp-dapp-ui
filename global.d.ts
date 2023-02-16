interface EthereumRpc {
  (payload: { method: 'personal_sign'; params: [string /*from*/, string /*message*/] }): Promise<string>;
  (payload: { method: 'eth_requestAccounts' }): Promise<string[]>;
}

interface EthereumProvider {
  selectedAddress: string;
  isMetaMask?: boolean;
  addListener: (event: 'accountsChanged', listener: (addresses: string[]) => void) => void;
  removeEventListener: (event: 'accountsChanged', listener: (addresses: string[]) => void) => void;
  request: EthereumRpc;
}

interface Window {
  ethereum: EthereumProvider;
}