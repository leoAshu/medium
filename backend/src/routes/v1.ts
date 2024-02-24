import { Hono } from 'hono'
import { signinSchema, signupSchema } from '.'
import { getPrismaClient } from '../db'
import { sign } from 'hono/jwt'

const v1Router = new Hono<{
    Bindings: {
        JWT_SECRET: string
        DATABASE_URL: string
    }
}>()

v1Router.post('/signup', async (c) => {
    const result = signupSchema.safeParse(await c.req.json())

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

v1Router.post('/signin', async (c) => {
    const result = signinSchema.safeParse(await c.req.json())

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

v1Router.post('/blog', (c) => {
    return c.json({})
})

v1Router.put('/blog', (c) => {
    return c.json({})
})

v1Router.get('/blog/:id', (c) => {
    return c.json({})
})

export default v1Router
