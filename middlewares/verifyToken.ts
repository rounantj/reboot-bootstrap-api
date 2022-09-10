import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserRepository from "../modules/user/user-repository";
import fs from "fs";

const userRepository: UserRepository = new UserRepository(new PrismaClient());

let config = fs.readFileSync("reboot.config.json");
const env = JSON.parse(config.toString());

export interface Token extends JwtPayload {
  payload: string;
}

export async function verifyToken(
  request: any,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    const decodedToken: any = jwt.verify(token, `${env.jwtSecret}`);
    request.user = await userRepository.getByEmail(`${decodedToken.payload}`);
    next();
  } catch (error) {
    response.status(401).json({ ok: false });
  }
}
