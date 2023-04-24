import { createStyles, rem } from '@mantine/core'

export const useFollowingsModalStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    textAlign: 'center',
    fontSize: rem(24),
  },

  flexContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: `${rem(16)} auto`,
  },

  unstyledButton: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    margin: `${rem(8)} auto`,
    fontWeight: 500,
    borderBottom: '1px solid transparent',
    transition: 'border-bottom 200ms ease-in-out',

    '&:hover': {
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6]}`,
    },
  },

  recommendText: {
    marginBottom: `${rem(16)}`,
    // color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    width: '70%',
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      width: '90%',
    },
  },
}))
