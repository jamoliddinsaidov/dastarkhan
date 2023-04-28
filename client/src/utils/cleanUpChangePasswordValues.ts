export const cleanUpChangePasswordValues = (form: any) => {
  form.setFieldValue('oldPassword', '')
  form.setFieldValue('newPassword', '')
  form.setFieldValue('confirmPassword', '')
}
