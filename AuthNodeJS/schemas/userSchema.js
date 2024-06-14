import { z } from 'zod';

export const userSchema = z.object({
	_id: z.string().min(1),
	username: z.string().min(3),
	password: z.string().min(8),
});
