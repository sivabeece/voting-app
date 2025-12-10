import { Routes } from '@angular/router';
import { AddUser } from './pages/adduser/adduser';
import { CastVote } from './pages/castvote/castvote';

export const routes: Routes = [{
    path: '', component: AddUser, pathMatch: 'full',

}, { path: 'castvote', component: CastVote }];
