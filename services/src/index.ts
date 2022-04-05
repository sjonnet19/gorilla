import express from "express";
import bodyParser from "body-parser";
import * as path from "path";
import { Student, Classroom } from "./models";
import { Repository } from "./repository";

var multer = require("multer");
var cors = require("cors");

const app = express();
app.use(cors());

async function main() {
  const PORT = 9000;

  const repository = new Repository();
  await repository.init();

  app.use(express.static(path.resolve(__dirname, "../html")));
  // JSON form data
  app.use(bodyParser.json());
  // application/xwww
  app.use(bodyParser.urlencoded({ extended: true }));
  // multipart/form-data
  app.use(multer().array());
  app.use(express.static("public"));

  /* Students */
  app.get("/api/students", async (_, res) => {
    try {
      var students = await repository.getStudents();

      res.status(200);
      res.contentType("json");
      res.send(JSON.stringify(students));
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  app.get("/api/students/:studentId", async (req, res) => {
    try {
      var student = await repository.getStudent(
        req.params?.studentId as unknown as number
      );
      if (!student) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.contentType("json");
        res.send(JSON.stringify(student));
      }
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      console.log("Body: " + JSON.stringify(req.body));
      var student: Student = {
        id: -1,
        name: req.body.name as unknown as string,
      };

      var studentId = await repository.addStudent(student.name);
      student.id = studentId;
      res.status(200);
      res.contentType("json");
      res.send(JSON.stringify(student));
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  /* Classrooms */
  app.get("/api/classrooms", async (_, res) => {
    try {
      var classrooms = await repository.getClassrooms();

      res.status(200);
      res.contentType("json");
      res.send(JSON.stringify(classrooms));
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  app.get("/api/classrooms/:classroomId", async (req, res) => {
    try {
      var classroom = await repository.getClassroom(
        req.params?.classroomId as unknown as number
      );
      if (!classroom) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.contentType("json");
        res.send(JSON.stringify(classroom));
      }
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  app.post("/api/classrooms", async (req, res) => {
    try {
      var classroom: Classroom = {
        id: -1,
        classroomName: req.body.classroomName as unknown as string,
        instructorName: req.body.instructorName as unknown as string,
      };

      var classroomId = await repository.addClassroom(classroom);
      classroom.id = classroomId;
      res.status(200);
      res.contentType("json");
      res.send(JSON.stringify(classroom));
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  app.get("/api/classrooms/:classroomId/students", async (req, res) => {
    try {
      const classroomId = req.params?.classroomId as unknown as number;
      var classroom = await repository.getClassroom(classroomId);
      if (!classroom) {
        res.sendStatus(404);
      } else {
        var students = await repository.getClassroomStudents(classroomId);

        res.status(200);
        res.contentType("json");
        res.send(JSON.stringify(students));
      }
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  app.post("/api/assignstudent", async (req, res) => {
    try {
      var classroomStudentId = await repository.assignStudentToClassroom(
        req.body.studentId as unknown as number,
        req.body.classroomId as unknown as number
      );

      res.status(200);
      res.contentType("json");
      res.send(JSON.stringify(classroomStudentId >= 0));
    } catch (ex) {
      res.status(500);
      res.contentType("html");
      res.send(JSON.stringify(ex));
    }
  });

  console.log(
    `back-end services listening on port 9000 serving API Documentation from ${path.resolve(
      __dirname,
      "../html"
    )}`
  );

  app.listen(PORT, () => {});
}

main();
