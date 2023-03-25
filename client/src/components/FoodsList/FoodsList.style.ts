import { createStyles, rem } from '@mantine/core'

export const useFoodsListStyles = createStyles((theme) => ({
  cards: {
    margin: `${rem(32)} auto`,
  },

  link: {
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    color: theme.colors[theme.primaryColor]?.[5],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    marginTop: rem(32),
    transition: 'color 100ms ease',

    '&:hover': {
      color: theme.colors[theme.primaryColor]?.[8],
    },
  },
}))
