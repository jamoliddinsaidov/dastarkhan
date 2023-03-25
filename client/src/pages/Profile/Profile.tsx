import { Flex } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components'
import { useAppSelector } from '../../store/hooks'
import { getUserInfo } from '../../store/user/userSelectors'

export const Profile = () => {
  const user = useAppSelector(getUserInfo)

  return (
    <Flex align='flex-start'>
      <Sidebar userName={user.name} />
      <Outlet />
    </Flex>
  )
}
