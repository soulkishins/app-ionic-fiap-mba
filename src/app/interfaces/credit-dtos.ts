export enum REQUEST_RESULT {
  SUCCESS,
  PARTIAL,
  NOT_FOUND,
  ERROR
}

export class Contract {
  type: 'ENCUMBRANCE' | 'DISPOSAL';
	protocol: string;
	banners: string;
	acquirers: string;
	beginDate: Date;
	endDate: Date;
	contractValue: number;
	discountValue: number;
	netValue: number;
	tax: number;
	receivables: Receivable[];
}

export class AccessRequest {
  id: number;
	banner: string;
	acquirer: string;
}

export class OptIn {
  participant: number;
	banners: string[];
	acquirers: string[];
}

export class OptInFilter {
	banners: string[];
	acquirers: string[];
}

export class ParticipantReceivable {
  paymentDate: Date;
	receivableValue: number;
	blockValue: number;
	freeValue: number;
}

export class PaymentCalendar {
  calendar: {[date: string]: PaymentDetail};
	tax: number;
	value: number;
	discount: number;
	netValue: number;
}

export class PaymentDetail {
  receivableValue: number;
	blockValue: number;
	freeValue: number;
}

export class PreContract {
  type: 'ENGRAVE' | 'DISPOSAL';
	protocol: string;
	banners: string;
	acquirers: string;
	beginDate: Date;
	endDate: Date;
	contractValue: number;
	discountValue: number;
	netValue: number;
	tax: number;
	receivables: Receivable[];
}

export class Receivable {
  protocol: string;
	state: 'PENDING' | 'DUE' | 'PAID';
	receivableDate: Date;
	effectiveDate: Date;
	receivableValue: number;
	discountValue: number;
	netValue: number;
}
