type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * 'applications' table schema
 */
export interface Application {
  applicant_id: string;
  created_at: string | Date;
  full_name: string;
  graduation_year: string;
  major: string;
  university: string;
  phone_number?: string;
  diet: string;
  student_id: string;
  email: string | "none";
  status?: Status; // this is an relation expansion
}

/**
 * 'status' table schema
 */
export interface Status {
  applicant_id: string;
  status: statusEnum;
  note: string;
  checked_in: boolean;
  created_at: string | Date;
  modified_at: string | Date;
}

/**
 * Application w/ status used in admin panel
 */
export interface StatusApplication extends Status {
  applications: Application; // relation expansion
}
export enum statusEnum {
  APPLIED = "applied",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  WAITLISTED = "waitlisted",
  CANCELLED = "cancelled",
}
