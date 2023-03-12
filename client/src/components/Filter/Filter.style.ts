import { createStyles, rem } from '@mantine/core'

export const useFilterStyles = createStyles((theme) => ({
  wrapper: {
    label: {
      marginBottom: `${rem(8)}`,
    },
  },

  applyBtn: {
    marginTop: `${rem(24)}`,
    marginLeft: 'auto',
  },

  filtersBox: {
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('lg')]: {
      flexWrap: 'wrap',
      gap: `${rem(16)}`,
      justifyContent: 'center',
    },
  },

  filtersLabel: {
    color: theme.colors.orange?.[5],
    fontWeight: 600,
    letterSpacing: '0.1px',
  },
}))
