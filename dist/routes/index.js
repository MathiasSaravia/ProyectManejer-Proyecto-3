"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const taskController_1 = require("../controllers/taskController");
const usersController_1 = require("../controllers/usersController");
const projectController_1 = require("../controllers/projectController");
const router = (0, express_1.Router)();
/* AUTH */
router
    .post('/register', authController_1.register)
    .post('/login', authController_1.login)
    .get('/checked', authController_1.checked)
    .post('/send-token', authController_1.sendToken)
    .route('/reset-password')
    .get(authController_1.verifyToken)
    .post(authController_1.changePassword);
/* PROYECTOS */
router
    .route('/projects')
    .get(projectController_1.projectsList)
    .post(projectController_1.projectStore);
router
    .route('/projects/:id')
    .get(projectController_1.proejectDetail)
    .put(projectController_1.projectUpdate)
    .delete(projectController_1.projectRemove);
router
    .get('/collaborator', projectController_1.collaboratorAdd)
    .delete('/collaborator', projectController_1.collaboratorRemove);
/* TAREAS */
router
    .route('/tasks')
    .get(taskController_1.tasksList)
    .post(taskController_1.taskStore);
router
    .route('/tasks/:id')
    .get(taskController_1.taskDetail)
    .put(taskController_1.taskUpdate)
    .delete(taskController_1.taskRemove);
router
    .post('/tast/:id/change-state', taskController_1.taskChangeState);
/* USUARIOS */
router
    .get('/', usersController_1.profile);
exports.default = router;
