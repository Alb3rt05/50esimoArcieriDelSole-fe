import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Fix NG8103
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Fix NG8103
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  rsvpForm: FormGroup;
  isSubmitting = false; // Fix TS2339
  submitStatus: 'idle' | 'success' | 'error' = 'idle'; // Fix TS2339
  isExpired = false;

  // Cut-off date: 15 March 2026
  private cutoffDate = new Date('2026-03-15T23:59:59');

  constructor(
    private fb: FormBuilder,
    private sheetsService: GoogleSheetsService
  ) {
    this.rsvpForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellulare: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      presenza: ['SI', Validators.required],
      adulti: [0],
      bambini: [0],
      privacy: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    // Date Limit Check
    if (new Date() > this.cutoffDate) {
      this.isExpired = true;
      this.rsvpForm.disable();
    }

    // Conditional Logic
    this.rsvpForm.get('presenza')?.valueChanges.subscribe(val => {
      if (val === 'NO') {
        this.rsvpForm.get('adulti')?.disable();
        this.rsvpForm.get('bambini')?.disable();
        this.rsvpForm.get('adulti')?.setValue(0);
        this.rsvpForm.get('bambini')?.setValue(0);
      } else {
        this.rsvpForm.get('adulti')?.enable();
        this.rsvpForm.get('bambini')?.enable();
      }
    });
  }

  onSubmit() {
    if (this.rsvpForm.invalid || this.isExpired) return;

    this.isSubmitting = true; // Use isSubmitting
    this.submitStatus = 'idle';
    this.rsvpForm.disable();

    this.sheetsService.postRSVP(this.rsvpForm.getRawValue()).pipe(
      finalize(() => {
        this.isSubmitting = false;
        // Keep form disabled on success, or re-enable on error
        if (this.submitStatus === 'error') {
          this.rsvpForm.enable();
        }
      })
    ).subscribe({
      next: (res) => {
        this.submitStatus = 'success';
      },
      error: (err) => {
        console.error(err);
        this.submitStatus = 'error';
      }
    });
  }
}
