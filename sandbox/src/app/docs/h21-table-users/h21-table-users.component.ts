import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'h21-table-users',
  templateUrl: './h21-table-users.component.html',
  styleUrls: ['./h21-table-users.component.scss']
})
export class H21TableUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['avatar', 'name', 'create', 'change', 'status', 'action'];
  dataSource = ELEMENT_DATA;
}
export interface TableUsers {
  avatar: string;
  name: string;
  email: string;
  create: string;
  change: string;
  status: string;
}

const ELEMENT_DATA: TableUsers[] = [
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', email: 'bezos@amazon.com', create: '25.07.18', change: '25.07.18', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', email: 'bezos@amazon.com', create: '25.07.18', change: '25.07.18', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', email: 'bezos@amazon.com', create: '25.07.18', change: '25.07.18', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', email: 'bezos@amazon.com', create: '25.07.18', change: '25.07.18', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', email: 'bezos@amazon.com', create: '25.07.18', change: '25.07.18', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', email: 'bezos@amazon.com', create: '25.07.18', change: '25.07.18', status: 'Active'},
  {avatar: 'https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg', name: 'Jeff Bezos', email: 'bezos@amazon.com', create: '25.07.18', change: '25.07.18', status: 'Active'}
];