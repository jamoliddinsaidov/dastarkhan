export const cleanUpReviewInputValues = (form: any) => {
  form.setFieldValue('foodName', '')
  form.setFieldValue('foodPlaceName', '')
  form.setFieldValue('review', '')
  form.setFieldValue('city', '')
  form.setFieldValue('rating', 0)
  form.setFieldValue('price', 0)
  form.setFieldValue('foodType', '')
  form.setFieldValue('serviceType', '')
  form.setFieldValue('name', '')
}
