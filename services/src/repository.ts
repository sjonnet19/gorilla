import { Database, RunResult } from "sqlite3";
import { Student, Classroom } from "./models";

export class Repository {
  private db: Database | null = null;

  constructor() {
    this.openConnection();
  }

  /* Connections */
  openConnection(): Database {
    if (this.db == null) {
      this.db = new Database(":memory:", (err: Error | null) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Connected to the in-memory SQLite database.");
      });
    }

    return this.db;
  }

  closeConnection(): void {
    if (this.db != null) {
      this.db.close((err: Error | null) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Close the database connection.");
      });
      this.db = null;
    }
  }

  async init(): Promise<boolean> {
    var studentsPromise = new Promise<boolean>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.run(
        "CREATE TABLE Students (id INTEGER PRIMARY KEY, name STRING)",
        (err: Error | null) => {
          if (err) reject(err.message);
          resolve(true);
        }
      );
    });

    var classroomsPromise = new Promise<boolean>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.run(
        "CREATE TABLE Classrooms (id INTEGER PRIMARY KEY, classroomName STRING, instructorName STRING)",
        (err: Error | null) => {
          if (err) reject(err.message);
          resolve(true);
        }
      );
    });

    var studentsToClassroomPromise = new Promise<boolean>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.run(
        "CREATE TABLE StudentsToClassroom (id INTEGER PRIMARY KEY, studentId int, classroomId int)",
        (err: Error | null) => {
          if (err) reject(err.message);
          resolve(true);
        }
      );
    });

    return (
      (await studentsPromise) &&
      (await classroomsPromise) &&
      (await studentsToClassroomPromise)
    );
  }

  /* Students */
  addStudent(name: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      console.log(`Inserting Student ${name}`);

      this.db.run(
        `INSERT INTO Students(name) VALUES('${name}')`,
        function (this: RunResult, err: Error | null) {
          if (err) {
            console.log("Error inserting student: " + err.message);
            reject(err.message);
          }
          resolve(this.lastID);
        }
      );
    });
  }

  async removeStudent(id: number): Promise<boolean> {
    return (
      (await new Promise<boolean>((resolve, reject) => {
        if (this.db == null) {
          reject("Database Not Initialized");
          return;
        }

        console.log(`Removing Student ${JSON.stringify(id)}`);

        this.db.run(
          `DELETE FROM Students WHERE id = ${id}`,
          function (this: RunResult, err: Error | null) {
            if (err) reject(err.message);

            console.log(`Rows Deleted ${this.changes}`);

            resolve(true);
          }
        );
      })) && (await this.removeStudentFromClassrooms(id))
    );
  }

  getStudents(): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.all(
        `SELECT * FROM Students`,
        (err: Error | null, rows: any[]) => {
          if (err) reject(err.message);

          console.log(JSON.stringify(rows));
          resolve(rows as Student[]);
        }
      );
    });
  }

  getStudent(studentId: number): Promise<Student> {
    return new Promise<Student>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.get(
        `SELECT * FROM Students WHERE id = ${studentId}`,
        (err: Error | null, row: any) => {
          if (err) reject(err.message);

          console.log(JSON.stringify(row));
          resolve(row as Student);
        }
      );
    });
  }

  /* Classrooms */
  addClassroom(classroom: Classroom): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      console.log(`Inserting Classroom ${JSON.stringify(classroom)}`);

      this.db.run(
        `INSERT INTO Classrooms (classroomName, instructorName) VALUES('${classroom.classroomName}', '${classroom.instructorName}')`,

        function (this: RunResult, err: Error | null) {
          if (err) reject(err.message);

          resolve(this.lastID);
        }
      );
    });
  }

  async removeClassroom(id: number): Promise<boolean> {
    return (
      (await new Promise<boolean>((resolve, reject) => {
        if (this.db == null) {
          reject("Database Not Initialized");
          return;
        }

        console.log(`Removing Classroom ${JSON.stringify(id)}`);

        this.db.run(
          `DELETE FROM Classrooms WHERE id = ${id}`,
          function (this: RunResult, err: Error | null) {
            if (err) reject(err.message);

            console.log(`Rows Deleted ${this.changes}`);

            resolve(true);
          }
        );
      })) && (await this.removeStudentsFromClassroom(id))
    );
  }

  /* Classrooms */
  getClassrooms(): Promise<Classroom[]> {
    return new Promise<Classroom[]>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.all(
        `SELECT * FROM Classrooms`,
        (err: Error | null, rows: any[]) => {
          if (err) reject(err.message);

          console.log(JSON.stringify(rows));
          resolve(rows as Classroom[]);
        }
      );
    });
  }

  getClassroom(classroomId: number): Promise<Classroom> {
    return new Promise<Classroom>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.get(
        `SELECT * FROM Classrooms WHERE id = ${classroomId}`,
        (err: Error | null, row: any) => {
          if (err) reject(err.message);

          console.log(JSON.stringify(row));
          resolve(row as Classroom);
        }
      );
    });
  }

  /* Many To Many Relationships */
  async assignStudentToClassroom(
    studentId: number,
    classroomId: number
  ): Promise<Number> {
    var exists = await new Promise<Number>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }
      this.db.all(
        `SELECT * FROM StudentsToClassroom WHERE studentId = ${studentId} AND classroomId = ${classroomId}`,
        (err: Error | null, rows: any[]) => {
          if (err) reject(err.message);

          if (rows.length === 0) {
            resolve(-1);
            return;
          }

          console.log(`EXISTS! ${rows[0].id}`);
          resolve(rows[0].id);
        }
      );
    });

    if (exists >= 0) {
      console.log(`EXISTS ${exists}`);
      return exists;
    }

    return await new Promise<number>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      console.log(
        `Inserting Student ${studentId} into Classroom ${classroomId}`
      );

      this.db.run(
        `INSERT INTO StudentsToClassroom (studentId, classroomId) VALUES('${studentId}', '${classroomId}')`,

        function (this: RunResult, err: Error | null) {
          if (err) reject(err.message);

          resolve(this.lastID);
        }
      );
    });
  }

  getStudentClassrooms(studentId: number): Promise<Classroom[]> {
    return new Promise<Classroom[]>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.all(
        `SELECT * FROM Classrooms JOIN StudentsToClassroom ON Classrooms.id = StudentsToClassroom.classroomId WHERE StudentsToClassroom.studentId = ${studentId}`,
        (err: Error | null, rows: any[]) => {
          if (err) reject(err.message);

          console.log(JSON.stringify(rows));
          resolve(rows as Classroom[]);
        }
      );
    });
  }

  getClassroomStudents(classroomId: number): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      this.db.all(
        `SELECT * FROM Students JOIN StudentsToClassroom ON Students.id = StudentsToClassroom.studentId WHERE StudentsToClassroom.classroomId = ${classroomId}`,
        (err: Error | null, rows: any[]) => {
          if (err) reject(err.message);

          console.log(JSON.stringify(rows));
          resolve(rows as Student[]);
        }
      );
    });
  }

  async removeStudentFromClassrooms(studentId: number): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      console.log(
        `Removing StudentToClassroom with StudentID ${JSON.stringify(
          studentId
        )}`
      );

      this.db.run(
        `DELETE FROM StudentsToClassroom WHERE studentId = ${studentId}`,
        function (this: RunResult, err: Error | null) {
          if (err) reject(err.message);

          console.log(`Rows Deleted ${this.changes}`);

          resolve(true);
        }
      );
    });
  }

  async removeStudentsFromClassroom(classroomId: number): Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
      if (this.db == null) {
        reject("Database Not Initialized");
        return;
      }

      console.log(
        `Removing StudentToClassroom with classroomID ${JSON.stringify(
          classroomId
        )}`
      );

      this.db.run(
        `DELETE FROM StudentsToClassroom WHERE classroomId = ${classroomId}`,
        function (this: RunResult, err: Error | null) {
          if (err) reject(err.message);

          console.log(`Rows Deleted ${this.changes}`);

          resolve(true);
        }
      );
    });
  }
}
