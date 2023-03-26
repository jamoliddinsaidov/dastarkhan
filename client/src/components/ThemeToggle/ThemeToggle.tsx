import { useMantineColorScheme, ActionIcon, Group, rem } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'

interface ThemeToggleProps {
  onClickCallback?: () => void
}

export const ThemeToggle = ({ onClickCallback }: ThemeToggleProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const onClick = () => {
    toggleColorScheme()
    onClickCallback?.()
  }

  return (
    <Group position='center' my='xl'>
      <ActionIcon
        onClick={onClick}
        size='lg'
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.orange[6],
          [theme.fn.smallerThan('md')]: {
            margin: rem(16),
          },
          [theme.fn.smallerThan('sm')]: {
            margin: `0 0 ${rem(16)} ${rem(16)}`,
          },
        })}
      >
        {colorScheme === 'dark' ? <IconSun size='1.2rem' /> : <IconMoonStars size='1.2rem' />}
      </ActionIcon>
    </Group>
  )
}
