export interface IValidationRule {
	rule: string;
	predicate(): boolean;
	message: string;
}
