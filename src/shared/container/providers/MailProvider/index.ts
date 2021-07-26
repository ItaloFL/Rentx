import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { MailProvider } from "./implementations/MailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";


const mailProvider = {
  etherial: container.resolve(MailProvider),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(  
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
)