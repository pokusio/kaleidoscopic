import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  red = '30';
  green = '210';
  blue = '100';
  opacity = '0.45';

  size = 16;
  displayText = 'show-class';
  visible = true;
  constructor() { }

  toggle() {
    this.visible = !this.visible;
    this.displayText = this.visible ? 'show-class' : 'hide-class';
  }
}
