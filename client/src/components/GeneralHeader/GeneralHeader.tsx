import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Header, Container, Group, Burger, Paper, Transition, Title, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { LanguageSelect } from '../LanguageSelect/LanguageSelect'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { useGeneralHeaderStyles, HEADER_HEIGHT } from './GeneralHeader.style'
import { useGeneralHeaderLinks } from './generalHeaderLinks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeLink } from '../../store/activeLink/activeLinkSlice'
import { getCurrentActiveLink } from '../../utils'

export const GeneralHeader = () => {
  const [opened, { toggle, close }] = useDisclosure(false)
  const { classes, cx } = useGeneralHeaderStyles()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const activeLink = useAppSelector((state) => state.activeLink.activeLink)
  const links = useGeneralHeaderLinks()
  const linkItems = links.map(({ link, label }) => (
    <Link
      to={link}
      key={label}
      className={cx(classes.link, { [classes.linkActive]: activeLink === link })}
      onClick={() => {
        dispatch(changeLink(link))
        close()
      }}
    >
      {label}
    </Link>
  ))

  const navigateToHome = () => {
    navigate('home')
    dispatch(changeLink('home'))
  }

  useEffect(() => {
    dispatch(changeLink(getCurrentActiveLink(pathname)))
  }, [])

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Title order={1} className={classes.title} onClick={navigateToHome}>
          Dastarkhan
        </Title>
        <Group spacing={5} className={classes.hideOnMobile}>
          {linkItems}
        </Group>
        <Group spacing={15} className={classes.hideOnMobile}>
          <LanguageSelect />
          <ThemeToggle />
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
        <Transition transition='pop-top-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {linkItems}
              <Group spacing={1}>
                <LanguageSelect show />
                <ThemeToggle />
              </Group>
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
