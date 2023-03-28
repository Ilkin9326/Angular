import { Component } from '@angular/core';
import { AppConfig } from 'src/config/app-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private config: AppConfig){}

  title = this.config.title;
  name:string = "Ilkin Isgenderli";
}
