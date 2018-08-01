import {ICodeNamedEntity} from './i-code-named-entity';

export interface IState extends ICodeNamedEntity {
	groupCode? : string;
	stateMachineId?: number;
}
