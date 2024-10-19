import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { Invoice } from './types';

interface Filter {
  key: string;
  value: string;
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [RouterModule, TableModule, DropdownModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
  providers: [InvoiceService],
})
export class InvoicesComponent implements OnInit {
  constructor(private InvoiceService: InvoiceService) { }

  filters: Filter[] = [
    { key: "All", value: "all" },
    { key: "Paid", value: "paid" },
    { key: "Pending", value: "pending" },
    { key: "Draft", value: "draft" }
  ];

  formGroup: FormGroup | undefined;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedFilter: new FormControl<Filter | null>(null),
    });

    // Fetch invoices and set them in the signal
    this.InvoiceService.fetchInvoices().subscribe({
      next: (data: Invoice[]) => {
        this.InvoiceService.setInvoices(data);
      },
      error: (err) => {
        console.error('Error fetching invoices', err);
      },
    });

    this.formGroup.get('selectedFilter')?.valueChanges.subscribe((selectedFilter: string) => {
      this.InvoiceService.setSelectedFilter(selectedFilter);
    });
  }

  onFilterChange(selectedFilter: any): void {
    this.InvoiceService.setSelectedFilter(selectedFilter.target.value);
  }

  get filteredInvoices() {
    return this.InvoiceService.getFilteredInvoicesFromSignal();
  }

  getSelectedFilterSignal(): string | undefined {
    return this.InvoiceService.getSelectedFilterValueFromSignal();
  }
}
