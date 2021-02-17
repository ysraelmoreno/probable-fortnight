import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
