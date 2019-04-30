export class NewContModel {
  username: string;
  currencyId: number;

  constructor(username: string, currencyId: number) {
    this.username = username;
    this.currencyId = currencyId;
  }
}
