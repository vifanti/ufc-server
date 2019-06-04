import { Request, Response } from "express";
import { UserSchema } from "../models/userModel";
import * as mongoose from "mongoose";
import AuthController from "./authController";

const User = mongoose.model("User", UserSchema);

export class UserController {
  public getUsers(req: Request, res: Response) {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  public searchUsers(req: Request, res: Response) {
    var query = null;

    if (req.query.name !== undefined) {
      //regex permite o uso de expressões regulares. i retira a propriedade de case sensitive
      query = { name: { $regex: req.query.name, $options: "i" } };
    }

    User.find(query, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  public addNewUser(req: Request, res: Response) {
    let newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.send(err);
      }
      let usuario = user.toJSON();
      res.send({
        id: usuario["_id"],
        email: usuario["email"],
        name: usuario["name"],
        admin: usuario["admin"],
        token: AuthController.generateJWT(user)
      });
    });
  }

  static getUserComID = (req: Request, res: Response) => {
    User.findById(
      req.params.userId,
      { projection: { password: 0 } },
      (err, user) => {
        if (err) {
          res.send(err);
        }
        res.json(user);
      }
    );
  };
}

export default UserController;
