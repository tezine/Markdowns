import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  //===========================TEMPLATE DRIVEN BELOW============================

  firstName='';
  email='';

  onTemplateDrivenFormSubmit(){
    console.log('Template driven form values:', this.firstName, this.email);
  }


  //===========================REACTIVE BELOW=================================
  firstNameControl= new FormControl('',[Validators.required,Validators.minLength(4)]);
  emailControl= new FormControl('',[Validators.required,Validators.minLength(4), Validators.email]);
  profileForm = new FormGroup({
    firstNameControl: this.firstNameControl,
    emailControl:this.emailControl
  });

  onReactiveFormSubmit(){
    console.log('Reactive form values:', this.profileForm.value);
    this.profileForm.markAllAsTouched();
  }

}
