import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import PostCard from "./Post";

function TabSlide() {
  const data = [
    {
      label: "Following",
      value: "html",
      desc: <PostCard />,
    },
    {
      label: "Explore",
      value: "react",
      desc: `All post will be seen here`,
    },


  ];

  return (
    <div className=" z-10 w-[calc(100vw-44rem)] ">
      {/* <div className="bg-black h-screen w-screen"></div> */}

      <Tabs id="custom-animation" value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="h-screen"
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}


export default TabSlide