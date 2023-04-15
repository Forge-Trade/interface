import { JsonRpcProvider } from '@ethersproject/providers'
import { evmosToEth } from '@evmos/address-converter'
import { Connector } from '@web3-react/types'
import {
  coinbaseWalletConnection,
  ConnectionType,
  gnosisSafeConnection,
  injectedConnection,
  networkConnection,
  walletConnectConnection,
} from 'connection'
import { accounts } from 'index'

interface KeplrInfo {
  chainId: number
  account: string
  provider: JsonRpcProvider
}

export function getIsInjected(): boolean {
  return Boolean(window.ethereum)
}

export function getIsBraveWallet(): boolean {
  return window.ethereum?.isBraveWallet ?? false
}

export function getIsMetaMaskWallet(): boolean {
  // When using Brave browser, `isMetaMask` is set to true when using the built-in wallet
  // This function should return true only when using the MetaMask extension
  // https://wallet-docs.brave.com/ethereum/wallet-detection#compatability-with-metamask
  return (window.ethereum?.isMetaMask ?? false) && !getIsBraveWallet()
}

export function getIsCoinbaseWallet(): boolean {
  return window.ethereum?.isCoinbaseWallet ?? false
}

export async function enableKeplr(): Promise<boolean> {
  try {
    await window.keplr.enable('evmos_9001-2')
  } catch (e) {
    return false
  }
  return true
}

export function isKeplrWallet(): boolean {
  return true
}

export async function getKeplrAccount(): Promise<string> {
  const offlineSigner = window.getOfflineSigner('evmos_9001-2')
  const wallets = await offlineSigner.getAccounts()
  const signerAddressBech32 = wallets[0].address
  return evmosToEth(signerAddressBech32)
}

export async function getKeplrBech32Account(): Promise<string> {
  const offlineSigner = window.getOfflineSigner('evmos_9001-2')
  const wallets = await offlineSigner.getAccounts()
  const signerAddressBech32 = wallets[0].address
  return signerAddressBech32
}

export async function signKeplrTx(tx: any): Promise<any> {
  const signer = await getKeplrBech32Account()
  const signedTx = await window.keplr.signEthereum('evmos_9001-2', signer, JSON.stringify(tx), 'transaction')
  return signedTx
}

export function useKeplr(): KeplrInfo {
  const account = evmosToEth(accounts[0].address)
  const chainId = 9001
  const nodeUrl = 'https://eth.bd.evmos.org:8545'
  const provider = new JsonRpcProvider(nodeUrl)
  return { account, chainId, provider }
}

export async function convertToKeplrTx(provider: JsonRpcProvider, signer: string, tx: any): Promise<any> {
  const gasLimit = await provider.estimateGas(tx)
  const gasFee = await provider.getFeeData()

  if (!gasFee.maxPriorityFeePerGas || !gasFee.maxFeePerGas) {
    // Handle error
    throw new Error(`Keplr Gas Estimation Failed`)
  }
  const nonce = await provider.getTransactionCount(signer)
  const newTx = {
    ...tx,
    chainId: 9001,
    nonce,
    gasLimit: gasLimit.toHexString(),
    maxPriorityFeePerGas: gasFee.maxPriorityFeePerGas.toHexString(),
    maxFeePerGas: gasFee.maxFeePerGas.toHexString(),
    type: 2,
    accessList: [],
  }
  return newTx
}

const CONNECTIONS = [
  gnosisSafeConnection,
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  networkConnection,
]
export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find((connection) => connection.connector === c)
    if (!connection) {
      throw Error('unsupported connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection
      case ConnectionType.NETWORK:
        return networkConnection
      case ConnectionType.GNOSIS_SAFE:
        return gnosisSafeConnection
    }
  }
}

export function getConnectionName(
  connectionType: ConnectionType,
  hasMetaMaskExtension: boolean = getIsMetaMaskWallet()
) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return hasMetaMaskExtension ? 'MetaMask' : 'Browser Wallet'
    case ConnectionType.COINBASE_WALLET:
      return 'Coinbase Wallet'
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect'
    case ConnectionType.NETWORK:
      return 'Network'
    case ConnectionType.GNOSIS_SAFE:
      return 'Gnosis Safe'
  }
}
