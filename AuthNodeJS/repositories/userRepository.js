import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

import { userSchema } from '../schemas/userSchema.js'
import { loginSchema } from '../schemas/loginSchema.js'
import { SALT_ROUNDS } from '../config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
	_id: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
})

export class ValidationError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ValidationError'
		this.class = 'danger'
		this.message = {
			message: message,
		}
	}
}

export class Validation {
	static register(id, username, password) {
		// Request validation
		try {
			userSchema.parse({ _id: id, username, password })
		} catch (error) {
			throw new ValidationError(error.issues[0].message + ' on ' + error.issues[0].path)
		}
		// Unique User Validations
		const user = User.findOne({ username })
		if (user) {
			throw new ValidationError(`El usuario ya existe..!`)
		}
	}
	static login(username, password) {
		// Request validation
		try {
			loginSchema.parse({ username, password })
		} catch (error) {
			throw new ValidationError(error.issues[0].message + ' on ' + error.issues[0].path)
		}
	}
}

export class UserRepository {
	// STATICS
	static async create({ username, password }) {
		// 1. User Create Validations
		const id = crypto.randomUUID()
		Validation.register(id, username, password)
		// 2. Password Hashing
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
		// 3. User Creation
		User.create({
			_id: id,
			username,
			password: hashedPassword,
		}).save()

		return id
	}

	static async login({ username, password }) {
		// 1. User Login Validations
		Validation.login(username, password)

		// 2. User Searching
		const user = User.findOne({ username })
		if (!user) {
			throw new ValidationError('El usuario no existe')
		}
		// 3. Password Validation
		const isValid = await bcrypt.compare(password, user.password)
		if (!isValid) throw new ValidationError('Invalid Password')

		return {
			_id: user._id,
			username: user.username,
		}
	}
}
