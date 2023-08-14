import { Avatar } from "@mui/material";

const UserImage = ({image, firstName}) => {
  return (
      <Avatar
        src={`http://localhost:8800/assets/${image}`}
        alt={firstName.toUpperCase()}
      />
  );
};

export default UserImage;