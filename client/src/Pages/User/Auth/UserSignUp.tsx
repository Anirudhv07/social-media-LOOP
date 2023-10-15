import {
  Card,
  Input,
  Button,
  Typography,
  CardBody,
  CardHeader,
  Select,
  Option,
} from "@material-tailwind/react";

import { useFormik } from "formik";
import * as Yup from "yup"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import lodash from "lodash"
import {toast} from "react-toastify"
import { signUp } from "../../../api/apiConnection/authConnection";
import { setToken,  setUserName,setUserId ,setProfilePic,setFirstName,setLastName } from "../../../redux/userRedux/slice";


interface resp{
  status?:string,
  message?:string,
  token?:string,
  user?:{userName:string,firstName:string,lastName:string,_id:string,profilePic:string}
}

function UserSignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const [selectedAge, setSelectedAge] = React.useState(20)

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
      phoneNumber: ""
      // age: selectedAge
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(10, "First Name must be less than 10 characters")
        .required("Required"),
      lastName: Yup.string()
        .max(10, "Last Name must be less than 10 characters")
        .required("Required"),
      userName: Yup.string()
        .max(10, "Must be less than 10 characters")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be less than 20 characters")
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), ''], "Passwords must match")
        .required("Required"),
      // age: Yup.number()
      //   .max(120, "Age must be less than 120")
      //   .min(1, "Age must be greater than 1")
      //   .required("Required"),
      gender: Yup.string()
        .required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be a 10 digit numeric value")
        .required('Required')
    }),
    onSubmit: async (values) => {
      
      const data=lodash.omit(values,'rePassword')
      
      

      const response:resp = await signUp(data)
      
      

      if (response?.status === "success") {
        if (response?.token) {
          
          dispatch(setUserName(response?.user?.userName))
          dispatch(setFirstName(response?.user?.firstName))
          dispatch(setLastName(response?.user?.lastName))
          dispatch(setUserId(response?.user?._id))
          dispatch(setProfilePic(response?.user?.profilePic))
          dispatch(setToken(response?.token))
        }
        navigate("/")
        toast.success(response?.message)

        
      }else{
        toast.error(response?.message)
      }

    }
  })




  const genderOptions = ["Male", "Female", "Other"];

  return (

    <div className="w-full h-screen pt-12">



      <Card className="w-4/5 flex-row flex-wrap rounded-none mx-auto">
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
        <CardBody className="ml-10 mt-5 mx-auto">

          <Typography variant="h4" style={{ color: '#927ee1' }}>
            Sign Up
          </Typography>
          <Typography style={{ color: '#b3b3b3' }} className="mt-1 font-normal">
            Enter your details
          </Typography>
          <form className="  max-w-screen-lg  self-center text-sm" onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex flex-col gap-3">

              <div className="flex flex-row pt-2 gap-2" >
                <Input variant="standard" id="firstName" label="First Name" type="text" crossOrigin={undefined}
                  {...formik.getFieldProps('firstName')} />

                <Input variant="standard" id="lastName" label="Last Name" type="text" crossOrigin={undefined}
                  {...formik.getFieldProps('lastName')} />

              </div>
              <p className=" ml-2 text-sm text-red-800">
                {(formik.touched.firstName || formik.touched.lastName) && (formik.errors.firstName || formik.errors.lastName) ?
                  (formik.errors.firstName || formik.errors.lastName) : null}
              </p>


              <div>
                <Input variant="standard" label="User Name" id="userName" type="text" crossOrigin={undefined}
                  {...formik.getFieldProps('userName')} />
                <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.userName && formik.errors.userName ?
                    formik.errors.userName : null}
                </p>
              </div>
              <div>
                <Input variant="standard" label="Email" type="text" id="email" crossOrigin={undefined}
                  {...formik.getFieldProps('email')} />
                <p className="ml-2 text-sm text-red-800">
                  {formik.touched.email && formik.errors.email ?
                    formik.errors.email : null}
                </p>
              </div>
              <div>
                <Input variant="standard" label="Phone Number" id="phoneNumber" type="number" crossOrigin={undefined}
                  {...formik.getFieldProps('phoneNumber')} />
                <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ?
                    formik.errors.phoneNumber : null}
                </p>
              </div>
              <div >

                <Select
                  label="Gender"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={(value) => {
                    formik.setFieldValue("gender", value);
                  }}
                >
                  {genderOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>


              </div>
              <div>
                <Input
                  variant="standard"
                  label="Password"
                  type="password"
                  id="password"
                  crossOrigin={undefined}
                  {...formik.getFieldProps('password')}
                />
                <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.password && formik.errors.password ?
                    formik.errors.password : null}
                </p>
              </div>
              <div>
                <Input
                  variant="standard"
                  label="Re-Enter Password"
                  type="password"

                  crossOrigin={undefined}
                  {...formik.getFieldProps('rePassword')}

                />
                <p className=" ml-2 text-sm text-red-800">
                  {formik.touched.rePassword && formik.errors.rePassword ?
                    formik.errors.rePassword : null}
                </p>
              </div>
            </div>

            <Button className="mt-12 rounded-none " type="submit" style={{ backgroundColor: '#cab5fa' }} fullWidth>
              Sign Up
            </Button>
            
            <Typography style={{ color: '#b3b3b3' }} className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to={'/'} className="font-medium " style={{ color: '#927ee1' }}>
              
                  Log In
                
              </Link>
            </Typography>
          </form>

        </CardBody>
      </Card>

    </div>
  );
}

export default UserSignUp;


