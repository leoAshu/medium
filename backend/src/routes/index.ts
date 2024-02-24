import zod from 'zod'
import blogRouter from './blog'
import userRouter from './user'

const signupSchema = zod.object({
    name: zod.string().optional(),
    email: zod.string().email(),
    password: zod.string().min(6),
})

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

export { signupSchema, signinSchema, blogRouter, userRouter }
