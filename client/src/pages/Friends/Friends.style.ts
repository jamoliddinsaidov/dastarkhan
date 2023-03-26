import { createStyles, rem } from '@mantine/core'

export const useFriendsStyles = createStyles((theme) => ({
  flexContainer: {
    position: 'relative',
    width: '100%',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    marginTop: rem(36),
  },

  titleH3: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    margin: `0 ${rem(16)} ${rem(16)} ${rem(16)}`,
    textAlign: 'center',
  },

  containerMargin: {
    margin: rem(8),
  },

  tablist: {
    margin: `${rem(16)} auto`,
    justifyContent: 'center',
  },

  tab: {
    fontWeight: 600,
    paddingBottom: rem(22),
  },

  width60Container: {
    width: '60%',
    margin: '0 auto',

    [theme.fn.smallerThan('sm')]: {
      width: '95%',
    },
  },

  width50Container: {
    width: '50%',
    margin: '0 auto',

    [theme.fn.smallerThan('sm')]: {
      width: '85%',
    },
  },
}))
