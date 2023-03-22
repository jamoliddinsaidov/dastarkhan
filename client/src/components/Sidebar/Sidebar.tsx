import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Group, Text } from '@mantine/core'
import { useSidebarStyles } from './Sidebar.style'
import { useSidebarLinks } from './useSidebarLinks'

interface SidebarProps {
  userName: string
}

export const Sidebar = ({ userName }: SidebarProps) => {
  const { classes, cx } = useSidebarStyles()
  const [active, setActive] = useState('likedPosts')
  const sidebarLinks = useSidebarLinks()

  const links = sidebarLinks.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.link === active })}
      to={item.link}
      key={item.link}
      onClick={() => {
        setActive(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <Navbar width={{ sm: 300 }} p='md'>
      <Group className={classes.header} position='apart'>
        <Text className={classes.userName}>{userName}</Text>
      </Group>
      <Navbar.Section>{links}</Navbar.Section>
    </Navbar>
  )
}
