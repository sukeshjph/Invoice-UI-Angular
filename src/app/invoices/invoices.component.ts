import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { InvoiceHeaderComponent } from './components/invoiceHeader/invoiceHeader.component';
import { Invoice } from './types';
import { InvoiceListComponent } from "./components/invoiceList/invoiceList.component";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [RouterModule, TableModule, DropdownModule,
    ReactiveFormsModule, ButtonModule, CurrencyPipe,
    NgClass, InvoiceHeaderComponent, InvoiceListComponent],
  templateUrl: './invoices.component.html',
  providers: [InvoiceService],
})
export class InvoicesComponent implements OnInit {
  constructor(private InvoiceService: InvoiceService) { }

  ngOnInit(): void {
    // Fetch invoices and set them in the signal
    this.InvoiceService.fetchInvoices().subscribe({
      next: (data: Invoice[]) => {
        this.InvoiceService.setInvoices(data);
      },
      error: (err) => {
        console.error('Error fetching invoices', err);
      },
    });
  }

  onUpdateFilter(selectedFilterValue: any): void {
    this.InvoiceService.setSelectedFilter(selectedFilterValue);
  }

  get filteredInvoices() {
    return this.InvoiceService.getFilteredInvoicesFromSignal();
  }

  getSelectedFilterSignal(): string | undefined {
    return this.InvoiceService.getSelectedFilterValueFromSignal();
  }
}
