import { createStyles, rem } from '@mantine/core'

export const useWriteReviewStyles = createStyles((theme) => ({
  input: {
    width: '90%',
    margin: `${rem(32)} auto`,
  },

  flexBox: {
    width: '90%',
    margin: `0 auto`,

    [theme.fn.smallerThan('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: `${rem(16)} auto`,
      gap: 0,
    },
  },

  button: {
    width: '30%',

    [theme.fn.smallerThan('sm')]: {
      marginTop: `${rem(16)}`,
      width: '80%',
    },
  },
}))
