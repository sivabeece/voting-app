import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AllVoters, VoterService } from '../../shared/service/voter.service';

@Component({
  imports: [CardModule], // Ensure DropDownModule is correctly imported
  templateUrl: './castvote.html',
  styleUrl: './castvote.css',
})
export class CastVote  implements OnInit{
  selectedValue: number | null = null;
  selectedVoter: any = null;
  allUsers: AllVoters[] = [];

  votersData: AllVoters[] = [];
  candidateData: AllVoters[] = [];
  candidates: any[] = [];
  voters: any[] = [];
  votes: any;
  
  radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  constructor(private voterService: VoterService) { }

  ngOnInit() {
     this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.voterService.getAllUsers().subscribe((data: AllVoters[]) => {
      setTimeout(() => {
        console.log('Fetched Users:', data);
        
        this.votersData = data.filter((user: AllVoters) => user.userType === 2);
        this.candidateData = data.filter((user: AllVoters) => user.userType === 1);

          this.candidates = this.candidateData.map(c => ({
            label: c.voterName,
            value: c.voterId
          }));

          this.voters = this.votersData.map(v => ({
            name: v.voterName, id: v.voterId, hasVoted: v.hasVoted
          }));

      }, 500);
      
    }, (error) => {
      console.error('Error fetching Sites', error);
    });
  }

  onSelectCandidate(value: number) {
      if (!this.selectedVoter) {
        alert("Please select a voter first.");
        this.selectedValue = null;
        this.votes = null;
        return;
      }

      this.votes = this.candidateData.find(candidate => candidate.voterId === value);
    
      console.log("Selected voter:", this.selectedVoter);
      console.log("Selected candidate object:", this.votes);
      this.selectedValue = value;
      console.log("Selected candidate value:", value);
    
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
          this.selectedValue = null;
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

  OnSelectVoter(vote: any) {
    this.selectedValue = vote.name;
    if(vote.hasVoted) {
      alert('This voter has already cast their vote.');
      this.selectedVoter = null;
      return;
    } else {
     
      this.selectedVoter = vote;
    }
    this.selectedValue = null;
  }
}
