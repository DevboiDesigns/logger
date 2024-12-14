import { config } from "dotenv"
import { NodeEnv } from "../models/node.env"
config({
  path: process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : ".env.production",
})

const NODE_ENV: NodeEnv = (process.env.NODE_ENV as NodeEnv) || "production"

export { NODE_ENV }
