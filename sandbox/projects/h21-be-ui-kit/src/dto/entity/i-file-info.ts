import {ICodeNamedEntity} from './i-code-named-entity';

export interface IFileInfo extends ICodeNamedEntity {
	fileName?: string;
	fileHash?: string;
	fileSize?: number;
	fileUrl?: string;
	fileStorageId?: number;
}
