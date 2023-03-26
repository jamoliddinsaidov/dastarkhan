import { useState } from 'react'
import { Flex, Tabs } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useFriendsStyles } from './Friends.style'
import { SearchPeople } from './SearchPeople'
import { Followings } from './Followings'
import { Followers } from './Followers'

export const Friends = () => {
  const { t } = useTranslation()
  const { classes } = useFriendsStyles()
  const [activeTab, setActiveTab] = useState('followings')

  return (
    <Flex direction='column' className={classes.flexContainer}>
      <Tabs defaultValue='followings'>
        <Tabs.List className={classes.tablist}>
          <Tabs.Tab value='followings' className={classes.tab} onClick={() => setActiveTab('followings')}>
            {t('followings')}
          </Tabs.Tab>
          <Tabs.Tab value='followers' className={classes.tab} onClick={() => setActiveTab('followers')}>
            {t('followers')}
          </Tabs.Tab>
          <Tabs.Tab value='people' className={classes.tab} onClick={() => setActiveTab('people')}>
            {t('search_people')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='followings' pt='xs'>
          <Followings activeTab={activeTab} />
        </Tabs.Panel>

        <Tabs.Panel value='followers' pt='xs'>
          <Followers activeTab={activeTab} />
        </Tabs.Panel>

        <Tabs.Panel value='people' pt='xs'>
          <SearchPeople activeTab={activeTab} />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  )
}
