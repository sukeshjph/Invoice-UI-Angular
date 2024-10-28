import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Filter {
    key: string;
    value: string;
}

@Component({
    selector: 'app-invoice-header',
    standalone: true,
    imports: [
        CommonModule, DropdownModule, ReactiveFormsModule
    ],
    templateUrl: './invoiceHeader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceHeaderComponent implements OnInit {
    formGroup: FormGroup | undefined;
    @Output() onFilterChange = new EventEmitter<string>();

    filters: Filter[] = [
        { key: "All", value: "all" },
        { key: "Paid", value: "paid" },
        { key: "Pending", value: "pending" },
        { key: "Draft", value: "draft" }
    ];

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            selectedFilter: new FormControl<Filter | null>(null),
        });

        this.formGroup.get('selectedFilter')?.valueChanges.subscribe((selectedFilter: string) => {
            this.onFilterChange.emit(selectedFilter);
        });
    }

    onFilterEventChange(selectedFilter: Event): void {
        this.onFilterChange.emit((selectedFilter.target as HTMLInputElement).value);
    }

}
