import { Hono } from 'hono'
import { getPrismaClient } from '../db'
import { authMiddleware } from '../middlewares'
import { createPostInput, updatePostInput } from '@ashu_leo/common'

const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string
        DATABASE_URL: string
    }
    Variables: {
        userId: string
    }
}>()

blogRouter.post('/', authMiddleware, async (c) => {
    const result = createPostInput.safeParse(await c.req.json())

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
    const result = updatePostInput.safeParse(await c.req.json())

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

blogRouter.get('/bulk', async (c) => {
    const posts = await getPrismaClient(c).post.findMany({})

    return c.json({ posts })
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
