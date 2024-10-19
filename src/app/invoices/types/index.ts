interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address,
  clientAddress: Address,
  items: InvoiceItem[],
  total: number;
}

export type InvoiceTable = Pick<Invoice, "id" | "paymentDue" | "clientName" | "status" | "total">
