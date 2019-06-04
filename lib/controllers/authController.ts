import { Request, Response } from "express";
import { UserSchema } from "../models/userModel";
import config from "../../config/config";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const User = mongoose.model("User", UserSchema);

class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      //Check if email and password are set
      let { email, password } = req.body;
      if (!(email || password)) {
        res.status(400).send();
      }

      //Get user from database
      let user;
      user = await User.find({ email: req.body.email });

      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }

      //Check if encrypted password match
      if (!bcrypt.compareSync(password, user[0].password)) {
        return res.status(401).send("Email ou sennha incorretos");
      }

      let token = AuthController.generateJWT(user[0]);

      //Send the jwt in the response
      return res.send({
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        admin: user[0].admin,
        token: token
      });
    } catch (error) {
      return res
        .status(500)
        .send("Erro ao processar solicitação. Tente novamente");
    }
  };

  static generateJWT(user) {
    //Sing JWT, valid for 1 hour
    return jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: "1h"
    });
  }
}
export default AuthController;
