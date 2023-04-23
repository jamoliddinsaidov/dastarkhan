import { createStyles, rem } from '@mantine/core'

export const useCommentStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    margin: `${rem(16)} 0`,
    position: 'relative',
  },

  body: {
    paddingLeft: rem(32),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      paddingLeft: rem(16),
    },
  },

  userName: {
    color: theme.colors.orange[5],
    fontWeight: 600,
  },

  date: {
    marginTop: rem(4),
  },
}))
