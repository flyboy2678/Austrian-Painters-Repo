import { Component, inject } from '@angular/core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { PollService } from '../../../services/poll/poll.service';
import { AntdModule } from '../../../global_componet_lib/antd_modules';

@Component({
  selector: 'app-addpoll',
  standalone: true,
  imports: [FormsModule, CommonModule, AntdModule, FontAwesomeModule],
  templateUrl: './addpoll.component.html',
  styleUrl: './addpoll.component.css',
})
export class AddpollComponent {
  auth = inject(AuthService);
  pollService = inject(PollService);

  faAdd = faAdd;

  isVisible = false; // show and hide modal
  isOkLoading = false; // load on click or not

  inputValue: string = ''; // Store the input value

  poll_question: string = '';
  poll_options: any[] = [];
  votes: number[] = [];

  constructor() {}

  onSubmit(): void {
    const user = this.auth.getCurrentUser();
    console.log(user);
    console.log(`Question: ${this.poll_question}`);
    console.log(`Options: ${this.poll_options}`);
    console.log(`Votes: ${this.votes}`);
    console.log(`${user.firstName} ${user.lastName}`);

    this.pollService
      .addPoll(user.id, {
        name_and_surname: `${user.firstName} ${user.lastName}`,
        poll_data: {
          question: this.poll_question,
          poll_options: this.poll_options,
          votes: this.votes,
          voted: [],
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete() {},
      });

    location.reload();

    this.poll_question = '';
    this.poll_options = [];
  }

  addOption(): void {
    if (this.inputValue.trim()) {
      // Check if input is not empty
      this.poll_options.push(this.inputValue); // Add the value to the array
      this.inputValue = ''; // Clear the input field after adding
      this.votes.push(0);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  // when confirm is clicked
  handleConfirm(): void {
    this.onSubmit();

    this.isOkLoading = true;
    this.isVisible = false;
    this.isOkLoading = false;
    // setTimeout(() => {
    //   this.isVisible = false;
    //   this.isOkLoading = false;
    // }, 3000);
  }

  handleCancel(): void {
    this.poll_options = [];

    this.isVisible = false;
  }
}
