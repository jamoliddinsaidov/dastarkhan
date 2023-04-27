import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Flex, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deleteProfile } from '../../store/user/userServices'
import { getUserId } from '../../store/user/userSelectors'

export const DeleteModal = () => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userId = useAppSelector(getUserId)

  const onDelete = () => {
    console.log(userId)
    dispatch(deleteProfile(userId))
    navigate('/home')
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('delete_account_title')} centered zIndex={1000}>
        <Text weight={600}>{t('delete_account_text')}</Text>

        <Flex align='center' justify='flex-end' mt={16}>
          <Button radius='sm' color='red' variant='outline' mr={16} onClick={onDelete}>
            {t('delete')}
          </Button>
          <Button radius='sm' color='blue' variant='outline' onClick={close}>
            {t('cancel')}
          </Button>
        </Flex>
      </Modal>

      <Group>
        <Button radius='sm' mt={8} color='red' onClick={open}>
          {t('delete_account_btn')}
        </Button>
      </Group>
    </>
  )
}
