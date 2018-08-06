import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'h21-table-agencies',
  templateUrl: './h21-table-agencies.component.html',
  styleUrls: ['./h21-table-agencies.component.scss']
})

export class H21TableAgenciesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['logo', 'name', 'type', 'create', 'change', 'status', 'action'];
  dataSource = ELEMENT_DATA;
}
export interface TableAgencies {
  logo:string;
  name: string;
  adress: string;
  type: string;
  create:string;
  change: string;
  status: string;
}

const ELEMENT_DATA: TableAgencies[] = [
  {logo: 'https://www.vcktravel.nl/assets/img/vcktravel-logo-large.png', name: 'VCK Travel', adress: '6th Floor 240 Blackfiars Road, London SE1 8NW.', type: 'Corporate', create: '25.07.18', change: '25.07.18 18:54', status: 'Active'},
  {logo: 'https://www.vcktravel.nl/assets/img/vcktravel-logo-large.png', name: 'VCK Travel', adress: '6th Floor 240 Blackfiars Road, London SE1 8NW.', type: 'Corporate', create: '25.07.18', change: '25.07.18 18:54', status: 'Active'},
  {logo: 'https://www.vcktravel.nl/assets/img/vcktravel-logo-large.png', name: 'VCK Travel', adress: '6th Floor 240 Blackfiars Road, London SE1 8NW.', type: 'Corporate', create: '25.07.18', change: '25.07.18 18:54', status: 'Active'},
  {logo: 'https://www.vcktravel.nl/assets/img/vcktravel-logo-large.png', name: 'VCK Travel', adress: '6th Floor 240 Blackfiars Road, London SE1 8NW.', type: 'Corporate', create: '25.07.18', change: '25.07.18 18:54', status: 'Active'},
  {logo: 'https://www.vcktravel.nl/assets/img/vcktravel-logo-large.png', name: 'VCK Travel', adress: '6th Floor 240 Blackfiars Road, London SE1 8NW.', type: 'Corporate', create: '25.07.18', change: '25.07.18 18:54', status: 'Active'}
];