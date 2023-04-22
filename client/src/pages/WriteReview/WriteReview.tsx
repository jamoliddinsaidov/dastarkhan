import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  Button,
  Slider,
  Flex,
  Textarea,
  NumberInput,
  Select,
  LoadingOverlay,
  Dialog,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { useWriteReviewStyles } from './WriteReview.style'
import { CustomDropzone } from '../../components'
import { useFiltersList } from '../../components/Filter/useFiltersList'
import { addFoodReview } from '../../store/food/foodServices'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUserInfo } from '../../store/user/userSelectors'
import { getFoodState } from '../../store/food/foodSelectors'
import { noImageUrl } from '../../utils/constants'
import { cleanUpReviewInputValues } from '../../utils'
import { Toaster } from '../../components/Toaster/Toaster'

export const WriteReview = () => {
  const { t } = useTranslation()
  const { classes } = useWriteReviewStyles()
  const { foodTypeFilters, serviceTypeFilters } = useFiltersList()
  const dispatch = useAppDispatch()

  const user = useAppSelector(getUserInfo)
  const foodState = useAppSelector(getFoodState)

  const form = useForm({
    initialValues: {
      rating: 0,
      city: '',
      photo: File,
      name: '',
      foodName: '',
      foodPlaceName: '',
      review: '',
      price: 0,
      foodType: '',
      serviceType: '',
    },

    validate: {
      review: (val) => (!val.length ? 'Please provide a value' : null),
      price: (val) => (!val ? 'Please prove a price' : null),
      foodType: (val) => (!val ? "Please select the food's type" : null),
      serviceType: (val) => (!val ? 'Please select the service type' : null),
    },
  })

  const onSubmit = () => {
    const reviewedUser = user._id ? { name: user.name, userId: user._id } : { name: form.values.name, userId: '' }
    const { rating, city, foodName, review, price, foodType, foodPlaceName, serviceType } = form.values
    const image = foodState.uploadedImageUrl.length ? foodState.uploadedImageUrl : noImageUrl

    const foodReview = {
      rating,
      city,
      foodName,
      foodPlaceName,
      review,
      price,
      foodType,
      serviceType,
      image,
      user: reviewedUser,
    }

    dispatch(addFoodReview(foodReview))
    cleanUpReviewInputValues(form)
  }

  return (
    <Container size={900} my={30} pos='relative'>
      <Title align='center'>{t('write_a_review')}</Title>
      <Text c='dimmed' fz='sm' ta='center' mt='md'>
        {t('write_review_description')}
      </Text>

      <Paper withBorder shadow='md' p={30} radius='md' mt='xl'>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label={t('food_name')}
            placeholder={t('food_name')!}
            className={classes.input}
            radius='md'
            required
            value={form.values.foodName}
            onChange={(event) => form.setFieldValue('foodName', event.currentTarget.value)}
          />
          <TextInput
            label={t('food_place_name')}
            placeholder={t('food_place_name')!}
            className={classes.input}
            radius='md'
            required
            value={form.values.foodPlaceName}
            onChange={(event) => form.setFieldValue('foodPlaceName', event.currentTarget.value)}
          />
          <Textarea
            className={classes.input}
            label={t('your_review')}
            placeholder={t('your_opinion')!}
            autosize
            minRows={4}
            withAsterisk
            value={form.values.review}
            onChange={(event) => form.setFieldValue('review', event.currentTarget.value)}
            error={form.errors?.review}
          />
          <Flex align='center' justify='space-between' gap='xl' mt='-1.5rem' className={classes.flexBox}>
            <TextInput
              label={t('city_town')}
              placeholder={t('city_town_placeholder')!}
              className={classes.input}
              radius='md'
              required
              value={form.values.city}
              onChange={(event) => form.setFieldValue('city', event.currentTarget.value)}
            />
            <Flex direction='column' className={classes.flexBox}>
              <Text fw={500} fz='1rem'>
                {t('rating')}
              </Text>
              <Slider
                labelTransition='skew-down'
                labelTransitionDuration={150}
                labelTransitionTimingFunction='ease'
                min={0}
                max={5}
                step={0.5}
                size='xl'
                value={form.values.rating}
                onChange={(value) => form.setFieldValue('rating', value)}
              />
            </Flex>
          </Flex>

          <Flex align='center' justify='space-between' className={classes.flexBox}>
            <NumberInput
              defaultValue={0}
              placeholder={t('price')!}
              label={t('price')}
              withAsterisk
              value={form.values.price}
              onChange={(value) => form.setFieldValue('price', Number(value))}
              error={form.errors?.price}
              type='number'
              min={0}
            />

            <Select
              label={t('food_type')}
              placeholder={t('pick_one')!}
              data={foodTypeFilters}
              onChange={(value) => form.setFieldValue('foodType', value ?? '')}
              error={form.errors?.foodType}
              dropdownPosition='bottom'
              required
            />
            <Select
              label={t('service_type')}
              placeholder={t('pick_one')!}
              data={serviceTypeFilters}
              onChange={(value) => form.setFieldValue('serviceType', value ?? '')}
              error={form.errors?.serviceType}
              dropdownPosition='bottom'
              required
            />
          </Flex>
          <CustomDropzone />
          {!user?._id && (
            <TextInput
              label={t('name')}
              placeholder={t('your_name')!}
              className={classes.input}
              radius='md'
              required
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          )}
          <Flex align='center' justify='center'>
            <Button radius='lg' className={classes.button} type='submit' disabled={foodState.isUploadingImage}>
              {t('complete')}
            </Button>
          </Flex>
        </form>
      </Paper>

      <LoadingOverlay visible={foodState.loading} overlayBlur={1} />
      <Dialog
        opened={foodState.success}
        size='lg'
        radius='md'
        shadow='xl'
        withBorder
        transition='slide-left'
        transitionDuration={300}
        transitionTimingFunction='ease'
      >
        <Flex align='center' justify='space-between'>
          <Text size='sm' mb='xs' weight={500}>
            {t('review_created')}
          </Text>
        </Flex>
      </Dialog>
      <Toaster opened={!!foodState.error} text={foodState.error} isError />
    </Container>
  )
}
