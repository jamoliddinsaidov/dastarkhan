import { createStyles, rem } from '@mantine/core'

export const useHeroWithBackgroundStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(200),
    backgroundImage: 'url(./assets/hero_background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    [theme.fn.smallerThan('xs')]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },

    minHeight: '90vh',
    maxHeight: '100vh',
  },

  inner: {
    position: 'relative',
    zIndex: 1,

    [theme.fn.largerThan('xxl')]: {
      marginTop: `calc(${theme.spacing.xl} * 4.5)`,
    },
  },

  title: {
    fontWeight: 800,
    fontSize: rem(60),
    letterSpacing: rem(-1),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },

    [theme.fn.largerThan('xxl')]: {
      fontSize: rem(70),
    },
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',
    fontWeight: 500,

    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },

    [theme.fn.largerThan('xxl')]: {
      fontSize: rem(20),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  control: {
    height: rem(42),
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan('xs')]: {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
}))
