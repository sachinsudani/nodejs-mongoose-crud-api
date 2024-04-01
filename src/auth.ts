import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './models/User';
import passport from 'passport';
import { JwtPayload } from 'jsonwebtoken';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || 'secret',
};

export default () => {
	passport.use(
		new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
			try {
				const user = await User.findById(jwt_payload.user.id);
				console.log(user);
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			} catch (error) {
				console.error(error);
			}
		})
	);
};
