import {ContModel} from './Cont.model';

export class UserForAdminModel {
  firstName: string;
  lastName: string;
  street: string;
  telephone: string;
  email: string;
  cnp: string;
  serie: string;
  cnpNr: number;      // serie + numar
  houseNumber: number;        // can be null, because somebody or lives in the village or in the city
  apartman: number;           // can be null, because somebody or lives in the village or in the city
  username: string;
  conts: ContModel[];

  constructor(firstName: string, lastName: string, street: string, telephone: string,
              email: string, cnp: string, serie: string, cnpNr: number, houseNumber: number,
              apartman: number, username: string, conts: ContModel[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.telephone = telephone;
    this.email = email;
    this.cnp = cnp;
    this.serie = serie;
    this.cnpNr = cnpNr;
    this.houseNumber = houseNumber;
    this.apartman = apartman;
    this.username = username;
    this.conts = conts;
  }
}
