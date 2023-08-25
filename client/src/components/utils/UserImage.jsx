import { Avatar } from "@mui/material";

const UserImage = ({image, firstName, width = 50, height = 50}) => {
  return (
      <Avatar
        src={`http://localhost:8800/assets/${image}`}
        alt={firstName? firstName.toUpperCase() : "none"}
        sx={{width:{width}, height:{height}}}
        />
  );
};

export default UserImage;