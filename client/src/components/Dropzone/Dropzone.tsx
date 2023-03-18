import { useRef } from 'react'
import { Text, Group, Button, rem, LoadingOverlay, Overlay } from '@mantine/core'
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react'
import { useDropzoneStyles } from './Dropzone.style'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { uploadImage } from '../../store/food/foodServices'
import { getFoodState } from '../../store/food/foodSelectors'

export const CustomDropzone = () => {
  const { t } = useTranslation()
  const { classes, theme, cx } = useDropzoneStyles()
  const openRef = useRef<() => void>(null)
  const dispatch = useAppDispatch()
  const foodState = useAppSelector(getFoodState)
  const isFoodImageLoaded = !!foodState.uploadedImageUrl

  const onDrop = (files: FileWithPath[]) => {
    const imageFile = files[0]
    const formData = new FormData()
    formData.append('image', imageFile as File)

    dispatch(uploadImage(formData))
  }

  const onClick = () => {
    openRef.current?.()
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={onDrop}
        className={cx(classes.dropzone, { [classes.disabled]: isFoodImageLoaded })}
        radius='md'
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={6291456}
        disabled={isFoodImageLoaded}
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
            <Dropzone.Idle>{isFoodImageLoaded ? t('image_uploaded') : t('upload_photo')}</Dropzone.Idle>
          </Text>
          <Text ta='center' fz='sm' mt='xs' c='dimmed'>
            {!isFoodImageLoaded ? t('dropzone_description') : ''}
          </Text>
        </div>
      </Dropzone>
      <Button
        className={classes.control}
        size='md'
        radius='xl'
        onClick={onClick}
        disabled={foodState.isUploadingImage || isFoodImageLoaded}
      >
        {t('select_files')}
      </Button>
      <LoadingOverlay visible={foodState.isUploadingImage} overlayBlur={2} />
    </div>
  )
}
