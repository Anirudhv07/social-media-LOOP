import { userDBInterface } from "../repositoryInterface/userRepositoryInterface";

export const myProfie = async (userId: string, repository: ReturnType<userDBInterface>) => {

    const response = await repository.getByUserId(userId)
    if (response) {
        response.password = ""
    }

    return response

}


export const updateProfilePic = async (userId: string, imgURL: any, repository: ReturnType<userDBInterface>) => {
    const updateProPic = await repository.changeProPic(imgURL,userId)
    console.log(updateProPic,'resopooooooo');
    


    return updateProPic
}