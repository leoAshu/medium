import { MiddlewareHandler } from 'hono'
import { verify } from 'hono/jwt'
import { getPrismaClient } from '../db'

const authMiddleware: MiddlewareHandler = async (c, next) => {
    try {
        const token = c.req.header('Authorizaation')?.split(' ')[1] ?? ''
        const userId = await verify(token, c.env.JWT_SECRET)

        const userExists = await getPrismaClient(c).user.findFirst({ where: { id: userId } })
        if (!userExists) {
            throw new Error('Unauthorized')
        }

        c.set('userId', userExists.id)
        await next()
    } catch (err) {
        c.status(401)
        return c.json({
            error: 'Unauthorized',
        })
    }
}

export default authMiddleware
