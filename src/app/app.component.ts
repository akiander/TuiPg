import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title: string = 'Toast UI Editor';
  controlName: string = "myControl";
  markdownOptions: any = {
		initialEditType: 'wysiwyg',
		height: '30rem'
	};

}
