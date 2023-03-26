import { createStyles, rem } from '@mantine/core'

export const useSignUpStyles = createStyles((theme) => ({
  wrapper: {
    margin: `${rem(32)} auto`,
    maxWidth: rem(520),
    minHeight: rem(600),
    height: '100%',
    maxHeight: rem(700),
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      marginLeft: rem(8),
      marginRight: rem(8),
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[4],
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    marginBottom: '1rem',
  },

  form: {
    label: {
      marginBottom: `${rem(8)}`,
    },

    [theme.fn.smallerThan('md')]: {
      maxWidth: '70%',
      margin: 'auto',
      borderRight: 'none',
    },

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  text: {
    fontWeight: 500,
  },

  link: {
    padding: `${rem(8)} ${rem(12)}`,
    textDecoration: 'none',
    color: theme.colors[theme.primaryColor]?.[5],
    fontWeight: 700,

    '&:hover': {
      color: theme.colors[theme.primaryColor]?.[8],
    },
  },

  flexDiv: {
    margin: `${rem(16)} auto`,
  },

  termsAndConditionsLink: {
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    color: theme.colors[theme.primaryColor]?.[6],
    fontWeight: 400,
    transition: 'textDecoration 200ms ease',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
