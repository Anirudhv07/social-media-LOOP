import User from "../models/userModel"
import mongoose from "mongoose"



export const userRepository=()=>{

    const getUserByUserId=async(userId:string)=>{
        const user= await User.findOne({_id:userId})
        return user
    }

    const updateProPic=async(imgURL:string,userId:string)=>{
        return await User.updateOne({_id:userId},{$set:{profilePic:imgURL}})
    }

    const allUsers=async()=>{
        const response=await User.find()
        return response
    }

    const followUnfollowUser=async(followerId:string,userId:string)=>{
        const session=await User.startSession()
        session.startTransaction();
        try{
            const followStatus=await User.findOne({_id:userId,following:{$elemMatch:{$eq:followerId}}})
            const operations=[]
            if(followStatus===null){
                operations.push(
                    User.updateOne({_id:userId},{$addToSet:{following:followerId}}),
                    User.updateOne({_id:followerId},{$addToSet:{followers:userId}})
                )
            }else{
                operations.push(
                    User.updateOne({_id:userId},{$pull:{following:followerId}}),
                    User.updateOne({_id:followerId},{$pull:{followers:userId}})
                )
            }

            const results=await Promise.allSettled(operations)
            const isSuccess= results.every((results)=>results.status==='fulfilled')
            
            
            if(isSuccess){
                await session.commitTransaction()
                session.endSession()
                return true
            }else{
                await session.abortTransaction()
                session.endSession()
                return false
            }
            

        }catch(err:any){
            await session.abortTransaction()
            session.endSession()
            console.log(err);
            
        }
    }

    const myFollowingList=async(userId:string)=>{
        const userID=new mongoose.Types.ObjectId(userId)
        return await User.aggregate([
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  _id: userID,
                },
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$following",
                },
            },
            {
              $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                  objectId: {
                    $toObjectId: "$following",
                  },
                },
            },
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "users",
                  localField: "objectId",
                  foreignField: "_id",
                  as: "followingDetails",
                },
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$followingDetails",
                },
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                  userId:"$followingDetails._id",
                  firstName: "$followingDetails.firstName",
                  lastName: "$followingDetails.lastName",
                  profilePic:
                    "$followingDetails.profilePic",

                },
            },
          ])

          
          
    }

    const myFollowerList=async(userId:string)=>{
        const userID=new mongoose.Types.ObjectId(userId)
        return await User.aggregate([
            {
              $match:
                /**
                 * query: The query in MQL.
                 */
                {
                  _id: userID,
                },
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$followers",
                },
            },
            {
              $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                  objectId: {
                    $toObjectId: "$followers",
                  },
                },
            },
            {
              $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                  from: "users",
                  localField: "objectId",
                  foreignField: "_id",
                  as: "followersDetails",
                },
            },
            {
              $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                  path: "$followersDetails",
                },
            },
            {
              $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                  firstName: "$followersDetails.firstName",
                  lastName: "$followersDetails.lastName",
                  profilePic:
                    "$followersDetails.profilePic",
                },
            },
          ])

          
          
    }


    const myFollowersPost=async(userId:string)=>{
      const userID= new mongoose.Types.ObjectId(userId)
      return await User.aggregate([
        {
          $match:
            /**
             * query: The query in MQL.
             */
            {
              _id:userID ,
            },
        },
        {
          $project:
            /**
             * specifications: The fields to
             *   include or exclude.
             */
            {
              following: 1,
            },
        },
        {
          $unwind:
            /**
             * path: Path to the array field.
             * includeArrayIndex: Optional name for index.
             * preserveNullAndEmptyArrays: Optional
             *   toggle to unwind null and empty values.
             */
            {
              path: "$following",
            },
        },
        {
          $lookup:
            /**
             * from: The target collection.
             * localField: The local join field.
             * foreignField: The target join field.
             * as: The name for the results.
             * pipeline: Optional pipeline to run on the foreign collection.
             * let: Optional variables to use in the pipeline field stages.
             */
            {
              from: "posts",
              localField: "following",
              foreignField: "postedUser",
              as: "posts",
            },
        },
        {
          $addFields:
            /**
             * newField: The new field name.
             * expression: The new field expression.
             */
            {
              userId: {
                $toObjectId: "$following",
              },
            },
        },
        {
          $lookup:
            /**
             * from: The target collection.
             * localField: The local join field.
             * foreignField: The target join field.
             * as: The name for the results.
             * pipeline: Optional pipeline to run on the foreign collection.
             * let: Optional variables to use in the pipeline field stages.
             */
            {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
        },
        {
          $unwind:
            /**
             * path: Path to the array field.
             * includeArrayIndex: Optional name for index.
             * preserveNullAndEmptyArrays: Optional
             *   toggle to unwind null and empty values.
             */
            {
              path: "$posts",
            },
        },
        {
          $unwind:
            /**
             * path: Path to the array field.
             * includeArrayIndex: Optional name for index.
             * preserveNullAndEmptyArrays: Optional
             *   toggle to unwind null and empty values.
             */
            {
              path: "$userDetails",
            },
        },
        {
          $project:
            /**
             * specifications: The fields to
             *   include or exclude.
             */
            {
              posts: 1,
              userDetails: 1,
            },
        },
      ])
    }

return{
    getUserByUserId,
    updateProPic,
    allUsers,
    followUnfollowUser,
    myFollowingList,
    myFollowerList,
    myFollowersPost
}
}
export type userDBRepository=typeof userRepository