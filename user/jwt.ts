import passportJwt from 'passport-jwt';
import passport from 'passport';
import { User } from './model';
import { JWT_SECRET_KEY } from '../enviroment';

export const jwtStrategy = () => {

    const opts = {
        jwtFromRequest: '',
        secretOrKey: ''
    }
    opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = JWT_SECRET_KEY;
    passport.use(new passportJwt.Strategy(opts, (payload, done) => {
        User.findOne({ _id: payload.id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
