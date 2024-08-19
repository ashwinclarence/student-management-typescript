import { Student } from "../models/student";
import studentDetails from '../studentDetails.json'

export class StudentClass{

    private register: Student[] = [];
    
    constructor() {
        studentDetails.forEach((student) => {
            this.addStudent(student)
        })
    }

    // method to add new student;
    addStudent(student: Student):boolean {
        // check student already exist
        if (!this.register.find(ele => ele.rollNumber === student.rollNumber)) {
            this.register.push(student); 
            console.log("New Student added", student.name);
            return true;
        } else {
            console.log(`Student exist ${student.name}`);
            return false;
        }
    }


    // method to list the students;
    listStudent(){
        return this.register;
    }


    // method to remove the student;
    removeStudent(id: number):boolean {
        const lengthBeforeRemoving = this.register.length;

        this.register= this.register.filter((ele) => {
            if (ele.rollNumber !== id) {
                return ele;
            }
        })

        if (this.register.length < lengthBeforeRemoving) {
            console.log(`Student removed with roll number ${id}`)
            return true;
        } else {
            console.log(`Cannot find the student with roll number ${id}`);
            return false;
        }
    }

    // method to search the student;
    searchStudent(search: string) {

        const regex = new RegExp(search, 'i'); 

        let searchResult = this.register.filter((ele) => {
            return regex.test(ele.name) || regex.test(ele.rollNumber.toString());
        });

        if (searchResult.length > 0) {
            return searchResult;
        } else {
            return [];
        }
    }

    
    // update the student;
    updateStudent(id: number, newAge?: number, standard?: string): boolean {
        
        for (const ele of this.register) {
            if (ele.rollNumber === id) {

                if (newAge !== undefined) {
                    ele.age = newAge;
                } 

                if (standard !== undefined) {
                    ele.standard = standard;
                }
                return true;
            }
        }
        return false;
    }
}