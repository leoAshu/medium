import { Hono } from 'hono'
import { v1Router } from './routes'

const app = new Hono()

app.route('/api/v1', v1Router)

export default app
