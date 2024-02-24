import { Hono } from 'hono'

const v1Router = new Hono()

v1Router.post('/signup', (c) => {
    return c.json({ message: 'hello' })
})

v1Router.post('/signin', (c) => {
    return c.json({})
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
