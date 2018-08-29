import {INamedEntity} from './i-named-entity';
import {IH21DateTime} from '../i-h21-date-time';

export interface IEntityHistory extends INamedEntity {
	createUserName?: string;
	createDate?: IH21DateTime;
}
