export interface ICoreEnvironment {
	target?: string;
	clientRootUrl?: string;
	apiRootUrl?: string;
	identityUrl?: string;
	referencesUrl?: string;
	fileStorageUrl?: string;
	fileStorageClientUrl?: string;
	reportUrl?: string;
	authClientId?: string;
	authScope?: string;
	httpTimeout?: number;
	profileApi?: string;
}
