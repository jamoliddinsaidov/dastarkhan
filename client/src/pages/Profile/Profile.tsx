import { Flex } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components'
import { Toaster } from '../../components/Toaster/Toaster'
import { useAppSelector } from '../../store/hooks'
import { getUserInfo, getUserStateError } from '../../store/user/userSelectors'

export const Profile = () => {
  const user = useAppSelector(getUserInfo)
  const userStateError = useAppSelector(getUserStateError)

  return (
    <Flex align='flex-start'>
      <Sidebar userName={user.name} />
      <Outlet />
      <Toaster opened={!!userStateError} text={userStateError} isError />
    </Flex>
  )
}
