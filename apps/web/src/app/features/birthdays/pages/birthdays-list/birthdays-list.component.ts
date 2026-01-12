import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BirthdayService } from '../../services/birthday.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-birthdays-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <header>
        <h1>🎂 Birthday Reminders</h1>
        <div class="header-actions">
          <span class="user-name">{{ authService.currentUser()?.name || authService.currentUser()?.email }}</span>
          <button class="btn-secondary" (click)="authService.logout()">Logout</button>
        </div>
      </header>

      <div class="content">
        <!-- Upcoming Birthdays -->
        <section class="upcoming-section">
          <h2>🔔 Coming Soon</h2>
          @if (birthdayService.upcomingBirthdays().length === 0) {
            <p class="empty-state">No upcoming birthdays in the next 30 days</p>
          } @else {
            <div class="upcoming-list">
              @for (birthday of birthdayService.upcomingBirthdays(); track birthday._id) {
                <div class="upcoming-card" [class.today]="birthday.daysUntil === 0">
                  <div class="upcoming-info">
                    <h3>{{ birthday.name }}</h3>
                    <p class="date">{{ getDateString(birthday) }}</p>
                    @if (birthday.age) {
                      <p class="age">Turning {{ birthday.age }}</p>
                    }
                  </div>
                  <div class="days-until">
                    @if (birthday.daysUntil === 0) {
                      <span class="today-badge">TODAY! 🎉</span>
                    } @else {
                      <span class="days">{{ birthday.daysUntil }}</span>
                      <span class="label">days</span>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </section>

        <!-- All Birthdays -->
        <section class="all-section">
          <div class="section-header">
            <h2>📅 All Birthdays</h2>
            <button class="btn-primary" (click)="showAddModal.set(true)">+ Add Birthday</button>
          </div>
          
          @if (birthdayService.birthdays().length === 0) {
            <p class="empty-state">No birthdays added yet. Add your first one!</p>
          } @else {
            <div class="birthdays-grid">
              @for (birthday of birthdayService.birthdays(); track birthday._id) {
                <div class="birthday-card">
                  <h3>{{ birthday.name }}</h3>
                  <p class="date">{{ getDateString(birthday) }}</p>
                  @if (birthday.birthYear) {
                    <p class="year">Born {{ birthday.birthYear }}</p>
                  }
                  <div class="card-actions">
                    <button class="btn-icon" (click)="editBirthday(birthday)">✏️</button>
                    <button class="btn-icon" (click)="deleteBirthday(birthday._id!)">🗑️</button>
                  </div>
                </div>
              }
            </div>
          }
        </section>
      </div>

      <!-- Add/Edit Modal -->
      @if (showAddModal() || showEditModal()) {
        <div class="modal-overlay" (click)="closeModals()">
          <div class="modal" (click)="$event.stopPropagation()">
            <h2>{{ showEditModal() ? 'Edit Birthday' : 'Add Birthday' }}</h2>
            <form (submit)="onSubmit($event)">
              <div class="form-group">
                <label>Name</label>
                <input type="text" [(ngModel)]="formData.name" name="name" required />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Month</label>
                  <select [(ngModel)]="formData.birthMonth" name="month" required>
                    @for (month of months; track month.value) {
                      <option [value]="month.value">{{ month.label }}</option>
                    }
                  </select>
                </div>
                
                <div class="form-group">
                  <label>Day</label>
                  <input type="number" [(ngModel)]="formData.birthDay" name="day" 
                         min="1" max="31" required />
                </div>
              </div>

              <div class="form-group">
                <label>Year (Optional)</label>
                <input type="number" [(ngModel)]="formData.birthYear" name="year" 
                       min="1900" max="2100" />
              </div>

              <div class="modal-actions">
                <button type="button" class="btn-secondary" (click)="closeModals()">Cancel</button>
                <button type="submit" class="btn-primary">
                  {{ showEditModal() ? 'Update' : 'Add' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      background: #f5f7fa;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-size: 1.75rem;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .user-name {
      font-size: 0.875rem;
    }

    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    section {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h2 {
      margin: 0 0 1.5rem;
      color: #333;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .upcoming-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .upcoming-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 0.5rem;
      transition: all 0.3s;
    }

    .upcoming-card.today {
      border-color: #ffc107;
      background: #fffbea;
    }

    .upcoming-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .upcoming-info h3 {
      margin: 0 0 0.25rem;
      color: #333;
    }

    .upcoming-info p {
      margin: 0;
      color: #666;
      font-size: 0.875rem;
    }

    .days-until {
      text-align: center;
      min-width: 80px;
    }

    .days {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }

    .label {
      display: block;
      font-size: 0.75rem;
      color: #666;
    }

    .today-badge {
      background: #ffc107;
      color: #333;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-weight: bold;
      font-size: 0.875rem;
    }

    .birthdays-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }

    .birthday-card {
      padding: 1.5rem;
      border: 2px solid #e0e0e0;
      border-radius: 0.5rem;
      transition: all 0.3s;
    }

    .birthday-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .birthday-card h3 {
      margin: 0 0 0.5rem;
      color: #333;
    }

    .birthday-card p {
      margin: 0.25rem 0;
      color: #666;
      font-size: 0.875rem;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: white;
      color: #667eea;
      border: 2px solid #667eea;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover {
      background: #667eea;
      color: white;
    }

    .btn-icon {
      background: transparent;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: background 0.2s;
    }

    .btn-icon:hover {
      background: #f0f0f0;
    }

    .empty-state {
      text-align: center;
      color: #999;
      padding: 2rem;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #667eea;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  `]
})
export class BirthdaysListComponent implements OnInit {
  showAddModal = signal(false);
  showEditModal = signal(false);

  formData: any = {
    name: '',
    birthDay: 1,
    birthMonth: 1,
    birthYear: undefined
  };

  editingId: string | null = null;

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  constructor(
    public birthdayService: BirthdayService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.birthdayService.loadBirthdays().subscribe();
    this.birthdayService.loadUpcoming().subscribe();
  }

  getDateString(birthday: any): string {
    const month = this.months.find(m => m.value === birthday.birthMonth)?.label;
    return `${month} ${birthday.birthDay}`;
  }

  editBirthday(birthday: any) {
    this.formData = { ...birthday };
    this.editingId = birthday._id;
    this.showEditModal.set(true);
  }

  deleteBirthday(id: string) {
    if (confirm('Are you sure you want to delete this birthday?')) {
      this.birthdayService.delete(id).subscribe();
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const data = {
      name: this.formData.name,
      birthDay: Number(this.formData.birthDay),
      birthMonth: Number(this.formData.birthMonth),
      birthYear: this.formData.birthYear ? Number(this.formData.birthYear) : undefined
    };

    if (this.showEditModal() && this.editingId) {
      this.birthdayService.update(this.editingId, data).subscribe(() => {
        this.closeModals();
      });
    } else {
      this.birthdayService.create(data).subscribe(() => {
        this.closeModals();
      });
    }
  }

  closeModals() {
    this.showAddModal.set(false);
    this.showEditModal.set(false);
    this.editingId = null;
    this.formData = {
      name: '',
      birthDay: 1,
      birthMonth: 1,
      birthYear: undefined
    };
  }
}