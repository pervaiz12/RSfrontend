import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor( private cookies: CookiesService,private router:Router
    ) { }

  ngOnInit(): void {
    this.cookies.logout();
    this.router.navigate(['login']);
  }

}
