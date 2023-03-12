import { useRef } from 'react'
import { Text, Group, Button, rem } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react'
import { useDropzoneStyles } from './Dropzone.style'
import { useTranslation } from 'react-i18next'

export const CustomDropzone = () => {
  const { t } = useTranslation()
  const { classes, theme } = useDropzoneStyles()
  const openRef = useRef<() => void>(null)

  const onDrop = () => {}

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={onDrop}
        className={classes.dropzone}
        radius='md'
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position='center'>
            <Dropzone.Accept>
              <IconDownload size={rem(50)} color={theme.colors[theme.primaryColor]?.[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={rem(50)} color={theme.colors.orange[5]} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta='center' fw={700} fz='lg' mt='xl'>
            <Dropzone.Accept>{t('drop_files_here')}</Dropzone.Accept>
            <Dropzone.Reject>{t('drop_file_error')}</Dropzone.Reject>
            <Dropzone.Idle>{t('upload_photo')}</Dropzone.Idle>
          </Text>
          <Text ta='center' fz='sm' mt='xs' c='dimmed'>
            {t('dropzone_description')}
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size='md' radius='xl' onClick={() => openRef.current?.()}>
        {t('select_files')}
      </Button>
    </div>
  )
}
