import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { TokenInterface } from "../helpers";


interface CustomRequest extends Request {
    user:{
        name : string
    }
}

export const checkAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {

        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            req.user = await User.findById((decoded as TokenInterface).id).select(
                "-password -checked -token -createdAt -updatedAt -__v"
            );

        } catch (error) {

            return createHttpError(401, 'Token no válido');

        }
        next();
    }
}