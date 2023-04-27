import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import { logger } from '../middlewares/index.js'
dotenv.config()

interface SendEmailProps {
  to: string
  subject: string
  html: string
}

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  try {
    const message = {
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    }

    sgMail.setApiKey(process.env.SENDGRID_MAIL_API_KEY!)
    const response = await sgMail.send(message)

    logger.info(`Email service status - ${response[0].statusCode}`)
  } catch (error: any) {
    logger.error(error.message)
    throw new Error(error.message)
  }
}
