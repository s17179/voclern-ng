import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      repeatedPassword: [null, [Validators.required]]
    }, {
      validators: [this.validateIfPasswordMatchesRepeatedPassword]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.httpClient.post<null>(
        'http://localhost:8080/api/register',
        {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          repeatedPassword: this.registerForm.value.repeatedPassword
        }
      ).subscribe(() => {
      }, error => {
      }, () => {
        this.router.navigate(['/login']);
      });
    }
  }

  private validateIfPasswordMatchesRepeatedPassword(group: FormGroup): ValidationErrors | null {
    if (group.get('repeatedPassword')?.value) {
      const passwordControl = group.controls.password;
      const repeatedPasswordControl = group.controls.repeatedPassword;

      if (passwordControl.value !== repeatedPasswordControl.value) {
        repeatedPasswordControl.setErrors({mustMatch: true});
        return {mustMatch: true};
      } else {
        repeatedPasswordControl.setErrors(null);
      }
    }

    return null;
  }
}
