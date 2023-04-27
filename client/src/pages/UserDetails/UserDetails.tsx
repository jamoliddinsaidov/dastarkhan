import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge, Divider, Flex, Group, Tabs, Text, Title } from '@mantine/core'
import { useUserDetailsStyles } from './UserDetails.style'
import { IUser } from '../../store/user/userServices'
import { getUserByIdUrl } from '../../api/user'
import { Toaster } from '../../components/Toaster/Toaster'
import { getUserBadgesInfo } from '../../utils'
import { Followings } from '../Friends/Followings'
import { Followers } from '../Friends/Followers'
import { Reviews } from '../Profile/subPages'

export const UserDetails = () => {
  const { t } = useTranslation()
  const { classes, cx } = useUserDetailsStyles()
  const { userId } = useParams()

  const [userDetails, setUserDetails] = useState<IUser | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [activeTab, setActiveTab] = useState('reviews')
  const profileBadges = getUserBadgesInfo(userDetails, t)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(getUserByIdUrl.href, { params: { userId } })
        setUserDetails(response.data.data)
      } catch (error) {
        setErrorMsg(t('user_doesnt_exist')!)
      }
    }

    fetchUserDetails()
  }, [userId])

  return (
    <div className={cx(classes.wrapper, classes.relativePosition)}>
      {userDetails?._id && (
        <>
          <Title className={classes.title}>{userDetails.name}</Title>
          <Text color='dimmed' mb={12}>
            {userDetails.email}
          </Text>
          <Divider />
          <Group py={24}>
            {profileBadges.map((profileBadge) => (
              <Badge variant='light' size='sm' key={profileBadge}>
                {profileBadge}
              </Badge>
            ))}
          </Group>
          <Divider />
          <Flex direction='column'>
            <Tabs defaultValue='reviews' mt={16}>
              <Tabs.List className={classes.tablist}>
                <Tabs.Tab value='reviews' className={classes.tab} onClick={() => setActiveTab('reviews')}>
                  {t('reviews')}
                </Tabs.Tab>
                <Tabs.Tab value='followings' className={classes.tab} onClick={() => setActiveTab('followings')}>
                  {t('followings')}
                </Tabs.Tab>
                <Tabs.Tab value='followers' className={classes.tab} onClick={() => setActiveTab('followers')}>
                  {t('followers')}
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='reviews' pt='xs'>
                <Reviews userId={userId} />
              </Tabs.Panel>
              <Tabs.Panel value='followings' pt='xs'>
                <Followings activeTab={activeTab} userDetails={userDetails} />
              </Tabs.Panel>
              <Tabs.Panel value='followers' pt='xs'>
                <Followers activeTab={activeTab} userDetails={userDetails} />
              </Tabs.Panel>
            </Tabs>
          </Flex>
        </>
      )}
      {errorMsg && <Toaster opened={!!errorMsg} text={errorMsg} isError />}
    </div>
  )
}
