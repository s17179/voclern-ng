import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ContactComponent} from './contact/contact.component';
import {AuthGuard} from './auth/auth.guard';
import {WordListComponent} from './word-list/word-list.component';
import {NewWordComponent} from './new-word/new-word.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'word-list', component: WordListComponent, canActivate: [AuthGuard] },
  { path: 'new-word', component: NewWordComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
