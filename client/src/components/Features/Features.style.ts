import { createStyles, rem } from '@mantine/core'

export const useFeaturesStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '80vh',
    marginTop: rem(64),
  },

  title: {
    fontSize: rem(34),
    fontWeight: 900,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  cardTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}))
