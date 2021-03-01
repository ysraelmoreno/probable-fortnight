import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from 'tsyringe'

import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
export default  class FakeMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
      });

      this.client = transporter;
    })
  }

  public async sendMail({ to, subject, from, template }: ISendMailDTO): Promise<void> {
    const message = this.client.sendMail({
      from: {
        name: from?.name || 'Equipe One',
        address: from?.email || 'team@onelearning.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject: subject,
      html: await this.mailTemplateProvider.parse(template),
    }, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }
}
