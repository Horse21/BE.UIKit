import {IEntity} from './i-entity';

export interface INamedEntity extends IEntity {
	name?: string;
	description?: string;
}
