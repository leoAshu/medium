import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinSchema, signupSchema } from '.'

const v1Router = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
}>()

v1Router.post('/signup', async (c) => {
    const result = signupSchema.safeParse(await c.req.json())

    if (!result.success) {
        return c.json({
            errorField: result.error.issues[0].path[0],
            errorMessage: result.error.issues[0].message
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const existingUser = await prisma.user.findFirst({
        where: {
            email: result.data.email
        }
    })

    if (existingUser) {
        return c.json({
            error: 'Email already exists!'
        })
    }

    const user = await prisma.user.create({
        data: {
            email: result.data.email,
            password: result.data.password,
            name: result.data.name
        }
    })

    return c.json({
        token: 'token'
    })
})

v1Router.post('/signin', async (c) => {
    const result = signinSchema.safeParse(await c.req.json())

    if (!result.success) {
        return c.json({
            errorField: result.error.issues[0].path[0],
            errorMessage: result.error.issues[0].message
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const existingUser = await prisma.user.findFirst({
        where: {
            email: result.data.email
        }
    })

    if (!existingUser) {
        return c.json({
            error: 'User does not exist!'
        })
    }

    return c.json({
        token: 'token'
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
