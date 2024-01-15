/* eslint-disable import/no-unused-modules */
/* eslint-disable unused-imports/no-unused-imports */
import { t, Trans } from '@lingui/macro'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { Box } from 'nft/components/Box'
import { Column, Row } from 'nft/components/Flex'
import { ChevronDownBagIcon } from 'nft/components/icons'
import { body, bodySmall } from 'nft/css/common.css'
import { ReactNode, useReducer, useRef } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components/macro'

import * as styles from './MenuDropdown.css'
import { NavDropdown } from './NavDropdown'
import { NavIcon } from './NavIcon'

const PrimaryMenuRow = ({
  to,
  href,
  close,
  children,
}: {
  to?: NavLinkProps['to']
  href?: string
  close?: () => void
  children: ReactNode
}) => {
  return (
    <>
      {to ? (
        <NavLink to={to} className={styles.MenuRow}>
          <Row onClick={close}>{children}</Row>
        </NavLink>
      ) : (
        <Row as="a" href={href} target="_blank" rel="noopener noreferrer" className={styles.MenuRow}>
          {children}
        </Row>
      )}
    </>
  )
}

const StyledBox = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: center;
`
const PrimaryMenuRowText = ({ children }: { children: ReactNode }) => {
  return <StyledBox className={`${styles.PrimaryText} ${body}`}>{children}</StyledBox>
}

PrimaryMenuRow.Text = PrimaryMenuRowText

const SecondaryLinkedText = ({
  href,
  onClick,
  children,
}: {
  href?: string
  onClick?: () => void
  children: ReactNode
}) => {
  return (
    <Box
      as={href ? 'a' : 'div'}
      href={href ?? undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`${styles.SecondaryText} ${bodySmall}`}
      onClick={onClick}
      cursor="pointer"
    >
      {children}
    </Box>
  )
}

const Separator = () => {
  return <Box className={styles.Separator} />
}

// const IconRow = ({ children }: { children: ReactNode }) => {
//   return <Row className={styles.IconRow}>{children}</Row>
// }

// const Icon = ({ href, children }: { href?: string; children: ReactNode }) => {
//   return (
//     <>
//       <Box
//         as={href ? 'a' : 'div'}
//         href={href ?? undefined}
//         target={href ? '_blank' : undefined}
//         rel={href ? 'noopener noreferrer' : undefined}
//         display="flex"
//         flexDirection="column"
//         color="textPrimary"
//         background="none"
//         border="none"
//         justifyContent="center"
//         textAlign="center"
//         marginRight="12"
//         marginLeft="6"
//       >
//         {children}
//       </Box>
//     </>
//   )
// }

export const MenuDropdown = () => {
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)

  return (
    <>
      <Box position="relative" ref={ref}>
        <PrimaryMenuRow>
          <PrimaryMenuRow.Text>
            <Trans>🔥 Perps</Trans>
          </PrimaryMenuRow.Text>
          <NavIcon isActive={isOpen} onClick={toggleOpen} label={isOpen ? t`Show resources` : t`Hide resources`}>
            <ChevronDownBagIcon viewBox="0 0 20 20" width={16} height={16} />
          </NavIcon>
        </PrimaryMenuRow>
        {isOpen && (
          <NavDropdown top={{ sm: 'unset', lg: '56' }} bottom={{ sm: '56', lg: 'unset' }} left="0">
            <Column gap="16">
              <Box
                display="flex"
                flexDirection={{ sm: 'row', md: 'column' }}
                flexWrap="wrap"
                alignItems={{ sm: 'center', md: 'flex-start' }}
                paddingX="20"
                paddingY="8"
              >
                <SecondaryLinkedText href="https://perps.forge.trade">
                  <Trans>Forge Perps 🚀</Trans>
                  <span className="text-xs" style={{ display: 'block', fontSize: 10 }}>
                    Trade w/ Leverage up to 1000x
                  </span>
                </SecondaryLinkedText>
                <Separator />
                <SecondaryLinkedText href="https://catalyst.forge.trade">
                  <Trans>Trading Competition 🏆</Trans>
                  <span className="text-xs" style={{ display: 'block', fontSize: 10 }}>
                    Catalyst Incentives Ongoing
                  </span>
                </SecondaryLinkedText>
                <Separator />
                <SecondaryLinkedText href="https://catalyst.forge.trade/pools">
                  <Trans>Liquidity Pools 💰</Trans>
                  <span className="text-xs" style={{ display: 'block', fontSize: 10 }}>
                    Catalyst Incentives Ongoing
                  </span>
                </SecondaryLinkedText>
                <Separator />
                <SecondaryLinkedText href="https://catalyst.forge.trade/markets/overview">
                  <Trans>Market Overview 📈</Trans>
                  <span className="text-xs" style={{ display: 'block', fontSize: 10 }}>
                    Perpetual Futures Markets
                  </span>
                </SecondaryLinkedText>
              </Box>
              {/* <IconRow>
                <Icon href="https://discord.com/invite/FCfyBSbCU5">
                  <DiscordIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://twitter.com/Uniswap">
                  <TwitterIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://github.com/Uniswap">
                  <GithubIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
              </IconRow> */}
            </Column>
          </NavDropdown>
        )}
      </Box>
    </>
  )
}
