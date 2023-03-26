import { useState } from 'react'
import { UnstyledButton, Group, Text, Menu, rem } from '@mantine/core'
import {
  IconLogout,
  IconHeart,
  IconSettings,
  IconChevronDown,
  IconBookmark,
  IconUsers,
  IconUserHeart,
  IconWriting,
  IconBell,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useUserDropdownStyles } from './UserDropdown.style'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeLink } from '../../store/activeLink/activeLinkSlice'
import { logoutUser } from '../../store/user/userServices'
import { getUserInfo } from '../../store/user/userSelectors'

interface UserdropdownProps {
  closeBurgerMenuOnMobile?: () => void
}

export const UserDropdown = ({ closeBurgerMenuOnMobile }: UserdropdownProps) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const { classes, theme, cx } = useUserDropdownStyles()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUserInfo)

  const navigateToAPage = (pathname: string) => {
    navigate(pathname)
    dispatch(changeLink(pathname))
    setUserMenuOpened(false)
    closeBurgerMenuOnMobile?.()
  }

  const onLogout = () => {
    dispatch(logoutUser(user.email))
    navigateToAPage('home')
  }

  return (
    <Menu
      width={260}
      position='bottom-end'
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
      shadow='lg'
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group spacing={7}>
            <Text className={classes.userText}>{user?.name}</Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<IconBell size='0.9rem' color={theme.colors.cyan[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/profile/notifications')}
        >
          {t('profile')}
        </Menu.Item>
        <Menu.Item
          icon={<IconHeart size='0.9rem' color={theme.colors.red[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/profile/likedPosts')}
        >
          {t('liked_posts')}
        </Menu.Item>
        <Menu.Item
          icon={<IconBookmark size='0.9rem' color={theme.colors.yellow[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/profile/savedPosts')}
        >
          {t('saved_posts')}
        </Menu.Item>
        <Menu.Item
          icon={<IconUserHeart size='0.9rem' color={theme.colors.blue[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/profile/friends')}
        >
          {t('friends')}
        </Menu.Item>
        <Menu.Item
          icon={<IconWriting size='0.9rem' color={theme.colors.orange[6]} stroke={1.5} />}
          onClick={() => navigateToAPage('/user/profile/reviews')}
        >
          {t('reviews')}
        </Menu.Item>
        <Menu.Label>{t('settings')}</Menu.Label>
        <Menu.Item
          icon={<IconSettings size='0.9rem' stroke={1.5} />}
          onClick={() => navigateToAPage('/user/profile/settings')}
        >
          {t('account_settings')}
        </Menu.Item>
        <Menu.Item icon={<IconLogout size='0.9rem' stroke={1.5} />} onClick={onLogout}>
          {t('logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
