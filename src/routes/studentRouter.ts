
import { Router } from "express";
import { addStudent,renderStudents,removeStudent,searchStudent,updateStudent } from "../controllers/studentController";
const router = Router();

router.get('/',renderStudents);
router.post('/',addStudent);
router.delete('/remove-student/:id',removeStudent);
router.get('/search',searchStudent);
router.put('/update-student/:id',updateStudent);

export default router;