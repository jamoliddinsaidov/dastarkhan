import { createStyles, rem } from '@mantine/core'

export const useFoodDetailsStyles = createStyles((theme) => ({
  wrapper: {
    margin: `${rem(32)} auto`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[8],
  },

  title: {
    textAlign: 'center',
    marginBottom: rem(32),
  },

  label: {
    fontWeight: 700,
    fontSize: rem(17),
  },

  marginLeft: {
    marginLeft: rem(8),
  },

  marginBottom: {
    marginBottom: rem(16),
  },

  skeleton: {
    marginRight: rem(16),
    [theme.fn.smallerThan('sm')]: {
      marginBottom: rem(16),
    },
  },

  halfWidth: {
    width: '50%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  flexColumn: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  link: {
    marginLeft: rem(8),
    textDecoration: 'none',
    fontWeight: 500,
    color: 'inherit',
    transition: 'color 200ms ease',

    '&:hover': {
      color: theme.colors[theme.primaryColor]?.[5],
    },
  },
}))
