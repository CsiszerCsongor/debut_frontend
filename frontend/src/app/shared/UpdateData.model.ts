export class UpdateDataModel {
  userCnp: string;
  dataString: string;
  dataNumber: number;

  constructor(userCnp: string, dataString: string, dataNumber: number){
    this.userCnp = userCnp;
    this.dataString = dataString;
    this.dataNumber = dataNumber;
  }
}
