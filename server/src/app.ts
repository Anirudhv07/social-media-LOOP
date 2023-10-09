import express from 'express'
import http from 'http'
import {Application} from 'express'
import expressConfig from './frameworks/webserver/express'
import connectDB from './frameworks/database/connection'
import serverConfig from './frameworks/webserver/server'
import routes from './frameworks/webserver/routes'
import cloudinary from './frameworks/webserver/middleware/cloudinary'


const app:Application=express()
const server=http.createServer(app)

connectDB()

expressConfig(app)


routes(app)

cloudinary.config()

serverConfig(server).startServer()





