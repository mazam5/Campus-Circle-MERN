import { Avatar } from "@mui/material";

const UserImage = ({image, firstName}) => {
  return (
      <Avatar
        src={`http://localhost:8800/assets/${image}`}
        alt={firstName? firstName.toUpperCase() : "none"}
        sx={{width:50, height:50}}
      />
  );
};

export default UserImage;