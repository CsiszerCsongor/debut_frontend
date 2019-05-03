import {Component, OnInit, } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../../globals';
import {UserForAdminModel} from '../../shared/UserForAdmin.model';
import {CurrencyModel} from '../../shared/Currency.model';
import {ContModel} from '../../shared/Cont.model';
import {NewContModel} from '../../shared/NewCont.model';
import {NewContResponseModel} from '../../shared/NewContResponse.model';
import {UpdateDataModel} from '../../shared/UpdateData.model';
import {DeleteContModel} from '../../shared/DeleteCont.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  private searchText: string;
  private validSearchText: boolean;
  private userData: UserForAdminModel;
  private userDataBackup: UserForAdminModel;
  private userFound = false;
  private contsExist = false;
  private newCont = false;
  selectedCurrency: number;
  private currencies: CurrencyModel[];
  private currencyExist = false;

  private disableFirstNameInput = true;
  private disableLastNameInput = true;
  private disableCnpInput = true;
  private disableSerieInput = true;
  private disableCnpNrInput = true;
  private disableStreetInput = true;
  private disableHouseInput = true;
  private disableApartmanInput = true;
  private disableTelephoneInput = true;
  private disableEmailInput = true;
  private disableUsernameInput = true;


  private updateFirstNameBtn = false;
  private updateLastNameBtn = false;
  private updateCnpBtn = false;
  private updateSerieBtn = false;
  private updateCnpNrBtn = false;
  private updateStreetBtn = false;
  private updateHouseBtn = false;
  private updateApartmanBtn = false;
  private updateTelephoneBtn = false;
  private updateEmailBtn = false;
  private updateUsernameBtn = false;

  private updateFirstNameError = false;
    private updateFirstNameServerError = false;
    private updateFirstNameInvalidError = false;
  private updateLastNameError = false;
  private updateCnpError = false;
  private updateSerieError = false;
  private updateCnpNrError = false;
  private updateStreetError = false;
  private updateHouseError = false;
  private updateApartmanError = false;
  private updateTelephoneError = false;
  private updateEmailError = false;
  private updateUsernameError = false;

  private getUserByCNPUrl = this.globals._url + 'user/getUserByCNP';
  private getCurrenciesUrl = this.globals._url + 'currency/getAll';
  private createNewContUrl = this.globals._url + 'cont/createNewCont';
  private updateUserDataUrl = this.globals._url + 'user/update/';
  private deleteContUrl = this.globals._url + 'cont/deleteCont';

  private requestOptions: Object = {
    responseType: 'text'
  };

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private http: HttpClient,
              private globals: Globals) {
  }

  ngOnInit() {

  }

  _keyupEvent() {
    const pattern = /[^0-9]+/;
    let n = this.searchText.search(pattern);

    if ( n !== -1) {
      console.log('BAD');
      this.validSearchText = false;
    }
    else {
      this.validSearchText = true;
      console.log('GOOD');
    }
  }

  getUserByCNP() {
    const pattern = /[^0-9]+/;
    let n = this.searchText.search(pattern);

    if ( n === -1) {
      this.http.post<UserForAdminModel>(this.getUserByCNPUrl, this.searchText).subscribe(
        result => {
          if (result == null) {
            console.log('User not found!');
          }
          else {
            console.log(result);
            this.userData = result;
            this.userFound = true;
            this.makeBackup();
            if (this.userData.conts.length === 0) {
              this.contsExist = false;
              console.log('Nem leteznek contok!');
            }
            else {
              console.log('Leteznek contok!');
              console.log('contok : ' + JSON.stringify(this.userData.conts));
              console.log('cont : ' + JSON.stringify(typeof this.userData.conts[0]));
              this.contsExist = true;
            }
          }
        },
        error1 => {
          console.log('Something went wrong!');
        });
    }
  }

  makeBackup() {
    this.userDataBackup = new UserForAdminModel(this.userData.firstName, this.userData.lastName, this.userData.street,
      this.userData.telephone, this.userData.email, this.userData.cnp, this.userData.serie, this.userData.cnpNr,
      this.userData.houseNumber, this.userData.apartman, this.userData.username, this.userData.conts
      );
  }

  updateFirstName() {
    this.updateFirstNameBtn = true;
    this.disableFirstNameInput = false;
  }
  closeFirstNameUpdate() {
    this.updateFirstNameBtn = false;
    this.disableFirstNameInput = true;
    this.userData.firstName = this.userDataBackup.firstName;
  }
  saveFirstName() {
    /*const updateModel = new UpdateDataModel(this.userData.cnp, this.userData.firstName, 0);
    let response;
    this.saveString('firstname', this.userData.firstName, updateModel).then(result => response = result);

    console.log('Response :' + response);

    if (response === "Success") {
      this.userDataBackup.firstName = this.userData.firstName;
      this.updateFirstNameBtn = false;
      this.updateFirstNameError = false;
      this.updateFirstNameServerError = false;
      this.disableFirstNameInput = true;
      this.updateFirstNameInvalidError = false;
    }
    else {
      if (response === "Invalid") {               // invalid string error
        this.updateFirstNameError = true;
        this.updateFirstNameInvalidError = true;
      }
      else {                                      // server error
        this.updateFirstNameError = true;
        this.updateFirstNameBtn = false;
        this.updateFirstNameServerError = true;
      }
    }*/

   const pattern = /[0-9]+/;
    const n = this.userData.firstName.search(pattern);
    console.log('n : ' + n);
    if (n === -1) {
      const pattern2 = /[A-Z][a-z]+/;
      const index = this.userData.firstName.search(pattern2);

      if(index === 0) {
        this.http.post<string>(this.updateUserDataUrl + 'firstname',
                                new UpdateDataModel(this.userData.cnp, this.userData.firstName, 0), this.requestOptions)
          .subscribe(result => {
            console.log(JSON.stringify(result));
            if (result === "Success") {
              this.userDataBackup.firstName = this.userData.firstName;
              this.updateFirstNameBtn = false;
              this.updateFirstNameError = false;
              this.updateFirstNameServerError = false;
              this.disableFirstNameInput = true;
              this.updateFirstNameInvalidError = false;
            }
            else {
              this.updateFirstNameError = true;
              this.updateFirstNameBtn = false;
              this.updateFirstNameServerError = true;
            }
          });
      }
    }
    else{
      this.updateFirstNameError = true;
      this.updateFirstNameInvalidError = true;
    }
  }

  ///////////// /// ///
  /*saveString(url: string, strToCheck: string, updateModel: UpdateDataModel): Promise<string> {
    const pattern = /[0-9]+/;
    const n = strToCheck.search(pattern);
    if(n === -1) {
      const pattern2 = /[A-Z][a-z]+/;
      const index = strToCheck.search(pattern2);
      if (index === 0) {
        this.http.post<string>(this.updateUserDataUrl + url, updateModel, this.requestOptions).subscribe(result => {
          console.log('Result : ' + result);
            return result;
          });
      }
    } else {
      return "Invalid";
    }
  }*/

  ///////////// /// ///

  updateLastName() {
    this.updateLastNameBtn = true;
    this.disableLastNameInput = false;
  }
  closeUpdateLastName() {
    this.updateLastNameBtn = false;
    this.disableLastNameInput = true;
    this.userData.lastName = this.userDataBackup.lastName;
  }
  saveLastName() {
    const pattern = /[0-9]+/;
    const n = this.userData.firstName.search(pattern);
    console.log('n : ' + n);
    if(n === -1) {
      const pattern2 = /[A-Z][a-z]+/;
      const index = this.userData.firstName.search(pattern2);

      if(index === 0) {
        this.http.post<string>(this.updateUserDataUrl + 'firstname',
          new UpdateDataModel(this.userData.cnp, this.userData.firstName, 0), this.requestOptions)
          .subscribe(result => {
            console.log(JSON.stringify(result));
            if (result === "Success") {
              this.userDataBackup.firstName = this.userData.firstName;
              this.updateFirstNameBtn = false;
              this.updateFirstNameError = false;
              this.updateFirstNameServerError = false;
              this.disableFirstNameInput = true;
              this.updateFirstNameInvalidError = false;
            }
            else {
              this.updateFirstNameError = true;
              this.updateFirstNameBtn = false;
              this.updateFirstNameServerError = true;
            }
          });
      }
    }
    else{
      this.updateFirstNameError = true;
      this.updateFirstNameInvalidError = true;
    }
  }

  updateCnp() {
    this.updateCnpBtn = true;
    this.disableCnpInput = false;
  }
  closeUpdateCnp() {
    this.updateCnpBtn = false;
    this.disableCnpInput = true;
    this.userData.cnp = this.userDataBackup.cnp;
  }
  saveCnp() {

  }

  updateSerie() {
    this.updateSerieBtn = true;
    this.disableSerieInput = false;
  }
  closeUpdateSerie() {
    this.updateSerieBtn = false;
    this.disableSerieInput = true;
    this.userData.serie = this.userDataBackup.serie;
  }
  saveSerie() {

  }

  updateCnpNr() {
    this.updateCnpNrBtn = true;
    this.disableCnpNrInput = false;
  }
  closeUpdateCnpNr() {
    this.updateCnpNrBtn = false;
    this.disableCnpNrInput = true;
    this.userData.cnpNr = this.userDataBackup.cnpNr;
  }
  saveCnpNr() {

  }

  updateStreet() {
    this.updateStreetBtn = true;
    this.disableStreetInput = false;
  }
  closeUpdateStreet() {
    this.updateStreetBtn = false;
    this.disableStreetInput = true;
    this.userData.street = this.userDataBackup.street;
  }
  saveStreet() {

  }

  updateHouse() {
    this.updateHouseBtn = true;
    this.disableHouseInput = false;
  }
  closeUpdateHouse() {
    this.updateHouseBtn = false;
    this.disableHouseInput = true;
    this.userData.houseNumber = this.userDataBackup.houseNumber;
  }
  saveHouse() {

  }

  updateApartman() {
    this.updateApartmanBtn = true;
    this.disableApartmanInput = false;
  }
  closeUpdateApartman() {
    this.updateApartmanBtn = false;
    this.disableApartmanInput = true;
    this.userData.apartman = this.userDataBackup.apartman;
  }
  saveApartman() {

  }

  updateTelephone() {
    this.updateTelephoneBtn = true;
    this.disableTelephoneInput = false;
  }
  closeUpdateTelephone() {
    this.updateTelephoneBtn = false;
    this.disableTelephoneInput = true;
    this.userData.telephone = this.userDataBackup.telephone;
  }
  saveTelephone() {

  }

  updateEmail() {
    this.updateEmailBtn = true;
    this.disableEmailInput = false;
  }
  closeUpdateEmail() {
    this.updateEmailBtn = false;
    this.disableEmailInput = true;
    this.userData.email = this.userDataBackup.email;
  }
  saveEmail() {

  }

  updateUsername() {
    this.updateUsernameBtn = true;
    this.disableUsernameInput = false;
  }
  closeUpdateUsername() {
    this.updateUsernameBtn = false;
    this.disableUsernameInput = true;
    this.userData.username = this.userDataBackup.username;
  }
  saveUsername() {

  }

  addNewCont() {
    this.newCont = true;
    if (this.currencies === undefined) {
      this.getCurrencies();
    }
  }

  closeCreateNewCont() {
    this.newCont = false;
  }

  createNewCont() {
    this.currencyExist = false;
    for (let cont of this.userData.conts) {
      if (cont.currency.id === this.selectedCurrency) {
        this.currencyExist = true;
      }
    }

    if (!this.currencyExist) {
      console.log('Currency : ' + this.selectedCurrency);
      let newCont = new NewContModel(this.userData.username, this.selectedCurrency);
      this.http.post<ContModel>(this.createNewContUrl, newCont).subscribe(
        result => {
          const response = JSON.parse(JSON.stringify(result));
          const contResponse = response.user;
          const newContResponse: NewContResponseModel = new NewContResponseModel(contResponse.id, contResponse.name, contResponse.sum,
                                contResponse.currencyId, contResponse.currency, contResponse.maxValue);
          console.log('newContResponseModel:' + newContResponse);
          console.log('id : ' + newContResponse.id);
          console.log('name : ' + newContResponse.name);
          console.log('sum : ' + newContResponse.sum);
          console.log('currencyId : ' + newContResponse.currencyId);
          console.log('currency : ' + newContResponse.currency);
          console.log('maxValue : ' + newContResponse.maxValue);

          const tmpCurrency: CurrencyModel = new CurrencyModel(newContResponse.currencyId, newContResponse.currency);
          console.log('sum2222 : ' + (typeof tmpCurrency));
          const tmpCont: ContModel = {name: contResponse.name, user: null, sum: contResponse.sum, currency: tmpCurrency,
                                      maxValue: contResponse.maxValue};
          this.userData.conts.push(tmpCont);
        },
        error => {
          const errorMessage = JSON.parse(JSON.stringify(error));
          if(errorMessage.status === 500) {
            console.log('Can\'t create cont with this currency! Exist one with this!');
          }

        }
      );
    }
  }

  deleteCont(name: string) {
    const deletedContData = new DeleteContModel(this.userData.username, name);
    this.http.post<string>(this.deleteContUrl, deletedContData, this.requestOptions).subscribe(result => {
      if (result === "Success") {
        let ind = 0;
        this.userData.conts.forEach((item, index) => {
          if (item.name === name) {
            ind = index;
          }
        });
        this.userData.conts.splice(ind, 1);
      }
    });
  }

  getCurrencies() {
    this.http.get<CurrencyModel[]>(this.getCurrenciesUrl).subscribe(
      result => {
        this.currencies = result;
      });
  }


}
