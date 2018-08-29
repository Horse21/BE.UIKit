import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'h21-table-travelers',
  templateUrl: './h21-table-travelers.component.html',
  styleUrls: ['./h21-table-travelers.component.scss']
})
export class H21TableTravelersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['avatar', 'name', 'agency', 'branch', 'agent', 'status', 'action'];
  dataSource = ELEMENT_DATA;
}
export interface TableTravelers {
  avatar: string;
  name: string;
  agency: string;
  branch: string;
  agent: string;
  status: string;
}

const ELEMENT_DATA: TableTravelers[] = [
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', agency: 'Raptim', agent:'Jane Doe', branch: 'Raptim office Denmark', status: 'Active'}
];