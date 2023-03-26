import { createStyles, rem } from '@mantine/core'

export const usePersonStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    margin: `${rem(16)} 0`,
  },

  userName: {
    color: theme.colors.orange[5],
    fontWeight: 600,
  },

  disabledBtn: {
    cursor: 'none',
    pointerEvents: 'none',
  },
}))
