export class ProfissionalSave {

  fullName: string;
  crm: string;
  conveniosIds: string[];


  constructor(fullName: string, crm: string, conveniosIds: string[]) {
    this.fullName = fullName;
    this.crm = crm;
    this.conveniosIds = conveniosIds;
  }
}
