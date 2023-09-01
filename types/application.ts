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
    status?: status // this is an relation expansion
}
interface status {
    applicant_id: string;
    status: "applied" | "accepted" | "rejected" | "waitlisted" | "cancelled";
    note: string
    created_at: string | Date;
    modified_at: string | Date;
}