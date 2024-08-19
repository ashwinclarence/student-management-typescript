
import express from "express";
import router from "./routes/studentRouter";

const app = express();

const PORT = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',router)

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`);
})