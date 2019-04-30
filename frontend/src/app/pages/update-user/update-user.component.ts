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


  private getUserByCNPUrl = this.globals._url + 'user/getUserByCNP';
  private getCurrenciesUrl = this.globals._url + 'currency/getAll';
  private createNewContUrl = this.globals._url + 'cont/createNewCont';

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
              console.log('Nem letezinek contok!');
            }
            else {
              console.log('Leteznek contok!');
              console.log('contok : ' + this.userData.conts);
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

  updateLastName() {
    this.updateLastNameBtn = true;
    this.disableLastNameInput = false;
  }
  closeUpdateLastName() {
    this.updateLastNameBtn = false;
    this.disableLastNameInput = true;
    this.userData.lastName = this.userDataBackup.lastName;
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

  updateSerie() {
    this.updateSerieBtn = true;
    this.disableSerieInput = false;
  }
  closeUpdateSerie() {
    this.updateSerieBtn = false;
    this.disableSerieInput = true;
    this.userData.serie = this.userDataBackup.serie;
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

  updateStreet() {
    this.updateStreetBtn = true;
    this.disableStreetInput = false;
  }
  closeUpdateStreet() {
    this.updateStreetBtn = false;
    this.disableStreetInput = true;
    this.userData.street = this.userDataBackup.street;
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

  updateApartman() {
    this.updateApartmanBtn = true;
    this.disableApartmanInput = false;
  }
  closeUpdateApartman() {
    this.updateApartmanBtn = false;
    this.disableApartmanInput = true;
    this.userData.apartman = this.userDataBackup.apartman;
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

  updateEmail() {
    this.updateEmailBtn = true;
    this.disableEmailInput = false;
  }
  closeUpdateEmail() {
    this.updateEmailBtn = false;
    this.disableEmailInput = true;
    this.userData.email = this.userDataBackup.email;
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

          const tmpCurrency: CurrencyModel = {id: contResponse.currencyId, name: contResponse.currency};
          const tmpCont: ContModel = {name: contResponse.name, user: null, sum: contResponse.sum, currency: tmpCurrency,
                                      maxValue: contResponse.maxValue};
          this.userData.conts.push(tmpCont);
        },
        error => {
          const errorMessage = JSON.parse(JSON.stringify(error));
          if(errorMessage.status === 500){
            console.log('Can\'t create cont with this currency! Exist one with this!');
          }

        }
      );
    }
  }

  getCurrencies() {
    this.http.get<CurrencyModel[]>(this.getCurrenciesUrl).subscribe(
      result => {
        this.currencies = result;
      });
  }


}
