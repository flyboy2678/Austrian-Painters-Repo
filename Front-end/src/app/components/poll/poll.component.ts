import { Component, inject } from '@angular/core';
import { AntdModule } from '../../global_componet_lib/antd_modules';
import { CommonModule, DatePipe } from '@angular/common'; // Import DatePipe
import { AddpollComponent } from './addpoll/addpoll.component';
import { PollService } from '../../services/poll/poll.service';
import { AuthService } from '../../services/auth/auth.service';

interface RawPollData {
  id: number;
  user_id: string;
  name_and_surname: string;
  poll_data: {
    voted?: string[];
    votes: number[];
    question: string;
    poll_options: string[];
  };
  created_at: string;
}

export interface PollOption {
  optionText: string;
  votes: number;
}

export interface Poll {
  id: number;
  user_id: string;
  name_and_surname: string;
  poll_data: {
    voted?: string[]; // Optional
    votes: number[];
    question: string;
    poll_options: string[];
  };
  created_at: Date;
}

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [AntdModule, AddpollComponent, CommonModule],
  providers: [DatePipe], // Provide DatePipe
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
})
export class PollComponent {
  pollService = inject(PollService);
  polls: Poll[] = [];
  selectedOptions: { [pollId: number]: string } = {};
  auth = inject(AuthService);
  optionIndex: number | undefined;

  constructor() {
    this.pollService.getPolls().subscribe({
      next: (response) => {
        console.log('Hello');
        console.log(response);

        this.polls = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Done');
      },
    });
  }

  hasUserVoted(poll: Poll): boolean {
    // return poll.poll_data.voted.includes(this.currentUserId);
    if (poll.poll_data.voted?.includes(this.auth.getCurrentUser().id)) {
      return true;
    }

    return false;
  }

  onVote(pollId: number, optionText: string): void {
    this.selectedOptions[pollId] = optionText;
  }

  findChosenIndex(pollId: number): void {
    const selectedOption = this.selectedOptions[pollId];
    const pollByPollId = this.polls.find((p) => p.id === pollId);
    const foundOption = pollByPollId?.poll_data.poll_options.findIndex(
      (option) => option === selectedOption
    );

    console.log(foundOption);

    this.optionIndex = foundOption;
  }

  submitVote(pollId: number): void {
    const selectedOption = this.selectedOptions[pollId];
    const pollByPollId = this.polls.find((p) => p.id === pollId);
    const foundOption = pollByPollId?.poll_data.poll_options.findIndex(
      (option) => option === selectedOption
    );

    console.log(`Poll Id: ${pollId}`);
    console.log(`Option Index: ${foundOption}`);
    this.incrementVotes(pollId);
    console.log(pollByPollId);

    this.pollService
      .updatePoll(pollId, {
        poll_data: pollByPollId?.poll_data,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  incrementVotes(pollId: number): void {
    const selectedOption = this.selectedOptions[pollId];
    const pollByPollId = this.polls.find((p) => p.id === pollId);
    const currentUserId = this.auth.getCurrentUser().id; // Assume this gets the current user ID

    if (pollByPollId && selectedOption) {
      // Ensure the voted array is initialized
      if (!pollByPollId.poll_data.voted) {
        pollByPollId.poll_data.voted = [];
      }

      // Find the index of the selected option
      const foundOptionIndex = pollByPollId.poll_data.poll_options.findIndex(
        (option) => option === selectedOption
      );

      // Check if the option was found
      if (foundOptionIndex !== -1) {
        // Increment the votes count
        pollByPollId.poll_data.votes[foundOptionIndex] =
          (pollByPollId.poll_data.votes[foundOptionIndex] || 0) + 1;

        // Add the current user to the voted array if not already present
        if (!pollByPollId.poll_data.voted.includes(currentUserId)) {
          pollByPollId.poll_data.voted.push(currentUserId);
        }

        console.log('Votes updated successfully');
      } else {
        console.error('Selected option not found');
      }
    } else {
      console.error('Poll not found or no option selected');
    }
  }
}
