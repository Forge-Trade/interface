import { Trans } from '@lingui/macro'
import { InformationBanner } from 'components/InformationBanner'
import Web3Status from 'components/Web3Status'
import { useIsNftPage } from 'hooks/useIsNftPage'
import { Box } from 'nft/components/Box'
import { Row } from 'nft/components/Flex'
import { useIsMobile } from 'nft/hooks'
import { ReactNode } from 'react'
import { NavLink, NavLinkProps, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ChainSelector } from './ChainSelector'
import * as styles from './style.css'

const Nav = styled.nav`
  padding: 20px 12px;
  width: 100%;
  height: ${({ theme }) => theme.navHeight}px;
  z-index: 2;
`

interface MenuItemProps {
  href: string
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
  dataTestId?: string
}

const MenuItem = ({ href, dataTestId, id, isActive, children }: MenuItemProps) => {
  return (
    <NavLink
      to={href}
      className={isActive ? styles.activeMenuItem : styles.menuItem}
      id={id}
      style={{ textDecoration: 'none' }}
      data-testid={dataTestId}
    >
      {children}
    </NavLink>
  )
}

export const PageTabs = () => {
  const { pathname } = useLocation()
  const isMobile = useIsMobile()
  const isPoolActive =
    (pathname.startsWith('/pool') ||
      pathname.startsWith('/add') ||
      pathname.startsWith('/remove') ||
      pathname.startsWith('/increase')) &&
    !pathname.startsWith('/pools')

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <MenuItem href="/swap" isActive={pathname.startsWith('/swap')}>
        <Trans>Swap</Trans>
      </MenuItem>
      <MenuItem href="/pools" isActive={pathname.startsWith('/pools')}>
        <Trans>Pools</Trans>
      </MenuItem>
      <MenuItem href="/pool" id="pool-nav-link" isActive={isPoolActive}>
        <Trans>Manage Positions</Trans>
      </MenuItem>
      {!isMobile && (
        <a
          href="https://app.stride.zone/?chain=EVMOS"
          target="_blank"
          rel="noopener noreferrer"
          id="pool-nav-link"
          className={styles.menuItem}
        >
          <Trans>Liquid Stake</Trans>
        </a>
      )}
      {!isMobile && (
        <a href="https://assets.forge.trade/" rel="noopener noreferrer" id="pool-nav-link" className={styles.menuItem}>
          <Trans>Assets</Trans>
        </a>
      )}
    </div>
  )
}

const Navbar = () => {
  const isNftPage = useIsNftPage()
  const navigate = useNavigate()

  return (
    <>
      <Nav>
        <Box display="flex" height="full" flexWrap="nowrap">
          <Box className={styles.leftSideContainer}>
            <Box className={styles.logoContainer}>
              <img
                onClick={() => {
                  navigate({
                    pathname: '/',
                    search: '?intro=true',
                  })
                }}
                className={styles.logo}
                style={{ width: '48px', height: '48px' }}
                src="/images/ForgeIcon.png"
              />
            </Box>
            {!isNftPage && (
              <Box display={{ sm: 'flex', lg: 'none' }}>
                <ChainSelector leftAlign={true} />
              </Box>
            )}
            <Row gap={{ xl: '0', xxl: '8' }} display={{ sm: 'none', lg: 'flex' }}>
              <PageTabs />
            </Row>
          </Box>

          <Box className={styles.rightSideContainer}>
            <Row gap="12">
              {!isNftPage && (
                <Box display={{ sm: 'none', lg: 'flex' }}>
                  <ChainSelector />
                </Box>
              )}

              <Web3Status />
            </Row>
          </Box>
        </Box>
        <InformationBanner
          text={
            <div
              style={{
                fontSize: '1rem',
                lineHeight: '1.5rem',
                color: 'black',
              }}
            >
              Join the Inferno Incentives program to earn Evmos and Stride rewards!{' '}
              <a
                style={{
                  color: 'rgb(250, 241, 228)',
                  fontWeight: 600,
                  paddingTop: '0.375rem',
                  paddingBottom: '0.375rem',
                  paddingRight: '1.25rem',
                  paddingLeft: '1.25rem',
                  backgroundColor: 'rgb(237, 78, 51)',
                  borderRadius: '0.25rem',
                  marginLeft: '0.625rem',
                }}
                href="https://revert.finance/#/incentives/evmos"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2.5 rounded bg-red p-5 py-1.5 font-semibold text-pearl"
              >
                Check Incentives Now 🚀
              </a>
            </div>
          }
        />
      </Nav>
    </>
  )
}

export default Navbar
