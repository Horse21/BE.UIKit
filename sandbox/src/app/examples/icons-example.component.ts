import { Component } from "@angular/core"
import { MatDialog } from '@angular/material';
import { IconExampleDialogComponent } from "./icon-example-dialog.component";

@Component({
  selector: 'icons-example',
  template: `
    <div class="container" style="background: #f00;">
      
    </div>
    <section class="docs mat-typography">
      <h1>{{title}}</h1>
      <h2>Custom icons</h2>
      <mat-grid-list cols="5" class="docs_icons-preview-grid">
        <mat-grid-tile *ngFor="let icon of h21Icons">
          <div class="icon-preview icon-preview__icon-size-48">
            <button mat-icon-button (click)="openDialog(icon, true);">
              <mat-icon svgIcon="{{icon}}"></mat-icon>
            </button><br />
            <span class="">{{icon.replace('_',' ')}}</span>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
      <div class="line-separator"></div>
      <h2>Used material icons</h2>
      <mat-grid-list cols="5" class="docs_icons-preview-grid">
        <mat-grid-tile *ngFor="let icon of matIcons">
          <div class="icon-preview">
            <button mat-icon-button (click)="openDialog(icon, false);">
              <mat-icon class="">{{icon}}</mat-icon>
            </button><br />
            <span>{{icon.replace('_',' ')}}</span>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </section>`
})

export class IconsExampleComponent {
  title = 'Icons';


  h21Icons = [
    'h21_flight_land_blue',
    'h21_flight_land_green',
    'h21_flight_land_red',
    'h21_flight_takeoff_blue',
    'h21_flight_takeoff_green',
    'h21_flight_takeoff_red'
  ];

  matIcons = [
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

  constructor(public dialog: MatDialog) {}

  openDialog(iconName: String, isCustomIcon: boolean): void {
    this.dialog.open(IconExampleDialogComponent, {
      width: '600px',
      data: { iconName: iconName, isCustomIcon: isCustomIcon }
    });
  }
}
