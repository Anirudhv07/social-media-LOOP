import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Card,
    Checkbox,
    Input,
} from "@material-tailwind/react";

import { useFormik } from "formik";
import * as Yup from "yup"
import {toast} from "react-toastify"

import { XMarkIcon } from "@heroicons/react/20/solid";
import { editProfile } from "../../../api/apiConnection/homeConnection";
import { useDispatch, useSelector } from "react-redux";
import { setFirstName, setLastName, setUserBio, setUserEmail, setUserName } from "../../../redux/userRedux/slice";
interface Dialog {
    handleOpenEditProfle: () => void,
    openEditProfile: boolean,
    myData: {
        userId:string,
        email: string,
        firstName: string,
        lastName: string,
        userName: string,
        bio:string
    }
}
const EditProfile: React.FC<Dialog> = ({ handleOpenEditProfle, openEditProfile,myData }) => {

    const {userName,firstName,lastName,email,bio}=useSelector((state:any)=>state.user)

  const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
          firstName:firstName||"",
          lastName: lastName||"",
          userName: userName||"",
          email: email|| "",
          bio:bio||""
          // age: selectedAge
        },
        validationSchema:Yup.object({
            firstName: Yup.string()
            .max(10, "First Name must be less than 10 characters"),
          lastName: Yup.string()
            .max(10, "Last Name must be less than 10 characters"),
          userName: Yup.string()
            .max(10, "Must be less than 10 characters"),
          email: Yup.string()
            .email("Invalid email address"),
            bio:Yup.string()
            .max(50,"Must be less than 50 characters")
        }),
        onSubmit:async(values)=>{

            const response=await editProfile(values,myData.userId)
            console.log(response,'edigtt');
            
            if(response!=="Error"){
                dispatch(setUserName(response?.userName))
                dispatch(setFirstName(response?.firstName))
                dispatch(setLastName(response?.lastName))
                dispatch(setUserBio(response?.bio))
                dispatch(setUserEmail(response?.email))

                handleOpenEditProfle()
            }
            handleOpenEditProfle()
            
        }
    })

    return (
        <>

            <Dialog open={openEditProfile} handler={handleOpenEditProfle}>
                <div className="flex flex-row justify-between">
                    <DialogHeader>Edit Profile</DialogHeader>
                    <div className="h-6 w-6 m-2 cursor-pointer" onClick={handleOpenEditProfle}>
                        <XMarkIcon color="black" />
                    </div>
                </div>
                <DialogBody className="flex flex-row place-content-center">
                    <Card color="transparent" shadow={false}>

                        <form className=" w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
                            <div className=" flex flex-col gap-3">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    First Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder={myData.firstName}
                                    
                                    id="firstName"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }} crossOrigin={undefined} onClick={(event) => event.stopPropagation() 
                                        
                                    }
                                    {...formik.getFieldProps('firstName')}

                                />
                                 <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.firstName && formik.errors.firstName ?
                    formik.errors.firstName : null}
                </p>
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Last Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder={myData.lastName}
                                    id="lastName"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }} crossOrigin={undefined} onClick={(event) => event.stopPropagation()}
                                    {...formik.getFieldProps('lastName')}

                                />
                                  <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.lastName && formik.errors.lastName ?
                    formik.errors.lastName : null}
                </p>
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    User Name
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder={myData.userName}
                                    id="userName"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }} crossOrigin={undefined} onClick={(event) => event.stopPropagation()}
                                    {...formik.getFieldProps('userName')}

                                />
                                 <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.userName && formik.errors.userName ?
                    formik.errors.userName : null}
                </p>
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Your Email
                                </Typography>
                                <Input
                                    size="lg"
                                    type="text"
                                    id="email"
                                    placeholder={myData.email}
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }} crossOrigin={undefined} onClick={(event) => event.stopPropagation()}
                                    {...formik.getFieldProps('email')}

                                />
                                 <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.email && formik.errors.email ?
                    formik.errors.email : null}
                </p>
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Bio
                                </Typography>
                                <Input
                                    type="text"
                                    size="lg"
                                    id="bio"
                                    placeholder={myData.bio}
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }} crossOrigin={undefined} onClick={(event) => event.stopPropagation()}
                                    {...formik.getFieldProps('bio')}

                                />
                                 <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.bio && formik.errors.bio ?
                    formik.errors.bio : null}
                </p>
                            </div>

                            <Button className="mt-6" type="submit" fullWidth>
                                Submit
                            </Button>

                        </form>
                    </Card>

                </DialogBody>
                {/* <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpenEditProfle}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpenEditProfle}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter> */}
            </Dialog>
        </>
    );
}

export default EditProfile