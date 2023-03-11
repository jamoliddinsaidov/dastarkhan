import { createStyles, rem } from '@mantine/core'

export const useForgotPasswordStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[4],
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },

  paper: {
    label: {
      marginBottom: `${rem(8)}`,
    },

    a: {
      textDecoration: 'none',
    },
  },
}))
