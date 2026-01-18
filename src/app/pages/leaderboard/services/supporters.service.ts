import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Supporter } from '../data/supporters';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportersService {
  private readonly STORAGE_KEY = 'app_supporters';
  private user: string | null = null;
  private supportersSubject: BehaviorSubject<Supporter[]>;
  private step: number = 0;  // 0: welcome, 1: hello-friend, 2: thank-you, 3: leaderboard

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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

  get currentStep(): number {
    return this.step;
  }

  setUser(name: string) {
    this.user = name;
  }

  clearUser() {
    this.user = null;
  }

  setStep(step: number) {
    this.step = step;
  }

  completeCurrentStep() {
    this.step++;
  }

  resetProgress() {
    this.step = 0;
    this.clearUser();
  }

  addSupporter(newSupporter: Supporter) {
    const currentSupporters = this.currentSupporters;
    const updatedSupporters = [...currentSupporters, newSupporter];
    this.supportersSubject.next(updatedSupporters);
    this.saveToStorage(updatedSupporters);
  }

  private loadFromStorage(): Supporter[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return [];
      }
      const supporters = JSON.parse(stored);

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
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(supporters));
    } catch (error) {
      console.error('Error saving supporters:', error);
    }
  }
}