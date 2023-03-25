import { createStyles, rem } from '@mantine/core'

export const useSubPagesStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    marginTop: rem(42),
  },

  containerMargin: {
    margin: rem(8),
  },
}))
