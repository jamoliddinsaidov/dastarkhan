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
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { CustomDropzone } from '../../components'
import { useFiltersList } from '../../components/Filter/useFiltersList'
import { useWriteReviewStyles } from './WriteReview.style'

export const WriteReview = () => {
  const { t } = useTranslation()
  const { classes } = useWriteReviewStyles()
  const { foodTypeFilters, serviceTypeFilters } = useFiltersList()
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

  return (
    <Container size={900} my={30}>
      <Title align='center'>{t('write_a_review')}</Title>
      <Text c='dimmed' fz='sm' ta='center' mt='md'>
        {t('write_review_description')}
      </Text>

      <Paper withBorder shadow='md' p={30} radius='md' mt='xl'>
        <form
          onSubmit={form.onSubmit(() => {
            console.log(form.values)
          })}
        >
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
          <TextInput
            label={t('name')}
            placeholder={t('your_name')!}
            className={classes.input}
            radius='md'
            required
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          />
          <Flex align='center' justify='center'>
            <Button radius='lg' className={classes.button} type='submit'>
              {t('complete')}
            </Button>
          </Flex>
        </form>
      </Paper>
    </Container>
  )
}
