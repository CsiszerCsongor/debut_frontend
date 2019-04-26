import {CurrencyModel} from '../shared/Currency.model';

export class SignUpInfo {
  firstName: string;
  lastName: string;
  //
  city: number;
  //
  street: string;
  telephone: string;
  email: string;
  cnp: string;
  serie: string;
  cnpNr: number;
  houseNumber: number;
  apartman: number;
  password: string;
  currency: number;
  role: string[];

  constructor(firstName: string, lastName: string, city: number, street: string, telephone: string,
              email: string, cnp: string, serie: string, cnpNr: number, houseNumber: number,
              apartman: number, password: string, currency: number, role: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.street = street;
    this.telephone = telephone;
    this.email = email;
    this.cnp = cnp;
    this.serie = serie;
    this.cnpNr = cnpNr;
    this.houseNumber = houseNumber;
    this.apartman = apartman;
    this.password = password;
    this.currency = currency;
    this.role = role;
  }
}
