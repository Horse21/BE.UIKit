import {Injectable} from '@angular/core';
import {ICoreEnvironment} from '../dto/i-core-environment';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	environment: ICoreEnvironment;

	//noinspection JSUnusedGlobalSymbols
	setEnvironment(env: ICoreEnvironment) {
		this.environment = env;
	}
}
