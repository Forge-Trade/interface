import { useEffect } from 'react'

export default function RedirectAssets() {
  useEffect(() => {
    window.location.href = 'https://assets.evmos.org'
  }, [])

  return null
}
