import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-rsvp',
    imports: [ReactiveFormsModule],
    templateUrl: './rsvp.component.html',
    styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {
  rsvpForm: FormGroup;
  isLoading = false;
  submitted = false;
  errorMsg = '';
  successMsg = '';
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

    this.isLoading = true;
    this.rsvpForm.disable(); // Prevent double submission

    this.sheetsService.postRSVP(this.rsvpForm.getRawValue()).pipe(
      finalize(() => {
        this.isLoading = false;
        // Keep form disabled on success
      })
    ).subscribe({
      next: (res) => {
        this.successMsg = 'Grazie! La tua presenza è stata registrata.';
        this.submitted = true;
      },
      error: (err) => {
        this.errorMsg = 'Si è verificato un errore. Riprova più tardi.';
        this.rsvpForm.enable(); // Re-enable on error to allow retry
      }
    });
  }
}
