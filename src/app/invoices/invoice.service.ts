import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, catchError } from 'rxjs';
import { Invoice } from './types';
import invoices from './invoices.data';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  // Both Behaviour Subject and Signal can be used independently to manage Angular State 

  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);

  // Keep writable signals private and access them via service only
  private invoicesSignal = signal<Invoice[]>([]);
  private inVoiceCount = 0;

  private selectedFilterSignal = signal<string | undefined>(undefined);

  // Computed signals replace filter pipe transforms as they can filter the bound results based on data
  private filteredInvoicesSignal = computed(() => {
    const selectedFilter = this.selectedFilterSignal();
    const invoices = this.invoicesSignal();

    if (!selectedFilter || selectedFilter === "all") {
      return invoices;
    }

    return invoices.filter((invoice) => invoice.status === selectedFilter);
  });

  constructor(private http: HttpClient) { }

  fetchInvoices(): void {
    // return this.http.get<Invoice[]>('https://12990764-7090-4dd0-83c0-a964ec76f4da.mock.pstmn.io/invoices');
    of(invoices)
      .pipe(catchError((error) => {
        console.log(`error fetching invoices: ${error}`);
        return of([]);
      }))
      .subscribe((data: Invoice[]) => {
        this.invoicesSubject.next(data);
        this.setInvoicesSignal(data);
        this.inVoiceCount = data.length;
      })

  }

  setInvoicesSignal(invoices: Invoice[]): void {
    this.invoicesSignal.set(invoices);
  }

  getInvoiceSubjectAsObservable() {
    return this.invoicesSubject.asObservable();
  }

  getInvoiceCount() {
    return this.inVoiceCount;
  }

  // Filter signal methods 
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
