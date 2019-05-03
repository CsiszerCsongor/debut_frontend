/*export interface CurrencyModel {
  id: number;
  name: string;
}*/
export class CurrencyModel {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
