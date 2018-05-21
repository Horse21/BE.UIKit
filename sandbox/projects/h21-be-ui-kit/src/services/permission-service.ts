export abstract class PermissionService {
	abstract isInRole(role: string): boolean;

	abstract isAgent(id: number): boolean;

	abstract isAgencyManager(id: number): boolean;

	abstract isBranchManager(id: number): boolean;
}
