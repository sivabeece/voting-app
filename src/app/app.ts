import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('voting-app');
  menus = signal([
    { id: 1, name: 'Add User' , route:'/', icon:'fa-solid fa-users'},
    { id: 2, name: 'Cast Vote' , route:'/castvote', icon: 'fa-solid fa-person-chalkboard'},
  ]);
  activeItem = signal<number>(1);

  setActive(item: number) {
    this.activeItem.set(item);
  }
}
