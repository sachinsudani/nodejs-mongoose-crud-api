import { Strategy as JwtStrategy, ExtractJwt, Strategy } from 'passport-jwt';
import User from './models/User';
import passport from 'passport';
import { JwtPayload } from 'jsonwebtoken';

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || 'secret',
};

export default () => {
	passport.use(
		new JwtStrategy(jwtOptions, async (jwt_payload: JwtPayload, done) => {
			try {
				const user = await User.findById(jwt_payload.user.id);
				if (user) return done(null, user);
				return done(null, false);
			} catch (error) {
				console.error(error);
			}
		})
	);
};
