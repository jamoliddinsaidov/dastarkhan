import { createStyles, rem } from '@mantine/core'

export const useBrowseStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: `${rem(1150)}`,
    margin: `${rem(32)} auto`,
  },

  searchBox: {
    margin: 'auto',
  },

  filterBox: {
    margin: `${rem(24)} auto`,
    padding: `${rem(32)} ${rem(16)}`,
  },

  filterIcon: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.orange[7] : theme.colors.orange[6],
    color: theme.white,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.orange[8] : theme.colors.orange[7],
    },

    [theme.fn.smallerThan('sm')]: {
      margin: `0 ${rem(16)}`,
    },
  },

  cards: {
    margin: `${rem(32)} auto`,
  },
}))
