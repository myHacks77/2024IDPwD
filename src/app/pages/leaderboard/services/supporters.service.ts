import { Injectable } from '@angular/core';
import { Supporter } from '../data/supporters';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportersService {
  private readonly STORAGE_KEY = 'app_supporters';
  private user: string | null = null;
  private supportersSubject: BehaviorSubject<Supporter[]>;

  
  constructor() {
    const storedSupporters = this.loadFromStorage();
    this.supportersSubject = new BehaviorSubject<Supporter[]>(storedSupporters);
  }

  get supporters$(): Observable<Supporter[]> {
    return this.supportersSubject.asObservable();
  }

  get currentSupporters(): Supporter[] {
    return this.supportersSubject.value;
  }

  get currentUser(): string | null {
    return this.user;
  }

  setUser(name: string) {
    this.user = name;
  }

  clearUser() {
    this.user = null;
  }

  addSupporter(newSupporter: Supporter) {
    const currentSupporters = this.currentSupporters;
    const updatedSupporters = [...currentSupporters, newSupporter];
    this.supportersSubject.next(updatedSupporters);
    this.saveToStorage(updatedSupporters);
  }

  private loadFromStorage(): Supporter[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return [];
      }
      const supporters = JSON.parse(stored);
      console.log(supporters);
      return supporters.map((s: any) => ({
        ...s,
        joinDate: new Date(s.joinDate)
      }));
    } catch (error) {
      console.error('Error loading supporters:', error);
      return [];
    }
  }

  private saveToStorage(supporters: Supporter[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(supporters));
    } catch (error) {
      console.error('Error saving supporters:', error);
    }
  }
}