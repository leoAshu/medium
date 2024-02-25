import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { getPrismaClient } from '../db'
import { signinInput, signupInput } from '@ashu_leo/common'

const userRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string
        DATABASE_URL: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const result = signupInput.safeParse(await c.req.json())

    if (!result.success) {
        return c.json({
            errorField: result.error.issues[0].path[0],
            errorMessage: result.error.issues[0].message,
        })
    }

    const prisma = getPrismaClient(c)

    const existingUser = await prisma.user.findFirst({
        where: {
            email: result.data.email,
        },
    })

    if (existingUser) {
        return c.json({
            error: 'Email already exists!',
        })
    }

    const user = await prisma.user.create({
        data: {
            email: result.data.email,
            password: result.data.password,
            name: result.data.name,
        },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({
        token,
    })
})

userRouter.post('/signin', async (c) => {
    const result = signinInput.safeParse(await c.req.json())

    if (!result.success) {
        return c.json({
            errorField: result.error.issues[0].path[0],
            errorMessage: result.error.issues[0].message,
        })
    }

    const prisma = getPrismaClient(c)

    const existingUser = await prisma.user.findFirst({
        where: {
            email: result.data.email,
        },
    })

    if (!existingUser) {
        return c.json({
            error: 'User does not exist!',
        })
    }

    const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET)

    return c.json({
        token,
    })
})

export default userRouter
