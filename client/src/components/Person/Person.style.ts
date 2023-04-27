import { createStyles, rem } from '@mantine/core'

export const usePersonStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    margin: `${rem(16)} 0`,
  },

  userName: {
    color: theme.colors.orange[5],
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'color 200ms ease-in-out',

    '&:hover': {
      color: theme.colors.orange[6],
    },
  },

  disabledBtn: {
    cursor: 'none',
    pointerEvents: 'none',
  },
}))
