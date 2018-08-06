import {IValidationRule} from "./i-validation-rule";

export class Validator {
	private rules: IValidationRule[] = [];

	register(rule: string, predicate: () => boolean, message): void {
		this.rules.push({
			rule: rule,
			predicate: predicate,
			message: message
		});
	}

	invalid(rule: string): string {

		let result = this.rules.find(e => e.rule === rule
			&& !e.predicate());

		if (!result) {
			return '';
		}

		return result.message;
	}

	getAllErrors(): string[] {
		return this.rules.filter(e => !e.predicate()).map(e => e.message);
	}
}
