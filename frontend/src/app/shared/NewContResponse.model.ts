export class NewContResponseModel {
  id: number;
  name: string;
  sum: number;
  currencyId: number;
  currency: string;
  maxValue: number;

  constructor(id: number, name: string, sum: number, currencyId: number,
              currency: string, maxValue: number) {
    this.id = id;
    this.name = name;
    this.sum = sum;
    this.currencyId = currencyId;
    this.currency = currency;
    this.maxValue = maxValue;
  }
}
