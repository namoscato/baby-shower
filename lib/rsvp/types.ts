export enum SheetColumn {
  Token = "Token",
  Name = "Name",
  Address = "Address",
  Attending = "Attending",
  AdditionalNotes = "Additional Notes",
  SubmittedAt = "Submitted At",
}

export interface RsvpSubmission {
  token?: string;
  name: string;
  address: string;
  attending: boolean;
  additionalNotes: string;
}

export interface RsvpResponse extends Omit<RsvpSubmission, "attending"> {
  token: string;
  attending?: boolean;
  submittedAt?: Date;
}
