/* eslint-disable import/no-unused-modules */
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'

const evmosClient = new ApolloClient({
  uri: 'https://subgraph.satsuma-prod.com/orbital-apes/forge-token-prices/api',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

const POOL_INFO_QUERY = gql`
  query PoolInfo($poolAddr: String!) {
    pool(id: $poolAddr) {
      id
      token0
      token1
      fee
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

const TOKEN_PRICE_QUERY = gql`
  query TokenPrice($tokenId0: String!, $tokenId1: String!, $duration: Int!) {
    candles(
      where: { duration: $duration, token0: $tokenId0, token1: $tokenId1 }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      timestamp
      open
      close
      low
      high
      token0
      token1
    }
  }
`
export function usePoolInfo(poolAddr: string) {
  const { loading, error, data } = useQuery(POOL_INFO_QUERY, {
    variables: { poolAddr },
    client: evmosClient,
  })

  return {
    loading,
    error,
    data: data?.pool,
  }
}

export function useTokenPrices(tokenId0: string, tokenId1: string, duration: number) {
  // derive blocks based on active network
  const { loading, error, data } = useQuery(TOKEN_PRICE_QUERY, {
    variables: { tokenId0, tokenId1, duration },
    client: evmosClient,
  })

  if (error || loading || !Array.isArray(data)) {
    return {
      loading,
      error,
      data: undefined,
    }
  }

  return {
    loading,
    error,
    data: data.map((td: any) => ({
      timestamp: td?.timestamp,
      time: td?.timestamp,
      open: parseFloat(td?.open) == 0.0 ? 0.0 : parseFloat(td?.open),
      high: parseFloat(td?.high) == 0.0 ? 0.0 : parseFloat(td?.high),
      low: parseFloat(td?.low) == 0.0 ? 0.0 : parseFloat(td?.low),
      close: parseFloat(td?.close) == 0.0 ? 0.0 : parseFloat(td?.close),
    })),
  }
}
