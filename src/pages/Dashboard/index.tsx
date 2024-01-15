import { Trace } from '@uniswap/analytics'
import { InterfacePageName } from '@uniswap/analytics-events'
import { filterStringAtom } from 'components/Tokens/state'
import { useResetAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

const ExploreContainer = styled.div`
  width: 100%;
  min-width: 320px;
  padding: 68px 12px 0px;

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    padding-top: 48px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    padding-top: 20px;
  }
`

const EmbedContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-height: 110vh;
  margin: 0 auto;
  padding 0 8rem;
  border-radius: 12px;
`
const StyledIframe = styled.iframe`
  border-radius: 12px;
  display: block;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-height: 110vh;
  padding: 0;
  margin: 0 auto;
  right: 0;
  top: 3rem;
  max-width: 1360px;
`
const embed = styled.div`
  image,
  {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
])
`
const Dashboard = () => {
  const resetFilterString = useResetAtom(filterStringAtom)
  const location = useLocation()

  useEffect(() => {
    resetFilterString()
  }, [location, resetFilterString])

  return (
    <Trace page={InterfacePageName.DASHBOARD_PAGE} shouldLogImpression>
      <ExploreContainer>
        <EmbedContainer>
          <StyledIframe
            title="ForgeDashboard"
            src="https://analytics.forge.trade/"
            className={embed}
            frameBorder={0}
            height="100%"
            width="100%"
            seamless
          />
        </EmbedContainer>
      </ExploreContainer>
    </Trace>
  )
}

export default Dashboard
