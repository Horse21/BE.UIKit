import {Component, Input} from '@angular/core';

@Component({
	selector: 'h21-passangers-select',
	template: `
		<div class="c-h21-passangers-select">
			<button mat-button color="primary" class="c-h21-passangers-select_open-menu-btn" [matMenuTriggerFor]="passangersSelectMenu">
				<mat-icon matPrefix>supervisor_account</mat-icon>
				<span>Adult 1</span>
			</button>
		</div>
		<mat-menu #passangersSelectMenu="matMenu" class="c-h21-passangers-select_menu">
			<ng-template matMenuContent>
				<div (click)="$event.stopPropagation();">
					<span class="c-h21-passangers-select_menu-title">Passangers</span>
					<div class="c-h21-passangers-select_counter">
						<span>Adult(s)</span>
						<div>
							<button mat-icon-button color="primary" [disabled]="true">
								<mat-icon>remove</mat-icon>
							</button>
							<input type="text" name="" value="1" />
							<button mat-icon-button color="primary">
								<mat-icon>add</mat-icon>
							</button>
						</div>
						<button mat-button color="primary">
							<mat-icon>person</mat-icon> 
							<span>&times; 1</span>
						</button>
					</div>
					<div class="c-h21-passangers-select_counter">
						<span>Children</span>
						<div>
							<button mat-icon-button color="primary">
								<mat-icon>remove</mat-icon>
							</button>
							<input type="text" name="" value="2" />
							<button mat-icon-button color="primary">
								<mat-icon>add</mat-icon>
							</button>
						</div>
					</div>
					<div class="c-h21-passangers-select_counter">
						<span>Infant</span>
						<div>
							<button mat-icon-button color="primary" [disabled]="true">
								<mat-icon>remove</mat-icon>
							</button>
							<input type="text" name="" value="0" />
							<button mat-icon-button color="primary">
								<mat-icon>add</mat-icon>
							</button>
						</div>
					</div>
				</div>
			</ng-template>
		</mat-menu>
	`
})

export class H21PassangersSelectComponent {
	@Input() test = 1;
}
