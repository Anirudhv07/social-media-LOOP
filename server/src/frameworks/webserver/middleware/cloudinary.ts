import { v2 as cloudinary } from "cloudinary";
import configKeys from "../../../config";

cloudinary.config({
    cloud_name:"dzcnq8f0y",
    secure:true,
    api_key:configKeys.CLOUDINARY_API_KEY,
    api_secret:configKeys.CLOUDINARY_API_SECRET
})

// cloudinary.uploader.upload()

export default cloudinary