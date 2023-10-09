

import multer from 'multer';
import {CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary';
          

const profileOptions = {
    cloudinary:cloudinary,
    params:{
        folder: 'profilePic',
        allowed_formats : ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }] ,
        public_id: (req:any,file:any) => {
            const originalname = file.originalname.split('.')
            return `image-${Date.now()}-${originalname[0]}`
        }
    }
}

const postImages = {
    cloudinary:cloudinary,
    params:{
        folder: 'postImg',
        allowed_formats : ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp','gif','mp4','mpeg'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }] ,
        public_id: (req:any,file:any) => {
            
            
            const originalname = file.originalname.split('.')
            return `post-${Date.now()}-${originalname[0]}`
        }
    }
}

const profilePicStorage = new CloudinaryStorage(profileOptions)
const postStorage = new CloudinaryStorage(postImages)
export const uploadProfilePic = multer({storage:profilePicStorage }).single('profilePic')
export const uploadPostImg = multer({storage:postStorage }).single('postImage') 