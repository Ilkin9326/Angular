import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

 currentDate:number =  new Date().getFullYear();

 @Input() checkUserActivate = false;

}
