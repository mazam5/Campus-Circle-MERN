import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Edit, ManageAccounts } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Grid } from "@mui/material";
import { updateUser } from "../../Actions/User";
import '../css/external.css'

const UserModal = ({show = false}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState(user.desc);
  const [location, setLocation] = useState(user.location);
  const [occupation, setOccupation] = useState(user.occupation);
  const [avatar, setAvatar] = useState(user.avatar);
  const [profile, setProfile] = useState(user.avatar);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const CustomFileInput = styled(TextField)(({ theme }) => ({
    borderRadius: "30px",
    padding:"0px",
    "& input[type='file']::-webkit-file-upload-button": {
      backgroundColor: theme.palette.primary.main,
      color: "black",
      width: "100%",
      margin:"0 200rem 10rem 0",
      padding: "5px",
      borderRadius: "50px",
      border: "none",
      fontFamily: "Roboto, sans-serif",
      fontSize: "1.2rem",
      fontWeight: 100,
    },
  }));
  
  const handleUpdate = async() => {
    try {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        if(password && password.length>0) {
            formData.append('password', password);
        }
        console.log(user.avatar +" "+ avatar.name+" "+avatar)
        if(avatar && user.avatar &&  avatar !== profile) {
          console.log(user.avatar +" "+ avatar.name)
            formData.append('picture', avatar);
            formData.append('avatar', avatar.name)
        }
        formData.append('currentUserId', user._id)
        formData.append('location', location);
        formData.append('occupation', occupation);
        formData.append('desc', desc);

      dispatch(updateUser(formData));
      handleClose()
    } catch (error) {
      console.log(error)
    }
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProfile(Reader.result);
      }
    };
    e.target.value = null;
  }

  return (
    <Box>
      <Button variant='contained' sx={{display:(show ?'inline-block':'none')}} fullWidth onClick={handleClickOpen} startIcon = {<Edit fontSize='small'/>}>Edit Profile</Button>
      <Button onClick={handleClickOpen} sx={{display:(show ?'none':'block')}}>
        <ManageAccounts />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edit Profile <Edit />
        </DialogTitle>
        <Box className="p-5">
        <Avatar
              src={profile !== avatar ? profile : `http://localhost:8800/assets/${user.avatar}` }
              className='hee mx-auto'
              alt="User"
              sx={{ height: "10vmax", width: "10vmax" }}
            />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                margin="dense"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            className="my-5"
            autoFocus
            margin="dense"
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
                <div className="upload flex">
                  <CustomFileInput
                    label="Avatar URL"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="dense"
                    fullWidth
                    type="file"
                    accept="image/*"
                    onChange={handleChangeAvatar}
                  />
                  <Edit className="my-auto" /> 
                </div>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Apply</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default UserModal;