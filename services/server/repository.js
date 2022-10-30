"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var sqlite3_1 = require("sqlite3");
var Repository = /** @class */ (function () {
    function Repository() {
        this.db = null;
        this.openConnection();
    }
    /* Connections */
    Repository.prototype.openConnection = function () {
        if (this.db == null) {
            this.db = new sqlite3_1.Database(":memory:", function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Connected to the in-memory SQLite database.");
            });
        }
        return this.db;
    };
    Repository.prototype.closeConnection = function () {
        if (this.db != null) {
            this.db.close(function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Close the database connection.");
            });
            this.db = null;
        }
    };
    Repository.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var studentsPromise, classroomsPromise, studentsToClassroomPromise, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        studentsPromise = new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            _this.db.run("CREATE TABLE Students (id INTEGER PRIMARY KEY, name STRING)", function (err) {
                                if (err)
                                    reject(err.message);
                                resolve(true);
                            });
                        });
                        classroomsPromise = new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            _this.db.run("CREATE TABLE Classrooms (id INTEGER PRIMARY KEY, classroomName STRING, instructorName STRING)", function (err) {
                                if (err)
                                    reject(err.message);
                                resolve(true);
                            });
                        });
                        studentsToClassroomPromise = new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            _this.db.run("CREATE TABLE StudentsToClassroom (id INTEGER PRIMARY KEY, studentId int, classroomId int)", function (err) {
                                if (err)
                                    reject(err.message);
                                resolve(true);
                            });
                        });
                        return [4 /*yield*/, studentsPromise];
                    case 1:
                        _b = (_c.sent());
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, classroomsPromise];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        _a = _b;
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, studentsToClassroomPromise];
                    case 4:
                        _a = (_c.sent());
                        _c.label = 5;
                    case 5: return [2 /*return*/, (_a)];
                }
            });
        });
    };
    /* Students */
    Repository.prototype.addStudent = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            console.log("Inserting Student ".concat(name));
            _this.db.run("INSERT INTO Students(name) VALUES('".concat(name, "')"), function (err) {
                if (err) {
                    console.log("Error inserting student: " + err.message);
                    reject(err.message);
                }
                resolve(this.lastID);
            });
        });
    };
    Repository.prototype.removeStudent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            console.log("Removing Student ".concat(JSON.stringify(id)));
                            _this.db.run("DELETE FROM Students WHERE id = ".concat(id), function (err) {
                                if (err)
                                    reject(err.message);
                                console.log("Rows Deleted ".concat(this.changes));
                                resolve(true);
                            });
                        })];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.removeStudentFromClassrooms(id)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3: return [2 /*return*/, (_a)];
                }
            });
        });
    };
    Repository.prototype.getStudents = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            _this.db.all("SELECT * FROM Students", function (err, rows) {
                if (err)
                    reject(err.message);
                console.log(JSON.stringify(rows));
                resolve(rows);
            });
        });
    };
    Repository.prototype.getStudent = function (studentId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            _this.db.get("SELECT * FROM Students WHERE id = ".concat(studentId), function (err, row) {
                if (err)
                    reject(err.message);
                console.log(JSON.stringify(row));
                resolve(row);
            });
        });
    };
    /* Classrooms */
    Repository.prototype.addClassroom = function (classroom) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            console.log("Inserting Classroom ".concat(JSON.stringify(classroom)));
            _this.db.run("INSERT INTO Classrooms (classroomName, instructorName) VALUES('".concat(classroom.classroomName, "', '").concat(classroom.instructorName, "')"), function (err) {
                if (err)
                    reject(err.message);
                resolve(this.lastID);
            });
        });
    };
    Repository.prototype.removeClassroom = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            console.log("Removing Classroom ".concat(JSON.stringify(id)));
                            _this.db.run("DELETE FROM Classrooms WHERE id = ".concat(id), function (err) {
                                if (err)
                                    reject(err.message);
                                console.log("Rows Deleted ".concat(this.changes));
                                resolve(true);
                            });
                        })];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.removeStudentsFromClassroom(id)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3: return [2 /*return*/, (_a)];
                }
            });
        });
    };
    /* Classrooms */
    Repository.prototype.getClassrooms = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            _this.db.all("SELECT * FROM Classrooms", function (err, rows) {
                if (err)
                    reject(err.message);
                console.log(JSON.stringify(rows));
                resolve(rows);
            });
        });
    };
    Repository.prototype.getClassroom = function (classroomId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            _this.db.get("SELECT * FROM Classrooms WHERE id = ".concat(classroomId), function (err, row) {
                if (err)
                    reject(err.message);
                console.log(JSON.stringify(row));
                resolve(row);
            });
        });
    };
    /* Many To Many Relationships */
    Repository.prototype.assignStudentToClassroom = function (studentId, classroomId) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            _this.db.all("SELECT * FROM StudentsToClassroom WHERE studentId = ".concat(studentId, " AND classroomId = ").concat(classroomId), function (err, rows) {
                                if (err)
                                    reject(err.message);
                                if (rows.length === 0) {
                                    resolve(-1);
                                    return;
                                }
                                console.log("EXISTS! ".concat(rows[0].id));
                                resolve(rows[0].id);
                            });
                        })];
                    case 1:
                        exists = _a.sent();
                        if (exists >= 0) {
                            console.log("EXISTS ".concat(exists));
                            return [2 /*return*/, exists];
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (_this.db == null) {
                                    reject("Database Not Initialized");
                                    return;
                                }
                                console.log("Inserting Student ".concat(studentId, " into Classroom ").concat(classroomId));
                                _this.db.run("INSERT INTO StudentsToClassroom (studentId, classroomId) VALUES('".concat(studentId, "', '").concat(classroomId, "')"), function (err) {
                                    if (err)
                                        reject(err.message);
                                    resolve(this.lastID);
                                });
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Repository.prototype.getStudentClassrooms = function (studentId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            _this.db.all("SELECT * FROM Classrooms JOIN StudentsToClassroom ON Classrooms.id = StudentsToClassroom.classroomId WHERE StudentsToClassroom.studentId = ".concat(studentId), function (err, rows) {
                if (err)
                    reject(err.message);
                console.log(JSON.stringify(rows));
                resolve(rows);
            });
        });
    };
    Repository.prototype.getClassroomStudents = function (classroomId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.db == null) {
                reject("Database Not Initialized");
                return;
            }
            _this.db.all("SELECT * FROM Students JOIN StudentsToClassroom ON Students.id = StudentsToClassroom.studentId WHERE StudentsToClassroom.classroomId = ".concat(classroomId), function (err, rows) {
                if (err)
                    reject(err.message);
                console.log(JSON.stringify(rows));
                resolve(rows);
            });
        });
    };
    Repository.prototype.removeStudentFromClassrooms = function (studentId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            console.log("Removing StudentToClassroom with StudentID ".concat(JSON.stringify(studentId)));
                            _this.db.run("DELETE FROM StudentsToClassroom WHERE studentId = ".concat(studentId), function (err) {
                                if (err)
                                    reject(err.message);
                                console.log("Rows Deleted ".concat(this.changes));
                                resolve(true);
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Repository.prototype.removeStudentsFromClassroom = function (classroomId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (_this.db == null) {
                                reject("Database Not Initialized");
                                return;
                            }
                            console.log("Removing StudentToClassroom with classroomID ".concat(JSON.stringify(classroomId)));
                            _this.db.run("DELETE FROM StudentsToClassroom WHERE classroomId = ".concat(classroomId), function (err) {
                                if (err)
                                    reject(err.message);
                                console.log("Rows Deleted ".concat(this.changes));
                                resolve(true);
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Repository;
}());
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map