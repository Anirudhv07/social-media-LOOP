import dotenv from 'dotenv'

dotenv.config()

const configKeys={
    MONGO_DB_URL:process.env.DATABASE_URL as string,
    PORT:process.env.PORT as string,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY as string,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET as string,
}


export default configKeys;