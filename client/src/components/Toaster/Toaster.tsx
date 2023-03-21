import { Dialog, Text } from '@mantine/core'
import { useToasterStyles } from './Toaster.style'

interface ToasterProps {
  text: string
  opened: boolean
  position?: {}
  isError?: boolean
}

export const Toaster = ({ text, opened, position = { top: 20, right: 20 }, isError = false }: ToasterProps) => {
  const { classes, cx } = useToasterStyles()
  const borderColor = isError ? 'errorBorderColor' : 'successBorderColor'

  return (
    <Dialog
      opened={opened}
      size='md'
      radius='md'
      position={position}
      className={cx(classes.wrapper, classes[borderColor])}
    >
      <Text size='sm' weight={500}>
        {text}
      </Text>
    </Dialog>
  )
}
