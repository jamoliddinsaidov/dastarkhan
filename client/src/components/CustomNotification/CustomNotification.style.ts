import { createStyles, rem } from '@mantine/core'

export const useCustomNotificationStyles = createStyles((theme) => ({
  wrapper: {
    margin: `${rem(16)} 0`,
    width: '100%',

    a: {
      color: 'inherit',
      fontWeight: 600,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}))
