import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from './types';
import invoices from './invoices.data';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  // Keep writable signals private and access them via service only
  private invoicesSignal = signal<Invoice[]>([]);

  private selectedFilterSignal = signal<string | undefined>(undefined);

  // Computed signals replace filter pipe transforms as they can filter the bound resuklts based on data
  private filteredInvoicesSignal = computed(() => {
    const selectedFilter = this.selectedFilterSignal();
    const invoices = this.invoicesSignal();

    if (!selectedFilter || selectedFilter === "all") {
      return invoices;
    }

    return invoices.filter((invoice) => invoice.status === selectedFilter);
  });

  constructor(private http: HttpClient) { }

  fetchInvoices(): Observable<Invoice[]> {
    // return this.http.get<Invoice[]>('https://12990764-7090-4dd0-83c0-a964ec76f4da.mock.pstmn.io/invoices');
    return of(invoices);
  }

  setInvoices(invoices: Invoice[]): void {
    this.invoicesSignal.set(invoices);
  }

  setSelectedFilter(filter: string | undefined): void {
    this.selectedFilterSignal.set(filter);
  }

  getFilteredInvoicesFromSignal(): Invoice[] {
    return this.filteredInvoicesSignal();
  }

  getSelectedFilterValueFromSignal(): string | undefined {
    return this.selectedFilterSignal();
  }
}
