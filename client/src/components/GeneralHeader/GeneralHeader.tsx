import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Header, Container, Group, Burger, Paper, Transition, Title, Text } from '@mantine/core'
import { LanguageSelect } from '../LanguageSelect/LanguageSelect'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { useDisclosure } from '@mantine/hooks'
import { useGeneralHeaderStyles, HEADER_HEIGHT } from './GeneralHeader.style'
import { useGeneralHeaderLinks } from './generalHeaderLinks'
import { getCurrentActiveLink } from '../../utils'
import { useTranslation } from 'react-i18next'

export const GeneralHeader = () => {
  const [opened, { toggle, close }] = useDisclosure(false)
  const { classes, cx } = useGeneralHeaderStyles()
  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()

  // TODO: move active link to global state
  const [active, setActive] = useState(getCurrentActiveLink(location.pathname))

  const links = useGeneralHeaderLinks()
  const items = links.map(({ link, label }) => (
    <Link
      to={link}
      key={label}
      className={cx(classes.link, { [classes.linkActive]: active === link })}
      onClick={() => {
        setActive(link)
        close()
      }}
    >
      {label}
    </Link>
  ))

  const navigateToHome = () => {
    navigate('home')
    setActive('home')
  }

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Title order={1} className={classes.title} onClick={navigateToHome}>
          Dastarkhan
        </Title>
        <Group spacing={5} className={classes.hideOnMobile}>
          {items}
        </Group>
        <Group spacing={15} className={classes.hideOnMobile}>
          <LanguageSelect />
          <ThemeToggle />
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
        <Transition transition='pop-top-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
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
