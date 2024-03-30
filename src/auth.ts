import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import User from './models/User';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || 'secret',
};

export default (passport: PassportStatic) => {
	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			try {
				const user = await User.findById(jwt_payload.user.id);
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
