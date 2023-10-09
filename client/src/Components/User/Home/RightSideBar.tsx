import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar,
} from "@material-tailwind/react";


function RightSideBar() {

  return (
    <div>

      <Card className="h-[calc(100vh-20rem)] w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            People May Know You
          </Typography>
        </div>
        <List>
          <div className="flex items-center gap-4">
            <Avatar src="/img/face-2.jpg" alt="avatar" />
            <div>
              <div className="flex">
                <div>
                  <Typography variant="h6">Tania Andrew</Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Web Developer
                  </Typography>
                </div>
                <Typography variant="small">Add friend +</Typography>
              </div>
            </div>
          </div>
        </List>
      </Card>
    </div>

  );
}


export default RightSideBar