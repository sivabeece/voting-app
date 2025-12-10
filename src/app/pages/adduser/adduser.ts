import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { VoterService } from '../../shared/service/voter.service';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-adduser',
  imports: [ReactiveFormsModule, CommonModule, CardModule],
  templateUrl: './adduser.html',
  styleUrl: './adduser.css',
})
export class AddUser implements OnInit {
  userForm!: FormGroup;
  selectedOption: number = 1;

  constructor(private fb: FormBuilder, private voterService: VoterService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSelectUser(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedOption = parseInt(input.value);
  }

  onSubmit(): void {
    if (this.userForm && this.userForm.valid) {
      const formData = this.userForm.value;
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        usertype: this.selectedOption,
        hasvoted: false
      };

      this.voterService.createVoter(payload).subscribe({
        next: () => {
          alert('User Added Successfully');
          this.userForm.reset();
        },
        error: (err) => {
          alert('Error adding Site: ' + err.message);
        }
      });

    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

}
