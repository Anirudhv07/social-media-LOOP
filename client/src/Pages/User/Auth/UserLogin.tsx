import { useDispatch } from "react-redux";
import { auth, provider } from "../../../Components/User/GoogleAuth/Config"
import { signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup"
import { logIn, googleAuth, googleSignUpUser } from "../../../api/apiConnection/authConnection";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUserName,setUserId ,setProfilePic, setFirstName, setLastName, setUserEmail, setUserBio} from "../../../redux/userRedux/slice";
import { toast } from "react-toastify";

interface response {
  status?: string,
  message?: string,
  user?: { userName: string,firstName:string,lastName:string,_id: string, profilePic: string ,bio:string,email:string}
  token?: string,
}



function UserLogin() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Required"),
      password: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values) => {

      const response: response = await logIn(values)
      console.log(response, 'signin response');

      if (response?.status === 'success') {
        if (response?.token) {
          
          dispatch(setToken(response?.token))
          dispatch(setFirstName(response?.user?.firstName))
          dispatch(setLastName(response?.user?.lastName))
          dispatch(setUserName(response?.user?.userName))
          dispatch(setUserId(response?.user?._id))
          dispatch(setProfilePic(response?.user?.profilePic))
          dispatch(setUserBio(response?.user?.bio))
          dispatch(setUserEmail(response?.user?.email))
        }
        navigate('/')
        toast.success(response?.message)

      } else {
        toast.error(response?.message)
      }
    }
  })


  // const [value,setValue]=useState(" ")
  const handleClick = async () => {
    signInWithPopup(auth, provider).then(async (data) => {



      // setValue(data.user.email as string)

      const isEmailExist: response = await googleAuth(data.user.email as string)
      console.log(isEmailExist, 'email');

      if (isEmailExist?.status === "success") {

        if (isEmailExist?.token) {
         
          dispatch(setToken(isEmailExist?.token))
          dispatch(setUserName(isEmailExist?.user?.userName))
          dispatch(setUserBio(isEmailExist?.user?.bio))
          dispatch(setUserEmail(isEmailExist?.user?.email))

          dispatch(setUserId(isEmailExist?.user?._id))
          dispatch(setProfilePic(isEmailExist?.user?.profilePic))
        }
        navigate('/')
        toast.success(isEmailExist?.message)
      } else {
        const user = {
          userName: data?.user?.displayName,
          email: data?.user?.email
        }

        const signUpUser: response = await googleSignUpUser(user)


        if (signUpUser?.status === "success") {
          if (signUpUser?.token) {
            
            dispatch(setToken(signUpUser.token))
            dispatch(setUserName(signUpUser?.user?.userName))
          dispatch(setUserId(signUpUser?.user?._id))
          dispatch(setProfilePic(signUpUser?.user?.profilePic))
          dispatch(setUserBio(signUpUser?.user?.bio))
          dispatch(setUserEmail(signUpUser?.user?.email))
          }
          navigate("/")
          toast.success(signUpUser?.message)
        } else {

          toast.error(signUpUser?.message)
        }


      }



    })
  }



  return (

    <div className="w-full h-screen pt-36">



      <Card className="w-3/5 flex-row flex-wrap rounded-none mx-auto ">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-3/5 shrink-0 rounded-none"
        >
          <img
            src="/icons/piccccc.jpg"

            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="ml-10 mt-5">

          <Typography variant="h4" style={{ color: '#927ee1' }}>
            Log In
          </Typography>
          <Typography style={{ color: '#b3b3b3' }} className="mt-1 font-normal">
            Enter your details
          </Typography>
          <form className="mt-8 mb-2  max-w-screen-lg  self-center" onSubmit={formik.handleSubmit} >
            <div className="mb-4 flex flex-col gap-3">
              <Input variant="standard" id="email" type="text" label="Email" crossOrigin={undefined} style={{ color: '#b3b3b3' }}
                {...formik.getFieldProps('email')} />
              <p className="ml-2 text-sm text-red-800">{formik.touched.email && formik.errors.email ?
                formik.errors.email : null}</p>
              <Input
                variant="standard"
                size="lg"
                type="password"
                id="password"
                label="Password"
                style={{ color: '#b3b3b3' }}
                crossOrigin={undefined}
                {...formik.getFieldProps('password')}

              />
              <p className="ml-2 text-sm text-red-800">{formik.touched.password && formik.errors.email ?
                formik.errors.email : null}</p>
            </div>

            <Button className="mt-12 rounded-none " type="submit" style={{ backgroundColor: '#cab5fa' }} fullWidth>
              Log In
            </Button>

            <Button
              size="sm"
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-3 mt-4"
              onClick={handleClick}
            >
              <img src="https://freesvg.org/img/1534129544.png" alt="metamask" className="h-6 w-6" />
              Continue with Google
            </Button>
            <Typography style={{ color: '#b3b3b3' }} className="mt-4 text-center font-normal">
              Do not have an account?{" "}
              <Link to={'/signup'} className="font-medium " style={{ color: '#927ee1' }}>
                Sign Up
              </Link>
            </Typography>
          </form>

        </CardBody>
      </Card>

    </div>

  );
}

export default UserLogin;


