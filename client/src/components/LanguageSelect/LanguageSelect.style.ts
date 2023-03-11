import { createStyles, rem } from '@mantine/core'

export const useLanguageSelectStyles = createStyles((theme) => ({
  hideOnMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  input: {
    width: '15%',

    [theme.fn.smallerThan('sm')]: {
      width: '50%',
      margin: `0 0 ${rem(16)} ${rem(16)}`,
    },
  },

  item: {
    // applies styles to selected item
    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
      },
    },
  },
}))
