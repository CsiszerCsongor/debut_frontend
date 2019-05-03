export class DeleteContModel {
  name: string;   // cont name
  username: string;

  constructor(username: string, name: string) {
    this.username = username;
    this.name =  name;
  }
}
