import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core'
import { IconSearch, IconArrowRight } from '@tabler/icons-react'

interface SearchInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  placeholder: string
  width?: string
}

export function SearchInput({ value, onChange, onClick, placeholder, width }: SearchInputProps) {
  const theme = useMantineTheme()

  const onKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onClick()
    }
  }

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius='md'
      size='md'
      w={width ? width : '100%'}
      rightSection={
        <ActionIcon size={32} radius='md' color={theme.primaryColor} variant='filled' onClick={onClick}>
          <IconArrowRight size={18} stroke={1.5} />
        </ActionIcon>
      }
      placeholder={placeholder}
      rightSectionWidth={42}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}
