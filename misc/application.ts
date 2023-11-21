type Modify<T, R> = Omit<T, keyof R> & R;

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
    email: string;
    status?: status // this is an relation expansion
}
export interface status {
    applicant_id: string;
    status: statusEnum;
    note: string
    created_at: string | Date;
    modified_at: string | Date;
}

export type ApplicationWithStatus = Modify<Application, {
    status: statusEnum
    applications: Application
}>

export enum statusEnum {
    APPLIED = "applied",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    WAITLISTED = "waitlisted",
    CANCELLED = "cancelled"
}