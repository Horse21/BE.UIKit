import { Component } from "@angular/core"
import { MatDialog } from '@angular/material';
import { IconExampleDialogComponent } from "./icon-example-dialog.component";

@Component({
  selector: 'icons-docs',
  templateUrl: './icons-docs.component.html'
})

export class IconsDocsComponent {
	/** Список имспользуемых кастомных svg иконок */
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

	/** Список имспользуемых material иконок */
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

  /** Section title */
  title = 'Icons';

  /** List of icons for the section "Custom icons" */
  matIcons = this.allMatIcons;

  /** List of icons for the section "Used material icons" */
  h21Icons = this.allH21Icons;

  constructor(public dialog: MatDialog) { }

  /**
   * Opens the presentation of the selected icon
   * @param {String} iconName Icon name
   * @param {boolean} isCustomIcon Indicates that this is a custom icon (true) or a set of material (false)
   */
  openDialog(iconName: String, isCustomIcon: boolean): void {
  	this.dialog.open(IconExampleDialogComponent, {
  		width: '800px',
		data: {iconName: iconName, isCustomIcon: isCustomIcon}
  	});
  }
}
