import express from 'express'
import {routes} from './routes'

// Boot express
export const app = express()

// Application routing
routes(app)
