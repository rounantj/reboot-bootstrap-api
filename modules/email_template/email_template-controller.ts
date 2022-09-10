import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { onError, onSuccess } from 'reboot-solutions-cms'
import Email_TemplateService from './email_template-service'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
 
import { IObjToPdf } from './email_template-interfaces'
import ENVS from '../../reboot.config.json'
import fs from 'fs'
import sendMail from './nodemailer'
import { isObject } from 'util';

export default class Email_TemplateController {
  private readonly service: Email_TemplateService
 
  constructor(public prismaClient: PrismaClient) {
    this.service = new Email_TemplateService(prismaClient)
    
  }

  public async index(request: Request, response: Response) {
    try {
      const email_Templates = await this.service.fetchAll()

      return onSuccess(response, 200, email_Templates)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const email_TemplateId = parseInt(request.params.id)
      const email_template = await this.service.fetchById(email_TemplateId)

      return onSuccess(response, 200, email_template)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const email_template = await this.service.store(request.body)

      return onSuccess(response, 200, email_template)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const email_TemplateId = parseInt(request.params.id)
      const email_template = await this.service.update(email_TemplateId, request.body)

      return onSuccess(response, 200, email_template)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async destroy(request: Request, response: Response) {
    try {
      const email_TemplateId = parseInt(request.params.id)
      const email_template = await this.service.destroy(email_TemplateId)

      return onSuccess(response, 200, email_template)
    } catch (error: any) {
      return onError(response, error)
    }
  }

  public async makePdfFromJson(jsonObj: IObjToPdf, pdfName: string) {

    var doc = new jsPDF();

    var colunas: string[] = jsonObj.columns
    autoTable(doc, {
      head: [colunas],
      body: jsonObj.values,
    })

    doc.save(`modules/email_template/document/${pdfName}.pdf`);
  }

  public async document(request: Request, response: Response) {
    let ID = request.params.id
    let path = require('path')
    if (ID) {
      console.log(path.join(__dirname, 'document', ID.toString(), '.pdf'))
      let arquivo = `/document/${ID.toString()}.pdf`;


      response.sendFile(__dirname + arquivo);
    }
  }

  public async mailSender(request: Request, response: Response) {
    try {
      let { emailTo, subject, html, withAttachments, fileNamePdf } = request.body
      if(isObject(html)){
        let newHtml  = await fs.readFileSync(`${__dirname}/templates/default.html`).toString()
        newHtml  = newHtml.replace(/{{MY_TITLE}}/g,html.title)
                      .replace(/{{MY_INNER_CONTENT}}/g,html.inner_content)
                      .replace(/{{MY_TOP_CONTENT}}/g,html.top_content)
                      .replace(/{{MY_FOOTER_CONTENT}}/g,html.footer_content)
                      .replace(/{{MY_CREDITS}}/g,html.credits)
                      .replace(/{{MY_SITE_URL}}/g,html.site_url)
        const result = await sendMail(emailTo, subject, newHtml, withAttachments, fileNamePdf)
        return onSuccess(response, 200, {status:result})
      }else{
        const result = await sendMail(emailTo, subject, html, withAttachments, fileNamePdf)
        return onSuccess(response, 200, {status:result})
      } 
      
    } catch (error: any) {
      return onError(response, error)
    }


  }



 

  private _verifyParamsRelations(query: string | undefined) {
    const relations = query?.split(",");
    return {
      consultant:
        !relations || !relations.includes("consultant") ? false : true,
      producer: !relations || !relations.includes("producer") ? false : true,
      culture: !relations || !relations.includes("culture") ? false : true,
      product: !relations || !relations.includes("product") ? false : true,
      investment:
        !relations || !relations.includes("investment") ? false : true,
    };
  }
}
