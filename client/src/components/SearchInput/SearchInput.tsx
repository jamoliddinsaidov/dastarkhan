import { TextInput, ActionIcon, useMantineTheme, createStyles } from '@mantine/core'
import { IconSearch, IconArrowRight } from '@tabler/icons-react'

const useStyles = createStyles({
  search: {
    width: '100%',
    margin: 'auto',
  },
})

interface SearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  placeholder: string
}

export function SearchInput({ value, onChange, onClick, placeholder }: SearchInputProps) {
  const theme = useMantineTheme()
  const { classes } = useStyles()

  return (
    <TextInput
      className={classes.search}
      icon={<IconSearch size={18} stroke={1.5} />}
      radius='md'
      size='md'
      rightSection={
        <ActionIcon size={32} radius='md' color={theme.primaryColor} variant='filled' onClick={onClick}>
          <IconArrowRight size={18} stroke={1.5} />
        </ActionIcon>
      }
      placeholder={placeholder}
      rightSectionWidth={42}
      value={value}
      onChange={onChange}
    />
  )
}
