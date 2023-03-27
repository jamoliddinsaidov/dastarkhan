import { createStyles } from '@mantine/core'

export const useContactIconsStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundColor: 'transparent',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    fontWeight: 500,
  },

  description: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
  },
}))
