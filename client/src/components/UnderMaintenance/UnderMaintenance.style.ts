import { createStyles, rem } from '@mantine/core'

export const useUnderMaintenanceStyles = createStyles((theme) => ({
  inner: {
    position: 'relative',
  },

  content: {
    marginTop: rem(60),
    position: 'relative',
    zIndex: 1,
  },

  icon: {
    textAlign: 'center',
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))
