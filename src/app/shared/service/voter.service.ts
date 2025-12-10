import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 interface NewVoter {
    firstname: string;
    lastname: string;
    email: string;
    usertype: number;
    hasvoted: boolean;
    createdon?: string;
}

export interface AllVoters {
    voterId: number;
    voterName: string;
    hasVoted: boolean;
    userType: number;
    votes: number;
}

interface CastVote {
    voterId: number;
    candidateId: number;
    votes: number;
}

@Injectable({
    providedIn: 'root'
})
export class VoterService {

    private apiUrl = `${environment.apiUrl}voters` || 'http://your-api-base-url';  // Replace with your actual base URL

    constructor(private http: HttpClient) { }

    // GET all voters
    getAllUsers(): Observable<any> {
        return this.http.get<AllVoters[]>(`${this.apiUrl}/getallUsers`);
    }

    // POST (create) user
    createVoter(data: NewVoter): Observable<any> {
        return this.http.post<NewVoter>(`${this.apiUrl}/createuser`, data);
    }

    // Cast vote
    castVote(data: CastVote): Observable<any> {
        return this.http.put<boolean>(`${this.apiUrl}/castvote`, data);
    }
}