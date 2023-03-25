import React, { FormEvent, useState } from 'react'
import { Button, Flex, LoadingOverlay, Textarea, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { getIsAddingComment } from '../../store/food/foodSelectors'
import { addComment } from '../../store/food/foodServices'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUserInfo } from '../../store/user/userSelectors'
import { useAddCommentStyles } from './AddComment.style'

interface AddCommentProps {
  foodId: string
}

export const AddComment = ({ foodId }: AddCommentProps) => {
  const { t } = useTranslation()
  const { classes } = useAddCommentStyles()

  const dispatch = useAppDispatch()
  const isAddingComment = useAppSelector(getIsAddingComment)
  const user = useAppSelector(getUserInfo)

  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState(user.name ?? '')

  const onAddComment = (event: FormEvent) => {
    event.preventDefault()
    const newComment = { foodId, userId: user?._id ?? null, userName, comment }

    dispatch(addComment(newComment))

    setComment('')
    !user.name && setUserName('')
  }

  return (
    <form onSubmit={onAddComment} className={classes.relativePosition}>
      <Textarea
        label={t('your_comment')}
        placeholder={t('your_opinion')!}
        minRows={4}
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
        withAsterisk
        autosize
      />
      {!user?._id && (
        <TextInput
          label={t('your_name')}
          placeholder={t('your_name')!}
          value={userName}
          onChange={(event) => setUserName(event.currentTarget.value)}
          radius='sm'
          mt='md'
          required
        />
      )}
      <Flex align='center' justify='flex-end'>
        <Button radius='sm' type='submit' mt='lg' disabled={!(comment.length && userName.length)}>
          {t('add_comment')}
        </Button>
      </Flex>
      <LoadingOverlay visible={isAddingComment} />
    </form>
  )
}
