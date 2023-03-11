import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Header, Container, Group, Burger, Paper, Transition, Title } from '@mantine/core'
import { LanguageSelect } from '../LanguageSelect/LanguageSelect'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { useDisclosure } from '@mantine/hooks'
import { useGeneralHeaderStyles, HEADER_HEIGHT } from './GeneralHeader.style'
import { useGeneralHeaderLinks } from './generalHeaderLinks'
import { getCurrentActiveLink } from '../../utils'

export const GeneralHeader = () => {
  const [opened, { toggle, close }] = useDisclosure(false)
  const { classes, cx } = useGeneralHeaderStyles()

  const { pathname } = useLocation()
  const [active, setActive] = useState(getCurrentActiveLink(pathname))

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

  return (
    <Header height={HEADER_HEIGHT} mb={150} className={classes.root}>
      <Container className={classes.header}>
        <Title order={1}>dastarkhan</Title>

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
