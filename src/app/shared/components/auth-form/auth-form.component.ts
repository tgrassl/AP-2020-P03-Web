import { ApplicationState, APPLICATION_STATE } from './../../state/application/application.state';
import { User } from './../../models/user.model';
import { LoginAction, RegisterAction } from './../../state/auth/auth.actions';
import { Store } from '@ngxs/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthFormComponent implements OnInit {

  @Input() type: 'login' | 'register';

  public authForm: FormGroup;
  public helpConfig: any;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getHelpText();
    this.authForm = new FormGroup({
      login: new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        pwd: new FormControl('', [Validators.required])
      }),
      register: new FormGroup({
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required]),
        pwd: new FormControl('', [Validators.required])
      }),
    });
  }

  public submitForm(): void {
    const formValues = this.authForm.get(this.type).value;
    if (this.type === 'login') {
      this.store.dispatch(new LoginAction(formValues.email, formValues.pwd));
    } else {
      this.store.dispatch(new RegisterAction(formValues as User));
    }
  }

  public getHelpText(): void {
    const login = {
      text: 'Noch keinen Account?',
      url: '/register',
      btn: 'Registrieren'
    };

    const register = {
      text: 'Bereits einen Account erstellt?',
      url: '/login',
      btn: 'Anmelden'
    };

    this.helpConfig = this.type === 'login' ? login : register;
  }

  public getSubmitButtonText(): string {
    return this.type === 'login' ? 'Anmelden' : 'Registrieren';
  }

  public isDisabled(): boolean {
    return this.authForm.get(this.type).invalid;
  }

  public getVerticalPosition(): number {
    return this.type === 'login' ? 40 : 20;
  }

  public isLoading(): boolean {
    return this.store.selectSnapshot(ApplicationState.applicationState) === APPLICATION_STATE.PENDING;
  }
}