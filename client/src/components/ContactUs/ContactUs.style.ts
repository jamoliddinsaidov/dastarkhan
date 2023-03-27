import { createStyles, rem } from '@mantine/core'

export const useContactUsStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    borderRadius: theme.radius.md,
    padding: rem(4),
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}`,
    margin: `${rem(32)} auto`,
    boxShadow: theme.shadows.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      margin: `${rem(24)} ${rem(8)}`,
    },
  },

  form: {
    boxSizing: 'border-box',
    flex: 1,
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,
    borderLeft: 0,

    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.md,
      paddingLeft: theme.spacing.md,
    },
  },

  fields: {
    marginTop: rem(-12),
  },

  contacts: {
    boxSizing: 'border-box',
    position: 'relative',
    borderRadius: theme.radius.lg,
    border: `${rem(1)} solid transparent`,
    padding: theme.spacing.xl,
    flex: `0 0 ${rem(280)}`,

    [theme.fn.smallerThan('sm')]: {
      marginBottom: theme.spacing.sm,
      paddingLeft: theme.spacing.md,
    },
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],

    [theme.fn.smallerThan('sm')]: {
      marginBottom: theme.spacing.xl,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      flex: 1,
    },
  },
}))
