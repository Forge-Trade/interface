import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'

import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')

export const UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS = '0x8B799381ac40b838BBA4131ffB26197C432AFe78'

export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)
export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D')

// fuji addresses
const FUJI_V3_CORE_FACTORY_ADDRESSES = '0x43bDe47a34801f6aB2d66016Aef723Ba1b3A62b3'
const FUJI_ROUTER_ADDRESS = '0xd55586A56F208daeb184647aD17466c404ee1A51'
const FUJI_V3_MIGRATOR_ADDRESSES = '0x021d2b456b66e6b54fCef45CA2De298D533faC6B'
const FUJI_MULTICALL_ADDRESS = '0xBeFe898407483f0f2fF605971FBD8Cf8FbD8B160'
const FUJI_QUOTER_ADDRESSES = '0x92b5f5EAe221BC6FeD88259cd2805A9C842c29bF'
const FUJI_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = '0x0Ca5659fE0fD4a10bde2Ca4d78156B78e9F1de1a'
const FUJI_TICK_LENS_ADDRESSES = '0x4A3be35489fa980D75B4b96B7b7F8a14748F0172'

/* V3 Contract Addresses */
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.FUJI]: FUJI_V3_CORE_FACTORY_ADDRESSES,
}

export const V3_MIGRATOR_ADDRESSES: AddressMap = {
  [SupportedChainId.FUJI]: FUJI_V3_MIGRATOR_ADDRESSES,
}

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.FUJI]: FUJI_MULTICALL_ADDRESS,
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.FUJI]: FUJI_ROUTER_ADDRESS,
}

/**
 * The oldest V0 governance address
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The older V1 governance address
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {}
/**
 * The latest governor bravo that is currently admin of timelock
 */
export const GOVERNANCE_BRAVO_ADDRESSES: AddressMap = {}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {}

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}

export const QUOTER_ADDRESSES: AddressMap = {
  [SupportedChainId.FUJI]: FUJI_QUOTER_ADDRESSES,
}

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  [SupportedChainId.FUJI]: FUJI_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {}

export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {}

export const TICK_LENS_ADDRESSES: AddressMap = {
  [SupportedChainId.FUJI]: FUJI_TICK_LENS_ADDRESSES,
}
