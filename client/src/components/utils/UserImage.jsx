import { Avatar, Box } from "@mui/material";

const UserImage = ({image, firstName, width = 50, height = 50, isOnline=null}) => {
  return (
    <Box position={'relative'} >
      <Avatar
        src={`http://localhost:8800/assets/${image}`}
        alt={firstName? firstName.toUpperCase() : "none"}
        sx={{width:{width}, height:{height}}}
        />
    {isOnline!==null && 
      <Box position={'absolute'} className={'w-4 h-4 bottom-0 right-0 ' + (isOnline? ' bg-green-500 rounded-full border-2 ':'bg-gray-400 rounded-full border-2')}></Box>
      }
    </Box>
  );
};

export default UserImage;