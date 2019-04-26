import {UserModel} from './User.model';
import {CurrencyModel} from './Currency.model';

export interface ContModel{
  user: UserModel;
  sum: number;
  currency: CurrencyModel;
  maxValue: number;
}
