import { createStyles, rem } from '@mantine/core'

export const useSubPagesStyles = createStyles((theme, params) => {
  console.log(params)

  return {
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
      marginTop: rem(36),
    },

    titleh2: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
      margin: `${rem(32)} auto 0`,
    },

    titleh3: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
      fontWeight: 300,
      marginBottom: rem(12),
      fontSize: rem(28),
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

    customDiv: {
      width: '70%',
      margin: `${rem(16)} auto ${rem(32)}`,

      label: {
        marginBottom: `${rem(8)}`,
      },

      [theme.fn.smallerThan('sm')]: {
        width: '95%',
      },
    },
  }
})
