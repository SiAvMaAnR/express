import BaseController from './baseController';
import { NextFunction, Request, Response } from 'express';
import JWT from '../helpers/jwt';
import AccountService from '../services/accountService';
import IAccountService from '../services/interfaces/IAccountService';
import Status from './enums/status';
import { nextTick } from 'process';

class AccountController extends BaseController {
  private accountService: IAccountService = new AccountService();

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const login = req.body.login;
      const password = req.body.password;

      const user = await this.accountService.getUserByLogin(login);

      if (!user) {
        throw {
          status: Status.NotFound,
          message: 'User not found!'
        };
      }

      if (user?.password !== password) {
        throw {
          status: Status.BadRequest,
          message: 'Invalid password!'
        };
      }

      return res.status(Status.Ok).json({
        type: 'Bearer',
        token: JWT.generateToken({
          id: user.id,
          login: login
        })
      });
    } catch (err) {
      next(err);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const login = req.body.login;
      const password = req.body.password;

      if (!login || !password) {
        throw {
          message: 'Incorrect login or password!'
        };
      }

      const user = await this.accountService.getUserByLogin(login);

      if (user) {
        throw {
          message: 'User already exists!'
        };
      }

      if (!/^[a-zA-Z0-9]{6,25}$/.test(login)) {
        throw {
          message: 'Incorrect login!'
        };
      }

      if (!/^[a-zA-Z0-9]{6,20}$/.test(password)) {
        throw {
          message: 'Incorrect password!'
        };
      }

      const newUser = await this.accountService.createUser({
        login,
        password
      });

      return res.status(Status.Ok).json({
        data: newUser,
        message: 'Success!'
      });
    } catch (err) {
      next(err);
    }
  }

  public async info(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(Status.Ok).json({
        data: req['user'],
        message: 'Success!'
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AccountController;
