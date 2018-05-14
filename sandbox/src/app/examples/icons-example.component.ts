import { Component } from "@angular/core"
import { MatDialog } from '@angular/material';
import { IconExampleDialogComponent } from "./icon-example-dialog.component";

@Component({
  selector: 'icons-example',
  template: `
<<<<<<< Updated upstream
    <div class="container" style="background: #f00;">
      
    </div>
    <h1>{{title}}</h1>
    <input #box (keyup.enter)="onEnter(box.value)"/>
    
    <section class="docs mat-typography">
      <div [hidden]="h21Icons.length == 0">
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
      </div>
      <div class="line-separator"></div>
      <div [hidden]="matIcons.length == 0">
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
      </div>
=======
    <section class="mat-typography">
      <h1>{{title}}</h1>
      <h2>Custom icons</h2>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" *ngFor="let icon of h21Icons">
          <figure class="docs_icon-preview">
            <p>
              <button mat-icon-button (click)="openDialog(icon, true);">
                <mat-icon svgIcon="{{icon}}"></mat-icon>
              </button>
            </p>
            <figcaption></figcaption>
          </figure>
          <span class="">{{icon.replace('_',' ')}}</span>
        </div>
      </div>
      
      <div class="line-separator"></div>
      
      <h2>Used material icons</h2>
      <mat-grid-list cols="5" class="docs_icons-preview-grid">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" *ngFor="let icon of h21Icons">
          <div class="icon-preview">
            <button mat-icon-button (click)="openDialog(icon, false);">
              <mat-icon class="">{{icon}}</mat-icon>
            </button><br />
            <span>{{icon.replace('_',' ')}}</span>
          </div>
        </div>
      </mat-grid-list>
>>>>>>> Stashed changes
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
    'h21_flight_takeoff_red'
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

  constructor(public dialog: MatDialog) {}

  onEnter(value: string) {
    this.matIcons = this.allMatIcons.filter(x=>x.indexOf(value.toLowerCase()) != -1);
    this.h21Icons = this.allH21Icons.filter(x=>x.indexOf(value.toLowerCase()) != -1);
  }

  openDialog(iconName: String, isCustomIcon: boolean): void {
    this.dialog.open(IconExampleDialogComponent, {
      width: '600px',
      data: { iconName: iconName, isCustomIcon: isCustomIcon }
    });
  }
}
