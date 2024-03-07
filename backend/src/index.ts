import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter, blogRouter } from './routes'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => {
    return c.json({
        status: 'Live',
    })
})

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
