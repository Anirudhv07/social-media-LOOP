import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
   
  interface myDetails{
    email:string,
    phone:string,
    profilePic:string,
    userName:string,
    firstName:string,
    lastName:string,
    followers:[],
    following:[]
  }
   function TopCard({myData}:{myData:myDetails}) {
    
    return (
      <Card
        shadow={false}
        className="relative grid h-[35rem] w-4/5 mx-auto mt-20 items-end justify-center overflow-hidden text-center"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12 ">
        <Avatar
            style={{ width: '130px', height: '130px' }}
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <Typography variant="h5" className="mt-4 text-white">
          {myData.firstName} &nbsp; 
            {myData.lastName}
          </Typography>
          <p>{myData.userName}</p>
          <Typography className="font-sans py-5  text-white" >
            <span>--  </span>
          Explore the world
          <span>  --</span>

        </Typography>
          <div className="flex flex-row gap-12 pt-3 text-white" >
          
          <div >
            <Typography variant="h6"  className="mb-1">
              Posts
            </Typography>
            <p>23</p>
          </div>
        
          <div >
            <Typography variant="h6"  className="mb-1">
              Followers
            </Typography>
            <p>23</p>
          </div>

          <div >
            <Typography variant="h6"  className="mb-1">
              Followers
            </Typography>
            <p>23</p>
          </div>

        </div>
      
        </CardBody>
      </Card>
    );
  }

  export default TopCard