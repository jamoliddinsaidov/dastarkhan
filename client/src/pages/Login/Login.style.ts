import { createStyles, rem } from '@mantine/core'

export const useLoginStyles = createStyles((theme) => ({
  form: {
    margin: `${rem(32)} auto`,
    maxWidth: rem(520),
    minHeight: rem(600),
    height: '100%',
    maxHeight: rem(700),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    label: {
      marginBottom: `${rem(8)}`,
    },

    form: {
      width: '100%',
      padding: `0 ${rem(32)}`,
    },

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      marginLeft: rem(8),
      marginRight: rem(8),

      form: {
        padding: 0,
      },
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[4],
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  link: {
    padding: `${rem(8)} ${rem(12)}`,
    textDecoration: 'none',
    color: theme.colors[theme.primaryColor]?.[5],
    fontWeight: 700,
    transition: 'color 200ms ease',

    '&:hover': {
      color: theme.colors[theme.primaryColor]?.[8],
    },
  },

  forgotPasswordLink: {
    display: 'block',
    textAlign: 'center',
    margin: '1rem auto',
    textDecoration: 'none',
    color: theme.colors[theme.primaryColor]?.[6],
    fontWeight: 400,

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
