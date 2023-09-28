import express from 'express'
import http from 'http'
import {Application} from 'express'
import expressConfig from './frameworks/webserver/express'
import connectDB from './frameworks/database/connection'
import serverConfig from './frameworks/webserver/server'

const app:Application=express()
const server=http.createServer(app)

connectDB()

expressConfig(app)

serverConfig(server).startServer()





