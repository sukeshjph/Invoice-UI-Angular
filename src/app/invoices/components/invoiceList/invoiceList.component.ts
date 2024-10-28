import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Invoice } from '../../types';


@Component({
    selector: 'app-invoice-list',
    standalone: true,
    imports: [
        CommonModule, TableModule
    ],
    templateUrl: './invoiceList.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent {
    @Input() invoices: Invoice[] = [];

    getStatusBgClass(status: string) {
        return {
            'bg-lime-100': status === 'paid',
            'bg-amber-100': status === 'pending',
            'bg-slate-100': status === 'draft',
        };
    }

    getStatusTextClass = (status: string) => {
        return {
            paid: 'text-lime-700',
            pending: 'text-amber-700',
            draft: 'text-slate-700'
        }[status];
    }

    getStatusBulletClass = (status: string) => {
        return {
            paid: 'bg-lime-700',
            pending: 'bg-amber-700',
            draft: 'bg-slate-700'
        }[status];
    }

    getFormattedDate = (dateString: string) => {
        const date = new Date(dateString);

        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(date);

        return formattedDate;
    }

    getTransformedColumnValue(colName: string, colValue: string) {
        let updatedColValue = '';
        switch (colName) {
            case "id":
                updatedColValue = `#${colValue}`;
                break;
            case "paymentDue":
                updatedColValue = this.getFormattedDate(colValue);
                break;

            case "status":
                updatedColValue = `${colValue.slice(0, 1).toUpperCase()}${colValue.slice(1)}`;
                break;

            default:
                break;
        }

        return updatedColValue;
    }
}
