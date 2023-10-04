import { Avatar, Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import parser from 'html-react-parser'
import { ThumbUpOutlined, ModeCommentOutlined, BookmarkAddOutlined, ThumbUp, BookmarkAdd} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { LikeBlog, bookmarkBlog, getBlogs, getPopularBlogs, getSavedBlogs, getSpecificBlog, views } from "../../../Actions/Blog";
import { Link, useParams } from "react-router-dom";
import UserImage from "../../utils/UserImage";
import Following from "../../rightSidebar/Following";
import { LoadUser, addRemoveUser } from "../../../Actions/User";

const SingleBlog = () => {
  const [time, setTime] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const {user:me} = useSelector((state)=>state.user)
  const params = useParams();
  const [saveBlog, setSaveBlog] = useState('');
  console.log(liked)

  useEffect(()=> {
    dispatch(getSpecificBlog(params.id))
    dispatch(views(params.id))
  }, [dispatch, params.id])

  const {userBlog} = useSelector((state)=>state.blog)
  const {savedBlog} = useSelector((state)=> state.blog);
  const likes = userBlog ? userBlog.likedBy : []; 
  console.log(likes)

  useEffect(() => {
    likes.forEach((item) => {
      if (item === me._id || item._id ===me._id) {
        setLiked(true);
      }
    });
    
  }, [likes, me._id]);

  useEffect(() => {
    savedBlog?.forEach((item) => {
      if (item._id === params.id) {
        setSaveBlog(true);
      }
    });
    
  }, [savedBlog, params.id]);


  const handleLike = async(id) => {
    setLiked(!liked)
    await dispatch(LikeBlog(id))
    dispatch(getSpecificBlog(id))
    dispatch(getPopularBlogs())
    dispatch(getSavedBlogs())
    dispatch(getBlogs())
}

// console.log(me._id, userBlog?.userId._id)

const handleBookmark = async(id) => {
  setSaveBlog(!saveBlog)
  await dispatch(bookmarkBlog(id))
  dispatch(getBlogs())
  dispatch(getSavedBlogs())
}

const isFriend = me.following.find((friend) => friend?._id.toString() === userBlog?.userId._id.toString());

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFollow = async () => {
    await dispatch(addRemoveUser(userBlog?.userId._id));
    handleModalClose();
    dispatch(LoadUser())
  };

  useEffect(()=> {

    const timeFormat = (timestamp) => {
        const date = parseISO(timestamp);
        const formattedDate = format(date, "MMM dd, yyyy");
        setTime(formattedDate)
    }
    (userBlog?
      timeFormat(userBlog.createdAt) : null
    )
},[userBlog])

  
  return (
    <Stack
      direction={"column"}
      width={"50%"}
      sx={{ mx: "auto" }}
      gap={3}
      mt={7}
    >
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        {userBlog?.title}
      </Typography>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <UserImage image={userBlog?.userId.avatar} width={50} height={50} firstName={userBlog?.userId.firstName} />
        <Stack direction={"column"}>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Typography fontWeight={500} variant="p">
            {userBlog?.userId.firstName} {userBlog?.userId.lastName}
            </Typography>
            <Typography sx={{display:userBlog?.userId._id===me._id ? 'none':'block'}} variant="p">-</Typography>
            <Box sx={{display:userBlog?.userId._id===me._id ? 'none':'block', p:0, m:0}} variant="p" color="green">
            {userBlog?.userId._id !== me._id ? (
              isFriend ? (
                <Button variant='text' size='small' color='info' onClick={() => setModalOpen(!modalOpen)}>
                  Following
                </Button>):(
                  <Button variant='text' size='small' color='info' onClick={handleFollow}>
                    Follow
                  </Button>
                )
            ):(null)}
            </Box>
            <Modal open={modalOpen} onClose={handleModalClose}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>
                <Stack direction={'column'} alignItems={'center'} spacing={2}>
                  <Avatar src = {`http://localhost:8800/assets/${userBlog?.userId.avatar}`} sx={{width: 80, height: 80 }} alt = {userBlog?.userId.firstName} />
                  <Typography variant='h6'>Are you sure, you want to unfollow {userBlog?.userId.firstName}</Typography>

                  <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                  <Button variant='text' color='error' onClick={() => handleFollow()}>Unfollow</Button>
                  <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                  <Button variant='text' color='secondary' onClick={()=> setModalOpen(!modalOpen)}>Cancle</Button>
                </Stack>
              </Box>
            </Modal>
          </Stack>
          <Stack
            direction={"row"}
            color={"GrayText"}
            gap={1}
            alignItems={"center"}
          >
            <Typography variant="p">{userBlog?.readingTime} min read</Typography>
            <Typography variant="p">-</Typography>
            <Typography variant="p">{time}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider className="bg-gray-50" />
      <Stack direction={"row"} gap={3} justifyContent={"space-between"}>
        <Stack direction={"row"} gap={3}>
          <Button onClick={()=>handleLike(userBlog._id)} >{liked ? <ThumbUp color='primary'/> : <ThumbUpOutlined/>}</Button> {userBlog?.likedBy?.length}
          <ModeCommentOutlined /> 66
        </Stack>
        <Box>
          <Button onClick={()=>handleBookmark(userBlog._id)} >{saveBlog ? <BookmarkAdd color='primary'/> : <BookmarkAddOutlined/>}</Button> 
        </Box>
      </Stack>
      <Divider className="dark:bg-gray-50" />
      <Stack width={"100%"} my={3} gap={3} sx={{ mx: "auto" }}>
        <img
          src={`http://localhost:8800/assets/${userBlog?.photo}`}
          className="h-[300px] w-[100%] mx-auto rounded-lg object-cover"
          alt=""
        />
        <Typography variant="p">
          {parser(userBlog? userBlog.content:'')}
        </Typography>

        <Stack direction={'row'} gap={3}>
          {userBlog?.category && userBlog?.category.length > 0 ? userBlog.category.map((cat) => (
            <Box key={cat} sx={{maxWidth: 'fit-content',  borderRadius:'10%', p:'10px', bgcolor:'lightgrey'}}>
              <Link to={`/blog?category=${cat}`}>
                <Typography variant="p">{cat}</Typography>
              </Link>
            </Box>
          )) : (null)}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SingleBlog;
