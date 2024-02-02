import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {
  isForm = false;
  public taskDatas: Array<number> = []

  constructor(private formBuild: FormBuilder){}

  addFormBuilder = this.formBuild.group({
    name:['', Validators.required],
    description:['', Validators.required]
  })


}
