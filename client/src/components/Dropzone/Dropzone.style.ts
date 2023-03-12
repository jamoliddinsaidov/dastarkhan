import { createStyles, rem } from '@mantine/core'

export const useDropzoneStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    margin: `${rem(48)} auto`,
    width: '90%',

    [theme.fn.smallerThan('sm')]: {
      marginBottom: `${rem(48)}`,
    },
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
  },
}))
