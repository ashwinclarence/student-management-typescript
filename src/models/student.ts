
export type Student = {
    rollNumber: number;
    name: string;
    age: number;
    standard: string;
}

export type UpdateStudentDetails = {
    age?: number;
    standard?: string;
}