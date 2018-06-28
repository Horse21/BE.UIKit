import { Component } from "@angular/core"
import { MatDialog } from '@angular/material';
import { IconExampleDialogComponent } from "./icon-example-dialog.component";

@Component({
  selector: 'icons-example',
  template: `
	<section class="mat-typography">
		<h1>{{title}}</h1>
		<h2>Custom icons</h2>
		<div class="row m-b-5">
			<div class="col-md-3 col-lg-2" *ngFor="let icon of h21Icons">
				<figure class="docs_icon-preview">
					<div>
						<button mat-icon-button class="__size-l" (click)="openDialog(icon, true);">
							<mat-icon class="__size-xl" svgIcon="{{icon}}"></mat-icon>
						</button>
					</div>
					<figcaption>{{icon}}</figcaption>
				</figure>
			</div>
		</div>
		<h2>Used material icons</h2>
		<div class="row">
			<div class="col-md-3 col-lg-2" *ngFor="let icon of matIcons">
				<figure class="docs_icon-preview">
					<div>
						<button mat-icon-button class="__size-l" (click)="openDialog(icon, false);">
							<mat-icon class="__size-xl">{{icon}}</mat-icon>
						</button>
					</div>
					<figcaption>{{icon}}</figcaption>
				</figure>
			</div>
		</div>
	</section>`
})

export class IconsExampleComponent {
  title = 'Icons';

  allH21Icons = [
    'h21_flight_land_blue',
    'h21_flight_land_green',
    'h21_flight_land_red',
    'h21_flight_takeoff_blue',
    'h21_flight_takeoff_green',
    'h21_flight_takeoff_red',
	'h21_baggage',
	'h21_no_baggage',
	'h21_luggage',
	'h21_no_luggage',
	'h21_night',
  ];

  allMatIcons = [
    'attach_money',
    'cancel',
    'check_circle',
    'close',
    'flight_land',
    'flight_takeoff',
    'history',
    'info',
    'menu',
    'person',
    'search',
    'supervisor_account',
    'swap_horiz',
    'today',
  ];

  matIcons = this.allMatIcons;
  h21Icons = this.allH21Icons;

  constructor(public dialog: MatDialog) {

  }

  openDialog(iconName: String, isCustomIcon: boolean): void {
    this.dialog.open(IconExampleDialogComponent, {
      width: '600px',
      data: { iconName: iconName, isCustomIcon: isCustomIcon }
    });
  }
}
