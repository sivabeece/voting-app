import { signal, Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AllVoters, VoterService } from '../../shared/service/voter.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CardModule, FormsModule],
  templateUrl: './castvote.html',
  styleUrl: './castvote.css',
  standalone: true,
})
export class CastVote implements OnInit {
  selectedCandidate: number | null = null; // Set Selected Candidate
  selectedVoter: any = null; // Set Selected Voter
  allUsers: AllVoters[] = []; // All Users

  votersData: AllVoters[] = []; // Filter volters alone
  candidateData: AllVoters[] = []; // Filter candidates alone
  candidates = signal<{ value: number; label: string }[]>([]); // Candidates for dropdown
  voters = signal<{ id: number; name: string; hasVoted: boolean }[]>([]); // Voters for dropdown
  votes: any; // Votes of selected candidate

  constructor(private voterService: VoterService) { }

  ngOnInit() {
    this.fetchAllUsers(); // Fetch all users
  }

  // Fetch all users from the service
  fetchAllUsers() {
    this.voterService.getAllUsers().subscribe((data: AllVoters[]) => {

      this.votersData = data.filter((user: AllVoters) => user.userType === 2);
      this.candidateData = data.filter((user: AllVoters) => user.userType === 1);

      this.candidates.set(this.candidateData.map(c => ({
        label: c.voterName,
        value: c.voterId
      })));

      this.voters.set(this.votersData.map(v => ({
        name: v.voterName, id: v.voterId, hasVoted: v.hasVoted
      })));

      console.log(this.voters);

    }, (error) => {
      console.error('Error fetching Sites', error);
    });
  }

  // Handle candidate selection and casting the vote
  onSelectCandidate(value: number) {
    if (!this.selectedVoter) {
      alert("Please select a voter first.");
      this.selectedCandidate = null;
      this.votes = null;
      return;
    }

    this.votes = this.candidateData.find(candidate => candidate.voterId === value);
    this.selectedCandidate = value;

    const votePayload = {
      candidateId: value,
      voterId: this.selectedVoter.id,
      votes: this.votes.votes + 1
    };

    this.voterService.castVote(votePayload).subscribe({
      next: (response) => {
        alert("Vote cast successfully!");

        // Refresh cleanly
        this.selectedVoter = null;
        this.selectedCandidate = null;
        this.votes = null;

        // Re-fetch users cleanly
        this.fetchAllUsers();
      },
      error: (error) => {
        console.error("Error casting vote", error);
        alert("Failed to cast vote.");
      }
    });


  }

  // Handle voter selection and promts alert when the selected voter already voted
  OnSelectVoter(vote: any) {
    this.selectedCandidate = vote.name;
    if (vote.hasVoted) {
      alert('This voter has already cast their vote.');
      this.selectedVoter = null;
      return;
    } else {

      this.selectedVoter = vote;
    }
    this.selectedCandidate = null;
  }
}
