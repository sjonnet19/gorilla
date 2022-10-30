"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path = __importStar(require("path"));
var repository_1 = require("./repository");
var multer = require("multer");
var cors = require("cors");
var app = (0, express_1.default)();
app.use(cors());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var PORT, repository;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    PORT = 9000;
                    repository = new repository_1.Repository();
                    return [4 /*yield*/, repository.init()];
                case 1:
                    _a.sent();
                    app.use(express_1.default.static(path.resolve(__dirname, "../html")));
                    // JSON form data
                    app.use(body_parser_1.default.json());
                    // application/xwww
                    app.use(body_parser_1.default.urlencoded({ extended: true }));
                    // multipart/form-data
                    app.use(multer().array());
                    app.use(express_1.default.static("public"));
                    /* Students */
                    app.get("/api/students", function (_, res) { return __awaiter(_this, void 0, void 0, function () {
                        var students, ex_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('students:_', _);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, repository.getStudents()];
                                case 2:
                                    students = _a.sent();
                                    console.log('students:students', students);
                                    res.status(200);
                                    res.contentType("json");
                                    res.send(JSON.stringify(students));
                                    return [3 /*break*/, 4];
                                case 3:
                                    ex_1 = _a.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_1));
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/api/students/:studentId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var student, ex_2;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, repository.getStudent((_a = req.params) === null || _a === void 0 ? void 0 : _a.studentId)];
                                case 1:
                                    student = _b.sent();
                                    if (!student) {
                                        res.sendStatus(404);
                                    }
                                    else {
                                        res.status(200);
                                        res.contentType("json");
                                        res.send(JSON.stringify(student));
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    ex_2 = _b.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_2));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/api/students", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var student, studentId, ex_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    console.log("Body: " + JSON.stringify(req.body));
                                    student = {
                                        id: -1,
                                        name: req.body.name,
                                    };
                                    return [4 /*yield*/, repository.addStudent(student.name)];
                                case 1:
                                    studentId = _a.sent();
                                    student.id = studentId;
                                    res.status(200);
                                    res.contentType("json");
                                    res.send(JSON.stringify(student));
                                    return [3 /*break*/, 3];
                                case 2:
                                    ex_3 = _a.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_3));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    /* Classrooms */
                    app.get("/api/classrooms", function (_, res) { return __awaiter(_this, void 0, void 0, function () {
                        var classrooms, ex_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, repository.getClassrooms()];
                                case 1:
                                    classrooms = _a.sent();
                                    res.status(200);
                                    res.contentType("json");
                                    res.send(JSON.stringify(classrooms));
                                    return [3 /*break*/, 3];
                                case 2:
                                    ex_4 = _a.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_4));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/api/classrooms/:classroomId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var classroom, ex_5;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, repository.getClassroom((_a = req.params) === null || _a === void 0 ? void 0 : _a.classroomId)];
                                case 1:
                                    classroom = _b.sent();
                                    if (!classroom) {
                                        res.sendStatus(404);
                                    }
                                    else {
                                        res.status(200);
                                        res.contentType("json");
                                        res.send(JSON.stringify(classroom));
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    ex_5 = _b.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_5));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/api/classrooms", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var classroom, classroomId, ex_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    classroom = {
                                        id: -1,
                                        classroomName: req.body.classroomName,
                                        instructorName: req.body.instructorName,
                                    };
                                    return [4 /*yield*/, repository.addClassroom(classroom)];
                                case 1:
                                    classroomId = _a.sent();
                                    classroom.id = classroomId;
                                    res.status(200);
                                    res.contentType("json");
                                    res.send(JSON.stringify(classroom));
                                    return [3 /*break*/, 3];
                                case 2:
                                    ex_6 = _a.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_6));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get("/api/classrooms/:classroomId/students", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var classroomId, classroom, students, ex_7;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 5, , 6]);
                                    classroomId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.classroomId;
                                    return [4 /*yield*/, repository.getClassroom(classroomId)];
                                case 1:
                                    classroom = _b.sent();
                                    if (!!classroom) return [3 /*break*/, 2];
                                    res.sendStatus(404);
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, repository.getClassroomStudents(classroomId)];
                                case 3:
                                    students = _b.sent();
                                    res.status(200);
                                    res.contentType("json");
                                    res.send(JSON.stringify(students));
                                    _b.label = 4;
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    ex_7 = _b.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_7));
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post("/api/assignstudent", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var classroomStudentId, ex_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, repository.assignStudentToClassroom(req.body.studentId, req.body.classroomId)];
                                case 1:
                                    classroomStudentId = _a.sent();
                                    res.status(200);
                                    res.contentType("json");
                                    res.send(JSON.stringify(classroomStudentId >= 0));
                                    return [3 /*break*/, 3];
                                case 2:
                                    ex_8 = _a.sent();
                                    res.status(500);
                                    res.contentType("html");
                                    res.send(JSON.stringify(ex_8));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    console.log("back-end services listening on port 9000 serving API Documentation from ".concat(path.resolve(__dirname, "../html")));
                    app.listen(PORT, function () { });
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=index.js.map