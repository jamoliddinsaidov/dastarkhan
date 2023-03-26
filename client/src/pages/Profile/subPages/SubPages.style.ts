import { createStyles, rem } from '@mantine/core'

export const useSubPagesStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    marginTop: rem(36),
  },

  titleh2: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    margin: `${rem(16)} auto`,
  },

  containerMargin: {
    margin: rem(8),
  },

  relativePosition: {
    position: 'relative',
    width: '70%',

    [theme.fn.smallerThan('sm')]: {
      margin: '0 auto',
      width: '90%',
    },
  },
}))
