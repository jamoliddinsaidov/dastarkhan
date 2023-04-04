import { Text, Group, Paper, Flex } from '@mantine/core'
import { formatDate } from '../../utils'
import { useCommentStyles } from './Comment.style'
import { IconDotsVertical } from '@tabler/icons-react'

interface CommentProps {
  createdAt: string | null
  comment: string
  user: {
    name: string
    userId: string | null
  }
}

export const Comment = ({ createdAt, comment, user }: CommentProps) => {
  const { classes } = useCommentStyles()
  return (
    <Paper withBorder radius='md' className={classes.comment}>
      <Flex align='center' justify='space-between'>
        <Group>
          <Text size='sm' className={classes.userName}>
            {user.name}
          </Text>
          <Text size='xs' color='dimmed' mt={4}>
            {formatDate(createdAt)}
          </Text>
        </Group>
        <IconDotsVertical size={16} cursor='pointer' />
      </Flex>
      <Text className={classes.body} size='sm'>
        {comment}
      </Text>
    </Paper>
  )
}
