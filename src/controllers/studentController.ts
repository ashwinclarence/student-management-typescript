import { Request, Response } from "express";
import { Student,UpdateStudentDetails } from "../models/student";
import { StudentClass } from "../services/studentService";


const studentObject = new StudentClass();


// list the student details
export const renderStudents = (req: Request, res: Response) => {
    
    try {
        const studentDetails = studentObject.listStudent();
    
        res.json(studentDetails)
    } catch (error) {
    return res.status(500).json({error})

    }
}

// add student
export const addStudent = (req: Request, res: Response) => {
    
    try {
        const newStudent: Student = req.body;
    
        if (!newStudent.rollNumber || !newStudent.name || !newStudent.age || !newStudent.standard) {
            return res.status(400).send("Student must have name, rollNumber, age, department");
        }
    
        let addStudentResult:boolean=studentObject.addStudent(newStudent);
    
        if (addStudentResult) {
            return res.status(200).json({ status:true, message: `Student added with roll number ${newStudent.rollNumber}` })
        } else {
            return res.status(404).json({ status:false, message: `Student with roll number ${newStudent.rollNumber} already exist` });
        }
    } catch (error) {
        return res.status(500).json({error})
    }

}


// delete student
export const removeStudent = (req: Request, res: Response) => {
    
    try {
        let removedStudentID: number = Number(req.params.id);
        
        let removedStatus: boolean = studentObject.removeStudent(removedStudentID);
        
        if (removedStatus) {
            return res.status(200).json({ status:true, message: `Student with roll number ${removedStudentID} removed from the register` })
        } else {
            return res.status(404).json({ status:false, message: `Student with roll number ${removedStudentID} is not present in the register to remove` });
        }
    } catch (error) {
    return res.status(500).json({error})

    }
}

// search student
export const searchStudent = (req: Request, res: Response) => {
    try {
        const searchQuery: string = req.query.search as string;
        
        if (!searchQuery) {
            return res.status(400).json({ status:false, message: "Search query is required" });
        }
        
        console.log("Search Query:", searchQuery);
        
        const searchResult = studentObject.searchStudent(searchQuery);
        
        if (searchResult.length > 0) {
            return res.status(200).json(searchResult);
        } else {
            return res.status(404).json({ status:false, message: "No students found matching the query" });
        }
    } catch (error) {
    return res.status(500).json({error})
;
    }
}




//update the student details
export const updateStudent = (req: Request, res: Response) => {
    
    try {
        
        const rollNumber: number = Number(req.params.id);
        
        let {age, standard }: UpdateStudentDetails = req.body;
        
        let updateStatus: boolean = studentObject.updateStudent(rollNumber, age, standard);
        
        if (updateStatus) {
            return res.status(200).json({ status:true, message: `Student with roll number ${rollNumber} updated the record` })
        } else {
            return res.status(404).json({status:false, message: `Student with roll number ${rollNumber} cannot update the record` });
            
        }
        
    } catch (error) {
    return res.status(500).json({error})

    }
}

