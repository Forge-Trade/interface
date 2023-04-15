export interface EthereumProvider {
  on?: (...args: any[]) => void
  removeListener?: (...args: any[]) => void
  autoRefreshOnNetworkChange?: boolean
}

declare global {
  interface Window {
    Cypher?: any 
    ethereum?: EthereumProvider
    keplr?: any
    getOfflineSigner?: any

  }
}
