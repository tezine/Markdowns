import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


  //===========================REACTIVE BELOW=================================
  firstNameControl= new FormControl('',[Validators.required,Validators.minLength(4)]);
  emailControl= new FormControl('',[Validators.required,Validators.minLength(4), Validators.email]);
  profileForm = new FormGroup({
    firstNameControl: this.firstNameControl,
    emailControl:this.emailControl
  });

  isFirstNameInvalid():boolean{
    let firstNameControl=this.profileForm.get('firstName');//we can also use this.firstNameControl instead
    if(!firstNameControl)return true;
    if(firstNameControl.invalid && (firstNameControl.dirty || firstNameControl.touched))return true;
    return false;
  }

  onReactiveFormSubmit(){
    console.log('Profile form values:', this.profileForm.value);
    this.profileForm.markAllAsTouched();
  }

}
