import {UserModel} from './User.model';
import {CurrencyModel} from './Currency.model';

export interface ContModel {
  name: string;
  user: UserModel;
  sum: number;
  currency: CurrencyModel;
  maxValue: number;
}
