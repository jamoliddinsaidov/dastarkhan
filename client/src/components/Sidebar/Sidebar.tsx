import { Link, useLocation } from 'react-router-dom'
import { Navbar, Group, Text } from '@mantine/core'
import { useSidebarStyles } from './Sidebar.style'
import { useSidebarLinks } from './useSidebarLinks'

interface SidebarProps {
  userName: string
}

export const Sidebar = ({ userName }: SidebarProps) => {
  const { classes, cx } = useSidebarStyles()
  const location = useLocation()
  const activeLink = location.pathname.split('/')[3]
  const sidebarLinks = useSidebarLinks()

  const links = sidebarLinks.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.link === activeLink })}
      to={item.link}
      key={item.link}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <Navbar width={{ sm: 300 }} p='md' className={classes.navbar}>
      <Group className={classes.header}>
        <Text className={classes.userName}>{userName}</Text>
      </Group>
      <Navbar.Section>{links}</Navbar.Section>
    </Navbar>
  )
}
