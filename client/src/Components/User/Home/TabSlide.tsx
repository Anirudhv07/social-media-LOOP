import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import PostCard from "./Post";
import { EyeIcon, BookmarkIcon } from "@heroicons/react/20/solid";
import SinglePost from "../Profile/SinglePost";

function TabSlide({ post }: { post: any }) {

  console.log(post, 'posttme');




  return (
    // <div className="w-f mx-auto my-5">
    <div className=" z-10 w-[calc(100vw-44rem)] mx-auto my-5">
      <Tabs value="Images">
        <TabsHeader>
          <Tab value='Images'>
            <div className="flex items-center gap-2">
              FOLLOWING
            </div>
          </Tab>


          {/* <Tab value='Saved'>
            <div className="flex items-center gap-2">
              EXPLORE
            </div>
          </Tab> */}
        </TabsHeader>
        {/* <TabsBody className="grid grid-cols-3 grid-rows-auto m-1 gap-1"> */}

        <TabsBody >


            {post.map((singlePost: any) => (
          <TabPanel value='Images' className=" w-full h-full my-3">

              <PostCard singlePost={singlePost} />



          </TabPanel>
            )
            )}

        </TabsBody>

        {/* <TabsBody >

          <TabPanel value='Saved' className="p-0 w-full h-full py-3">
            <PostCard post={post} />

          </TabPanel>

        </TabsBody> */}
      </Tabs>
    </div >
  );
}


export default TabSlide