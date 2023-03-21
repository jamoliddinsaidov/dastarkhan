import { createStyles } from '@mantine/core'

export const useToasterStyles = createStyles((theme) => ({
  wrapper: {
    border: '1px solid',
  },

  successBorderColor: {
    borderColor: theme.colors.green[5],
  },

  errorBorderColor: {
    borderColor: theme.colors.red[5],
  },
}))
