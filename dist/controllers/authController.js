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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verifyToken = exports.sendToken = exports.checked = exports.login = exports.register = void 0;
const helpers_1 = require("../helpers");
const http_errors_1 = __importDefault(require("http-errors"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = require("bcryptjs");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name)
            throw (0, http_errors_1.default)('Todos los campos son obligatorios');
        if ([email, password, name].includes(''))
            throw (0, http_errors_1.default)('Todos los campos son obligatorios');
        let user = yield User_1.default.findOne({ email });
        if (user)
            throw (0, http_errors_1.default)('El usuario ya existe');
        user = new User_1.default(req.body);
        user.token = (0, helpers_1.generateTokenRandom)();
        const userStore = yield user.save();
        return res.status(201).json({
            ok: true,
            msg: 'Usuario Registrado',
            data: userStore
        });
    }
    catch (error) {
        (0, helpers_1.errorResponse)(res, error, "REGISTER");
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw (0, http_errors_1.default)('Todos los campos son obligatorios');
        let user = yield User_1.default.findOne({ email });
        if (!user)
            throw (0, http_errors_1.default)('El usuario no existe');
        if (!user.checked)
            throw (0, http_errors_1.default)('Tu cuenta no ha sido verificada');
        if (!(yield (0, bcryptjs_1.compare)(password, user.password)))
            throw (0, http_errors_1.default)('La contraseña es incorrecta');
        return res.status(200).json({
            ok: true,
            msg: 'Usuario Logueado',
            user: {
                nombre: user.name,
                email: user.email,
                token: (0, helpers_1.generateJWT)({ id: user._id })
            }
        });
    }
    catch (error) {
        (0, helpers_1.errorResponse)(res, error, "LOGIN");
    }
});
exports.login = login;
const checked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token)
            throw (0, http_errors_1.default)('No hay token');
        const user = yield User_1.default.findById(token);
        if (!user)
            throw (0, http_errors_1.default)('Token no valido');
        user.checked = true;
        user.token = '';
        yield user.save();
        return res.status(201).json({
            ok: true,
            msg: 'Registro compleatado exitosamente'
        });
    }
    catch (error) {
        (0, helpers_1.errorResponse)(res, error, "CHECKED");
    }
});
exports.checked = checked;
const sendToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            throw (0, http_errors_1.default)(400, 'Se requiere email');
        let user = yield User_1.default.findOne({ email });
        if (!user)
            throw (0, http_errors_1.default)(400, 'Email incorrecto');
        user.token = (0, helpers_1.generateTokenRandom)();
        yield user.save();
        return res.status(200).json({
            ok: true,
            msg: 'Se ha enviado un mail con las intrucciones para verificar tu cuenta'
        });
    }
    catch (error) {
        (0, helpers_1.errorResponse)(res, error, "SEND-TOKEN");
    }
});
exports.sendToken = sendToken;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            ok: true,
            msg: 'Token verificado'
        });
    }
    catch (error) {
        (0, helpers_1.errorResponse)(res, error, "VERIFY-TOKEN");
    }
});
exports.verifyToken = verifyToken;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            ok: true,
            msg: 'Password actualizado'
        });
    }
    catch (error) {
        (0, helpers_1.errorResponse)(res, error, "CHANGE-PASSWORD");
    }
});
exports.changePassword = changePassword;
