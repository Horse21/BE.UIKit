import { NgModule } from '@angular/core';
import {
	H21SidebarModule,
} from './lib';

const modules: any[] = [
	H21SidebarModule
];

@NgModule({
	imports: modules,
	exports: modules
})
export class H21BeUiKitModule {
}
