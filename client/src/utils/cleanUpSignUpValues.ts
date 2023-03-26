export const cleanUpSignUpValues = (form: any) => {
  form.setFieldValue('email', '')
  form.setFieldValue('dateOfBirth', new Date())
  form.setFieldValue('gender', 'male')
  form.setFieldValue('name', '')
  form.setFieldValue('password', '')
  form.setFieldValue('terms', true)
}
