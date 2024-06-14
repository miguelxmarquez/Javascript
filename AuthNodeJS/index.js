import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { UserRepository } from './repositories/userRepository.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
// SERVER CREATION
const app = express();

// VIEW ENGINE
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

// MIDDLEWARE: GET AND VERIFY JWT, SESSION CREATION
app.use((req, res, next) => {
	const token = req.cookies.access_token;
	req.session = { user: null };

	try {
		const data = jwt.verify(token, SECRET_JWT_KEY);
		req.session.user = data;
	} catch (error) {
		req.session.user = null;
	}
	next();
});

// ROUTES
app.get('/', (req, res) => {
	const { user } = req.session;
	res.render('home', user);
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await UserRepository.login({ username, password });
		const token = jwt.sign(
			{
				_id: user._id,
				username: username,
			},
			SECRET_JWT_KEY,
			{
				expiresIn: '1h',
			},
		);
		res.cookie('access_token', token, {
			httpOnly: true, // only server request
			secure: process.env.NODE_ENV === 'production', // https only on production
			sameSite: true,
			maxAge: 1000 * 60 * 60, // 1 hour
			// maxAge: 3600 * 24 * 60 // 24 hours
		}).send({ user, token });
	} catch (error) {
		res.status(401).send(error.message);
	}
});

app.post('/register', async (req, res) => {
	const { username, password } = req.body;
	try {
		const id = await UserRepository.create({ username, password });
		res.send({ id });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

app.post('/logout', (req, res) => {
	res.clearCookie('access_token').json({ message: 'Logout successfully' });
});

app.get('/protected', (req, res) => {
	const { user } = req.session;
	if (!user) res.render('error', { message: 'Ruta Protegida' });
	res.render('protected', user);
});

// SERVER RUNNING
app.listen(PORT, (req, res) => {
	console.log('Server running on port ' + PORT);
});
