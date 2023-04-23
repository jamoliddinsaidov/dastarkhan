import { Text, Group, Paper, Flex, Popover, Button, LoadingOverlay } from '@mantine/core'
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCommentStyles } from './Comment.style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUserInfo } from '../../store/user/userSelectors'
import { formatDate } from '../../utils'
import { deleteComment } from '../../store/food/foodServices'

interface CommentProps {
  commentId: string
  createdAt: string | null
  comment: string
  foodId: string
  user: {
    name: string
    userId: string | null
  }
}

export const Comment = ({ createdAt, comment, user, foodId, commentId }: CommentProps) => {
  const { t } = useTranslation()
  const { classes } = useCommentStyles()
  const [opened, { close, open }] = useDisclosure(false)
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(getUserInfo)

  const onDeleteComment = () => {
    dispatch(deleteComment({ foodId, commentId }))
  }

  useEffect(() => {
    document.body.addEventListener('click', close)

    return () => {
      document.body.removeEventListener('click', close)
    }
  }, [])

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
        {user.userId === currentUser._id && (
          <Popover width={130} position='left' withArrow shadow='md' opened={opened}>
            <Popover.Target>
              <IconDotsVertical
                size={16}
                cursor='pointer'
                onClick={(mouseEvent) => {
                  mouseEvent.stopPropagation()
                  opened ? close() : open()
                }}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <Button leftIcon={<IconEdit size='1.1rem' />} variant='outline' fullWidth color='blue' mb={12} size='xs'>
                {t('edit')}
              </Button>
              <Button
                leftIcon={<IconTrash size='1.1rem' />}
                variant='outline'
                fullWidth
                color='red'
                size='xs'
                onClick={onDeleteComment}
              >
                {t('delete')}
              </Button>
            </Popover.Dropdown>
          </Popover>
        )}
      </Flex>
      <Text className={classes.body} size='sm'>
        {comment}
      </Text>
    </Paper>
  )
}
