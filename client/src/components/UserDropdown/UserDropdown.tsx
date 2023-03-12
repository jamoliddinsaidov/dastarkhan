import { useState } from 'react'
import { Avatar, UnstyledButton, Group, Text, Menu, rem } from '@mantine/core'
import { IconLogout, IconHeart, IconStar, IconFriends, IconSettings, IconChevronDown } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useUserDropdownStyles } from './UserDropdown.style'
import { useAppDispatch } from '../../store/hooks'
import { changeLink } from '../../store/activeLink/activeLinkSlice'

interface UserdropdownProps {
  closeBurgerMenuOnMobile?: () => void
}

export const UserDropdown = ({ closeBurgerMenuOnMobile }: UserdropdownProps) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const { classes, theme, cx } = useUserDropdownStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // TODO: use props to get the real user
  const user = {
    name: 'John Doe',
  }

  const navigateToAPage = (pathname: string) => {
    navigate(pathname)
    dispatch(changeLink(pathname))
    setUserMenuOpened(false)
    closeBurgerMenuOnMobile?.()
  }

  return (
    <Menu
      width={260}
      position='bottom-end'
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group spacing={7}>
            <Avatar alt={user.name} radius='xl' size={20} />
            <Text weight={500} size='sm' sx={{ lineHeight: 1 }}>
              {user.name}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<IconHeart size='0.9rem' color={theme.colors.red[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/likedPosts')}
        >
          {t('liked_posts')}
        </Menu.Item>
        <Menu.Item
          icon={<IconStar size='0.9rem' color={theme.colors.yellow[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/savedPosts')}
        >
          {t('saved_posts')}
        </Menu.Item>
        <Menu.Item
          icon={<IconFriends size='0.9rem' color={theme.colors.blue[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/friends')}
        >
          {t('your_friends')}
        </Menu.Item>

        <Menu.Label>{t('settings')}</Menu.Label>
        <Menu.Item icon={<IconSettings size='0.9rem' stroke={1.5} />} onClick={() => navigateToAPage('/user/settings')}>
          {t('account_settings')}
        </Menu.Item>
        <Menu.Item icon={<IconLogout size='0.9rem' stroke={1.5} />}>{t('logout')}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
