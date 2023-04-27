import { createStyles, rem } from '@mantine/core'

export const useUserDetailsStyles = createStyles((theme) => ({
  wrapper: {
    margin: `${rem(32)} auto`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[8],
    width: '70%',

    [theme.fn.smallerThan('sm')]: {
      width: '95%',
    },
  },

  relativePosition: {
    position: 'relative',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
  },

  tablist: {
    margin: `${rem(16)} auto`,
    justifyContent: 'center',
  },

  tab: {
    fontWeight: 600,
    paddingBottom: rem(22),
  },
}))
