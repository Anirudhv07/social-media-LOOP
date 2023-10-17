import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    BookmarkIcon, EyeIcon
} from "@heroicons/react/24/solid";
import SinglePost from "./SinglePost";


interface post{
    createdAt:string
    description:string
    imgVideoURL:string
    like:[]
    postedUser:string
    updatedAt:string
    report:[]
}

function BottomCard({ allPosts }: { allPosts: [] }) {

   

    return (


        <div className="w-3/5 mx-auto my-5">
            <Tabs value="Images">
                <TabsHeader>
                    <Tab value='Images'>
                        <div className="flex items-center gap-2">
                            <EyeIcon className="w-5 h-5" />
                            Images
                        </div>
                    </Tab>


                    <Tab value='Saved'>
                        <div className="flex items-center gap-2">
                            <BookmarkIcon className="w-5 h-5" />
                            Saved
                        </div>
                    </Tab>
                </TabsHeader>
                {/* <TabsBody className="grid grid-cols-3 grid-rows-auto m-1 gap-1"> */}

                <TabsBody style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px,1fr))', gridGap: '5px', gridAutoFlow: 'dense' }}>
                    {allPosts.map((allPost: post) => {
                        return (

                            <TabPanel value='Images' className="p-0 w-full h-72 max-h-72">
                                <SinglePost allPost={allPost}/>
                            </TabPanel>
                        )

                    })}
                </TabsBody>

                <TabsBody style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px,1fr))', gridGap: '5px', gridAutoFlow: 'dense' }}>

                    <TabPanel value='Saved' className="p-0 w-full h-full max-h-72">
                        <div className="w-full h-full">
                            <img className="w-full h-full object-cover" src="https://res.cloudinary.com/dzcnq8f0y/image/upload/v1696786318/postImg/post-1696872537657-photo-1438761681033-6461ffad8d80.jpg" alt="Posted Image"></img>
                        </div>
                    </TabPanel>

                </TabsBody>
            </Tabs>
        </div >

    );
}

export default BottomCard