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
import { Observable } from 'rxjs';

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
  // invoicesLocal: Invoice[] = [];
  constructor(public InvoiceService: InvoiceService) { }

  ngOnInit(): void {
    // Fetch invoices
    this.InvoiceService.fetchInvoices();

    // Subscribe to the service's BehaviorSubject
    // this.InvoiceService.getInvoiceSubjectAsObservable().subscribe({
    //   next: (data: Invoice[]) => {
    //     this.invoicesLocal = data;
    //   },
    //   error: (err) => console.error('Error in Invoice subscription', err),
    // });
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
