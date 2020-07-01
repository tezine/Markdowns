import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {UsersService} from '../../services/users.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers:[UsersService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    fixture.debugElement.nativeElement.style.visibility = "hidden";//use this to hide the component from karma result
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('Criação do componente', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Teste com email/senha inválidos', async () => {
    component.email=undefined;
    component.password=undefined;
    let result=await component.authenticateUser();
    expect(result).toBeFalse();
    //let's wait for dom updates and check if the error div is displayed.
    fixture.detectChanges();
    let errorDiv = fixture.debugElement.query(By.css('#errorDiv'));
    //expect(component.errorDiv).toBeTruthy()
    //ou
    expect(errorDiv).toBeTruthy()
  });

  it('Teste com email/senha válidos', async () => {
    component.email='bruno@tezine.com';
    component.password='tata';
    let result=await component.authenticateUser();
    expect(result).toBeTrue()
  });
});
