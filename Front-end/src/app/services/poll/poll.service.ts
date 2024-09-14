import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export interface PollOption {
  optionText: string;
  votes: number;
}

export interface Poll {
  id: number;
  user_id: string;
  name_and_surname: string;
  question: string;
  poll_options: PollOption[];
  userVoted: string[];
  created_at: Date;
  selectedOption?: string; // Optional property for selected option
}

@Injectable({
  providedIn: 'root',
})

export class PollService {
  private http = inject(HttpClient);
  
  
  private currentUserId = 'user123'; // Example current user ID

  private polls: Poll[] = [
    {
      id: 1,
      user_id: '3',
      question: 'What is your favorite programming language?',
      poll_options: [
        { optionText: 'JavaScript', votes: 5 },
        { optionText: 'Python', votes: 3 },
        { optionText: 'C++', votes: 2 }
      ],
      name_and_surname: 'John Doe',
      created_at: new Date(),
      userVoted: ['user456'] // Example: User 'user456' has voted
      ,
    }
  ];

  getPollsFrontEnd(): Observable<Poll[]> {
    return of(this.polls);
  }

  hasUserVoted(poll: Poll): boolean {
    return poll.userVoted.includes(this.currentUserId);
  }

  vote(pollId: number, selectedOption: string): void {

    console.log(pollId);
    console.log(selectedOption)
    const poll = this.polls.find(p => p.id === pollId);
    if (poll && !this.hasUserVoted(poll)) {
      const option = poll.poll_options.find(o => o.optionText === selectedOption);
      if (option) {
        option.votes++;
        poll.userVoted.push(this.currentUserId); // Add the current user ID to the list of those who voted
        poll.selectedOption = selectedOption;

      }
    }
  }

  

  
  
  // adds a poll, do add the name_and_surname in data
  addPoll(user_id: string, data: any): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/insert-poll/${user_id}`,
      data
    );
  }
  
  // adds a poll, do add the name_and_surname in data
  updatePoll(id: number, data: any): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/update-poll/${id}`,
      data
    );
  }
  


  // ORIGINAL
  getPolls(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/get-poll`);
  }
}
