import { Hono } from 'hono'

const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string
        DATABASE_URL: string
    }
}>()

blogRouter.post('/', (c) => {
    return c.json({})
})

blogRouter.put('/', (c) => {
    return c.json({})
})

blogRouter.get('/:id', (c) => {
    return c.json({})
})

export default blogRouter
