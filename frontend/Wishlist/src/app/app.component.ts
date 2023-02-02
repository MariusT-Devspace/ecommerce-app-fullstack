import { Component, OnInit } from '@angular/core';
import { AuthUtilsService } from './core/auth/services/auth-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'Wishlist';

  constructor(private authUtilsService: AuthUtilsService) { }

  ngOnInit(): void {
    this.authUtilsService.navigateToHome();
  }
}
