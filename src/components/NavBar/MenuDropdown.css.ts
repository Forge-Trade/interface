import { style } from '@vanilla-extract/css'

import { sprinkles, themeVars, vars } from '../../nft/css/sprinkles.css'

export const hover = style([
  sprinkles({
    transition: '250',
    borderRadius: '12',
  }),
  {
    ':hover': {
      background: vars.color.lightGrayOverlay,
    },
  },
])

export const MenuRow = style([
  hover,
  sprinkles({
    color: 'textPrimary',
    paddingY: '8',
    paddingX: '12',
    width: 'full',
    whiteSpace: 'nowrap',
  }),
  {
    lineHeight: '20px',
    textDecoration: 'none',
  },
])

export const PrimaryText = style([
  {
    fontSize: '14px',
    lineHeight: '20px',
    marginRight: '8px',
  },
])

export const SecondaryText = style([
  hover,
  sprinkles({
    paddingY: '8',
    paddingX: '12',
    color: 'textSecondary',
    width: 'full',
    whiteSpace: 'nowrap',
  }),
  {
    lineHeight: '20px',
  },
])

export const Separator = style([
  sprinkles({
    height: '0',
    marginX: '16',
  }),
  {
    borderTop: 'solid',
    borderColor: themeVars.colors.backgroundOutline,
    borderWidth: '1px',
  },
])

export const IconRow = style([
  sprinkles({
    paddingX: '8',
    paddingY: '8',
    justifyContent: { sm: 'center', md: 'flex-start' },
  }),
])
