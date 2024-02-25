import { Hono } from 'hono'
import { getPrismaClient } from '../db'
import { createPostSchema, updatePostSchema } from '.'
import { authMiddleware } from '../middlewares'

const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string
        DATABASE_URL: string
    }
    Variables: {
        userId: string
    }
}>()

blogRouter.get('/', async (c) => {
    const posts = await getPrismaClient(c).post.findMany({})

    return c.json({ posts })
})

blogRouter.post('/', authMiddleware, async (c) => {
    const result = createPostSchema.safeParse(await c.req.json())

    if (!result.success) {
        return c.json({
            errorField: result.error.issues[0].path[0],
            errorMessage: result.error.issues[0].message,
        })
    }

    const post = await getPrismaClient(c).post.create({
        data: {
            title: result.data.title,
            content: result.data.content,
            authorId: c.get('userId'),
        },
    })

    return c.json({ id: post.id })
})

blogRouter.put('/', authMiddleware, async (c) => {
    const result = updatePostSchema.safeParse(await c.req.json())

    if (!result.success) {
        return c.json({
            errorField: result.error.issues[0].path[0],
            errorMessage: result.error.issues[0].message,
        })
    }

    const post = await getPrismaClient(c).post.update({
        data: {
            title: result.data.title,
            content: result.data.content,
        },
        where: {
            id: result.data.id,
        },
    })

    return c.json({ message: 'Post updated!' })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id')

    const post = await getPrismaClient(c).post.findFirst({ where: { id } })
    if (!post) {
        c.status(404)
        return c.json({ error: 'Post not found!' })
    }

    return c.json({ post })
})

export default blogRouter
