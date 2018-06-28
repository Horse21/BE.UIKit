import { Component, Inject } from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'icon-example-dialog',
  template: `<div class="mat-typography">
    <mat-grid-list cols="3" rowHeight="20px;">
      <mat-grid-tile><span class="mat-body-2">Example</span></mat-grid-tile>
      <mat-grid-tile><span class="mat-body-2">Size</span></mat-grid-tile>
      <mat-grid-tile><span class="mat-body-2">Color</span></mat-grid-tile>
    </mat-grid-list>  
    <mat-grid-list cols="3">
      <mat-grid-tile>
        <h3></h3>
        <mat-icon color="{{colorVal}}" ngClass="{{sizeVal}}" *ngIf="isCustomIcon == true" svgIcon="{{iconName}}"></mat-icon>
        <mat-icon color="{{colorVal}}" ngClass="{{sizeVal}}" *ngIf="isCustomIcon == false">{{iconName}}</mat-icon>
      </mat-grid-tile>
      <mat-grid-tile>
        <mat-radio-group [(ngModel)]="sizeVal">
          <mat-radio-button color="primary" [value]="''" [checked]="true">default</mat-radio-button><br />
          <mat-radio-button color="primary" [value]="'__size-s'">small</mat-radio-button><br />
          <mat-radio-button color="primary" [value]="'__size-m'">medium</mat-radio-button><br />
          <mat-radio-button color="primary" [value]="'__size-l'">large</mat-radio-button><br />
          <mat-radio-button color="primary" [value]="'__size-xl'">x large</mat-radio-button><br />
        </mat-radio-group>
      </mat-grid-tile>
      <mat-grid-tile>
        <mat-radio-group [(ngModel)]="colorVal">
          <mat-radio-button color="primary" [value]="''" [checked]="true">default</mat-radio-button><br />
          <mat-radio-button color="primary" [value]="'primary'" >primary</mat-radio-button><br />
          <mat-radio-button color="primary" [value]="'accent'">accent</mat-radio-button><br />
        </mat-radio-group>
      </mat-grid-tile>
    </mat-grid-list>
    <div class="code-example" *ngIf="isCustomIcon == true">
      &lt;mat-icon <span [hidden]="colorVal == ''">color="{{colorVal}}"</span> <span [hidden]="sizeVal == ''">ngClass="{{sizeVal}}"</span> svgIcon="{{iconName}}"&gt;&lt;/mat-icon&gt;
    </div>
    <div class="code-example" *ngIf="isCustomIcon == false">
      &lt;mat-icon  <span [hidden]="colorVal == ''">color="{{colorVal}}"</span> <span [hidden]="sizeVal == ''">ngClass="{{sizeVal}}"</span>&gt;{{iconName}}&lt;/mat-icon&gt;
    </div>
    <mat-divider class="bottom-dividier"></mat-divider>
    <div class="__text-right">
      <button mat-raised-button color="primary">Close</button>
    </div>
  </div>`
})

export class IconExampleDialogComponent {
  title = '';
  iconName = '';
  isCustomIcon = false;
  sizeVal = '';
  colorVal = '';

  constructor(public dialogRef: MatDialogRef<IconExampleDialogComponent>,
			  @Inject(MAT_DIALOG_DATA) public data: any,
			  iconReg: MatIconRegistry,
			  sanitizer: DomSanitizer) {

  	this.iconName = data.iconName;
    this.isCustomIcon = data.isCustomIcon;

	iconReg.addSvgIcon('h21_flight_land_blue',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-blue-icon.svg'));
	iconReg.addSvgIcon('h21_flight_land_green',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-green-icon.svg'));
	iconReg.addSvgIcon('h21_flight_land_red',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-land-red-icon.svg'));
	iconReg.addSvgIcon('h21_flight_takeoff_blue',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-blue-icon.svg'));
	iconReg.addSvgIcon('h21_flight_takeoff_green',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-green-icon.svg'));
	iconReg.addSvgIcon('h21_flight_takeoff_red',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-flight-takeoff-red-icon.svg'));

	iconReg.addSvgIcon('h21_baggage',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-baggage-blue.svg'));
	iconReg.addSvgIcon('h21_no_baggage', 	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-baggage-gray.svg'));
	iconReg.addSvgIcon('h21_luggage',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-luggage-blue.svg'));
	iconReg.addSvgIcon('h21_no_luggage',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-no-luggage-gray.svg'));
	iconReg.addSvgIcon('h21_night',		sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-night-blue.svg'));
	iconReg.addSvgIcon('h21_back_to_list',	sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-back-to-list-gray.svg'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

