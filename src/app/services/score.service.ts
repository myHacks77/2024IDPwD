import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private userName!: string;

  constructor() { }

  setUser(name: string) {
    this.userName = name;
    // localStorage.setItem('user', name);
  }

  getUser():string {
    return this.userName;
    // return localStorage.getItem('user');
  }
} 
