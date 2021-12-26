export interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	singapore: boolean;
	copenhagen: boolean;
	dietaryReq: string;
	other: string;
}

export interface RsvpListValues extends FormValues {
	id: string;
	createdAt: number;
}

export interface RsvpEdits {
	[id: string]: Partial<FormValues>;
}
