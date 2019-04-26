import {StreetModel} from './Street.model';

export class UserModel {
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
  password: string;
  role: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.street = '';
    this.telephone = '';
    this.email = '';
    this.cnp = '';
    this.cnpNr = undefined;
    this.houseNumber = undefined;
    this.apartman = undefined;
    this.password = '';
    this.role = '';
  }
}
