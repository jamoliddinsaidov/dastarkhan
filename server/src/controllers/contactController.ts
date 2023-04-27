import { Request, Response } from 'express'
import { asyncWrapper } from '../middlewares/asyncWrapper.js'
import { StatusCodes } from 'http-status-codes'
import { sendEmail } from '../utils/sendEmail.js'

export const contactUs = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body

  const html = `<h1>${subject}</h1><p>Email from ${name} (${email})</p><h3>Message:</h3><p>${message}</p>`

  const emailOptions = {
    to: process.env.EMAIL_TO!,
    subject,
    html,
  }

  await sendEmail(emailOptions)

  res.status(StatusCodes.OK).json({ success: true })
})
