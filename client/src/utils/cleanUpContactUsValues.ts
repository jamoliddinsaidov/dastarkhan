export const cleanUpContactUsValues = (form: any) => {
  form.setFieldValue('name', '')
  form.setFieldValue('email', '')
  form.setFieldValue('subject', '')
  form.setFieldValue('message', '')
}
