import { Group, ActionIcon, Title, Container, Text } from '@mantine/core'
import { IconBrandTwitter, IconBrandInstagram, IconBrandTelegram } from '@tabler/icons-react'
import { useFooterStyles } from './Footer.style'
import { Link } from 'react-router-dom'
import { useGeneralHeaderLinks } from '../GeneralHeader/generalHeaderLinks'

export const Footer = () => {
  const { classes } = useFooterStyles()
  const links = useGeneralHeaderLinks()

  return (
    <div className={classes.footer}>
      <Container>
        <div className={classes.inner}>
          <Title order={2} className={classes.title}>
            Dastarkhan
          </Title>

          <Group className={classes.links}>
            {links.map((link) => (
              <Link key={link.label} to={link.link} className={classes.footerLink}>
                {link.label}
              </Link>
            ))}
          </Group>

          <Group spacing='xs' position='right' noWrap>
            <ActionIcon size='lg' variant='default' radius='xl'>
              <IconBrandTelegram size='1.05rem' stroke={1.5} />
            </ActionIcon>
            <ActionIcon size='lg' variant='default' radius='xl'>
              <IconBrandTwitter size='1.05rem' stroke={1.5} />
            </ActionIcon>
            <ActionIcon size='lg' variant='default' radius='xl'>
              <IconBrandInstagram size='1.05rem' stroke={1.5} />
            </ActionIcon>
          </Group>
        </div>

        <Text color='dimmed' size='sm' className={classes.copyright}>
          <Link to='https://github.com/jamoliddinsaidov' target='_blank'>
            Jamoliddin Saidov
          </Link>
          , 2023
        </Text>
      </Container>
    </div>
  )
}
