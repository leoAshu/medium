import zod from 'zod'
import v1Router from './v1'

const signupSchema = zod.object({
    name: zod.string().optional(),
    email: zod.string().email(),
    password: zod.string().min(6)
})

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

export { v1Router, signupSchema, signinSchema }
