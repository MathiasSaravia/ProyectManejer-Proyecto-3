import { Request, Response } from "express";
import { errorResponse, generateJWT, generateTokenRandom } from "../helpers";
import createError from "http-errors";
import User from "../models/User";
import { compare } from "bcryptjs";



export const register = async (req: Request, res: Response) => {
    try {

        const { email, password, name } = req.body;

        if (!email || !password || !name) throw createError('Todos los campos son obligatorios');
        if ([email, password, name].includes(''))throw createError('Todos los campos son obligatorios');

        let user = await User.findOne({ email });
        if (user) throw createError('El usuario ya existe');

        user = new User(req.body);
        user.token = generateTokenRandom();
        const userStore = await user.save()

        return res.status(201).json({
            ok: true,
            msg: 'Usuario Registrado',
            data : userStore
        })
    } catch (error: unknown) {

        errorResponse(res, error, "REGISTER")

    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw createError('Todos los campos son obligatorios');

        let user = await User.findOne({ email });

        if (!user) throw createError('El usuario no existe');
        if (!user.checked) throw createError('Tu cuenta no ha sido verificada');
        if (!(await compare(password , user.password))) throw createError('La contraseña es incorrecta');

        return res.status(200).json({
            ok: true,
            msg: 'Usuario Logueado',
            user: {
                nombre: user.name,
                email: user.email ,
                token: generateJWT({ id: user._id })
            }
        })
    } catch (error) {

        errorResponse(res, error, "LOGIN")

    }
}
export const checked = async (req: Request, res: Response) => {
    try {

        return res.status(201).json({
            ok: true,
            msg: 'Usuario Chequeado'
        })
    } catch (error) {

        errorResponse(res, error, "CHECKED")

    }
}
export const sendToken = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            ok: true,
            msg: 'Token enviado'
        })
    } catch (error) {

        errorResponse(res, error, "SEND-TOKEN")

    }
}
export const verifyToken = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            ok: true,
            msg: 'Token verificado'
        })
    } catch (error) {

        errorResponse(res, error, "VERIFY-TOKEN")

    }
}
export const changePassword = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            ok: true,
            msg: 'Password actualizado'
        })
    } catch (error) {

        errorResponse(res, error, "CHANGE-PASSWORD")

    }
}