'use strict'
import { fstat } from 'fs'
import fs from 'fs'
import nodemailer from 'nodemailer'
import { Config } from '../../helpers/config'

const env = Config.instance

const transport = nodemailer.createTransport({
  host: env.config.smtpHost,
  port: env.config.smtpPort,
  secure: env.config.smtpSecure,
  auth: {
    user: env.config.smtpUser,
    pass: env.config.smtpPass,
  },
  tls: {
    ciphers: 'SSLv3',
  },
})

export default async function sendEmail(
  emailTo: string,
  subject: string,
  html: string,
  withAttachments: boolean = false,
  fileNamePdf: string = ""
) {
  try {
    
    if(withAttachments && fs.existsSync(`${__dirname}/document/${fileNamePdf}`)){ 

      const info = await transport.sendMail({
        from: env.config.mailFrom,
        to: emailTo,
        subject,
        html,
          attachments: [
            {
              filename: `${__dirname}/document/9.pdf`,
              path: `${__dirname}/document/${fileNamePdf}`,
              contentType: 'application/pdf',
              encoding: 'base64',
            },
          ],
      })
      console.log(info)
      return {msg: `Mensagem enviada para: ${emailTo}`, attachement: withAttachments, pathStatus:fs.existsSync(`${__dirname}/document/${fileNamePdf}`) }
    }else{

      const info = await transport.sendMail({
        from: env.config.mailFrom,
        to: emailTo,
        subject,
        html
      })
      console.log(info) 
      return {msg: `Mensagem enviada para: ${emailTo}`, attachement: withAttachments, pathStatus:fs.existsSync(`${__dirname}/document/${fileNamePdf}`) }
    }
    
    
  
  } catch (error) {
    console.error(error)
    return `Não foi possível enviar a mensagem`
  }
}
