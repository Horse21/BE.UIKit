import { Injectable } from '@angular/core';
import { PermissionService } from '../../../sandbox/projects/h21-be-ui-kit/src/services/permission-service';

@Injectable()
export class PrototypePermissionService implements PermissionService {
  isInRole(role: string): boolean {
    console.log('is n role');
    return true;
  }

  isAgent(id: number): boolean {
    return true;
  }

  isAgencyManager(id: number): boolean {
    return true;
  }

  isBranchManager(id: number): boolean {
    return true;
  }
}
