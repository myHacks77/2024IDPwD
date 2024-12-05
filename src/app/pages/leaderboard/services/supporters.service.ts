import { Injectable } from '@angular/core';
import { Supporter } from '../data/supporters';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportersService {
  private readonly STORAGE_KEY = 'app_supporters';
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

  addSupporter(name: string) {
    const newSupporter: Supporter = {
      name,
      joinDate: new Date(),
      position: {
        x: 3 + Math.random() * 90, // 3-93%
        y: 3 + Math.random() * 90  // 3-93%
      }
    };

    const currentSupporters = this.currentSupporters;
    // 检查是否已存在
    if (!currentSupporters.find(s => s.name === name)) {
      const updatedSupporters = [...currentSupporters, newSupporter];
      this.supportersSubject.next(updatedSupporters);
      this.saveToStorage(updatedSupporters);
    }
  }

  private loadFromStorage(): Supporter[] {
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
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(supporters));
    } catch (error) {
      console.error('Error saving supporters:', error);
    }
  }
} 