import { createStyles, rem } from '@mantine/core'

export const useLoginStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: 'contain',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(./assets/login_background.jpg)',
    minHeight: rem(660),
    height: '100%',
    maxHeight: rem(700),

    [theme.fn.smallerThan('md')]: {
      backgroundImage: 'none',
    },
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    maxWidth: rem(520),
    paddingTop: rem(80),
    minHeight: rem(660),
    height: '100%',
    maxHeight: rem(700),

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

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[5],
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  link: {
    padding: `${rem(8)} ${rem(12)}`,
    textDecoration: 'none',
    color: theme.colors.blue[9],
    fontWeight: 700,

    '&:hover': {
      color: theme.colors.blue[8],
    },
  },

  forgotPasswordLink: {
    display: 'block',
    textAlign: 'center',
    margin: '1rem auto',
    textDecoration: 'none',
    color: theme.colors.blue[6],
    fontWeight: 300,

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
