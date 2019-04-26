import {CountryModel} from './Country.model';

export class CityModel{
  id: number;
  name: string;
  country: CountryModel;
}
