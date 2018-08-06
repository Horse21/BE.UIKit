import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'h21-table-agents',
  templateUrl: './h21-table-agents.component.html',
  styleUrls: ['./h21-table-agents.component.scss']
})
export class H21TableAgentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['name', 'agency', 'createdby', 'change', 'status', 'action'];
  dataSource = ELEMENT_DATA;
}
export interface TableAgents{
  name: string;
  agency: string;
  createdby: string;
  change: string;
  status: string;
}

const ELEMENT_DATA: TableAgents[] = [
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
  {name:'John Smith', agency: 'BCD Travel', createdby: 'John Doe', change:'07.25.2018', status: 'Active'},
];