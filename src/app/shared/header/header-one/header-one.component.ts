import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;

  users: any;
  connect: boolean = false;

  constructor(
    public auth: AngularFireAuth, 
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user').toString() === 'null'){
      this.connect = false;
    } else {
      this.connect = true;
    }
  }

  deconnexion(){
    this.auth.signOut().then((user) => {
      localStorage.setItem('user', null);
      this.connect = false
      this.router.navigate(['/home/home/'])
    });;
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

}
