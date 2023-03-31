import { createStyles, rem } from '@mantine/core'

export const useFooterStyles = createStyles((theme) => ({
  title: {
    fontWeight: 900,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    cursor: 'pointer',
  },

  footer: {
    marginTop: rem(50),
    borderTop: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.xl} ${theme.spacing.md}`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      margin: `${rem(32)} auto`,
    },
  },

  copyright: {
    textAlign: 'right',
    paddingBottom: rem(28),
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],

    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 150ms ease-in-out',

      '&:hover': {
        color: theme.colors[theme.primaryColor]?.[6],
      },
    },

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'center',
    },
  },

  footerLink: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: rem(15),

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
