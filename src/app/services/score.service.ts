import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private userName: string | undefined;

  constructor() { }

  setUser(name: string) {
    this.userName = name;
    // localStorage.setItem('user', name);
  }

  getUser() {
    // return localStorage.getItem('user');
  }
} 
