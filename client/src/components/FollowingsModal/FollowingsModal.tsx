import { Button, Flex, Group, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getPeople, getUserInfo } from '../../store/user/userSelectors'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { getFollowings, recommendFood } from '../../store/user/userServices'
import { useFollowingsModalStyles } from './FollowingsModal.style'

interface FollowingsModalProps {
  foodName: string
  foodId: string
  setIsRecommended: Dispatch<SetStateAction<boolean>>
}

export const FollowingsModal = ({ foodId, foodName, setIsRecommended }: FollowingsModalProps) => {
  const { t } = useTranslation()
  const { classes } = useFollowingsModalStyles()
  const [opened, { open, close }] = useDisclosure(false)

  const dispatch = useAppDispatch()
  const user = useAppSelector(getUserInfo)
  const followings = useAppSelector(getPeople)

  const onRecommendClick = (recommendedUserId: string) => {
    dispatch(
      recommendFood({
        userId: user._id,
        userName: user.name,
        recommendedUserId,
        foodId,
      })
    )
    setIsRecommended(true)
    setTimeout(() => {
      setIsRecommended(false)
    }, 1500)

    close()
  }

  useEffect(() => {
    dispatch(getFollowings(user.followings))
  }, [])

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('followings')}>
        <Flex className={classes.flexContainer}>
          <Text className={classes.recommendText}>{t('recommend_text', { foodName })}</Text>
          {followings.map((following) => (
            <UnstyledButton
              key={following._id}
              className={classes.unstyledButton}
              onClick={() => {
                onRecommendClick(following._id)
              }}
            >
              {following.name}
            </UnstyledButton>
          ))}
        </Flex>
      </Modal>

      <Group>
        <Button onClick={open} disabled={!followings.length}>
          {t('recommend')}
        </Button>
      </Group>
    </>
  )
}
