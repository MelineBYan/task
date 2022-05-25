/* eslint-disable import/prefer-default-export */
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import {  underscoreId } from './config';
import  User  from '../db/models/user';
import { UserData } from '../core/models/userModel';

export const applyPassportStrategy = passport => {
  const options = {} as StrategyOptions;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_KEY;
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ email: payload.email }, (err:Error, user: UserData) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, new UserData(
              user[underscoreId],
              user.email,
          ))
        }
        return done(null, false);
      });
    })
  );
};
