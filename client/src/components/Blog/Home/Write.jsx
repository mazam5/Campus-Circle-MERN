import React, { useRef, useState, useMemo } from 'react'
import JoditEditor from 'jodit-react'
import {AddCircleOutline} from '@mui/icons-material';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Write = ({placeholder="Share your thoughts here..."}) => {
  const [title, setTitle] = useState();
  const [newCategory, setNewCategory] = useState('');
  const {user} = useSelector((state)=> state.user);
  const [file, setFile] = useState(null);
  const editor = useRef(null)
  const [content, setContent] = useState('');
  const [chipData, setChipData] = React.useState([]);
   
    const config = useMemo(() => {
      return {
        readonly: false,
        placeholder: placeholder || 'Start typing...',
      };
    }, [placeholder]);

    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData();
        formData.append('userId',user._id);
        formData.append('title', title);
        formData.append('content', content);
        chipData.forEach((category, index)=> {
          formData.append(`category[${index}]`, category.label);
          try {
            axios.post('/category/new', {name: category.label})
          } catch (error) {
            console.log(error)
          }
        });
        if(file) {
            formData.append('picture', file);
            formData.append('photo', file.name);
        }
        try {
          const {data} = await axios.post('/blog/new', formData, {
            headers: {
              "Content-Type": 'multipart/form-data',
            },
          })
          window.location.replace("/blog/" + data._id);
        } catch (error) {
          console.log(error)
        }
      }

      const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      };
      
      const addNewChip = () => {
        const trimmedInput = newCategory.trim();

        if (chipData.length < 3 && trimmedInput!=='') {

          const newKey = chipData.length; // Generate a unique key
          const newLabel = trimmedInput; // Replace with your desired label
        const newChip = { key: newKey, label: newLabel };
        
        setChipData((chips) => [...chips, newChip]);
        setNewCategory('')
        }
        else {
          if(trimmedInput==='') {
            alert('input should not be empty')
          }
          else {
            alert('no more than 3 categories allowed')
          }
          setNewCategory('')
        }
      };

      console.log(chipData)
    
    

  return (
    <Box sx={{px:{xs:'1rem', sm:'3rem', md:'10rem'}}} pt={5}>
      {file && 
        <img className='h-[300px] w-[90%] mx-auto rounded-2xl object-cover' src={URL.createObjectURL(file)}/>
      }
      <form onSubmit={handleSubmit}>
        <Stack direction={'column'} className='h-[100vh]' gap={2} p={0}>
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            <label htmlFor="fileInput" >
              <AddCircleOutline fontSize='large' sx={{color:'darkgray', fontSize:'40px', cursor:'pointer'}} />
            </label>
            <input type="file" id="fileInput" hidden onChange={e=>setFile(e.target.files[0])} />
            <input className='outline-none w-full text-[34px]' type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' autoFocus={true} />
          </Stack>
          <JoditEditor
            className='bg-black'
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {}}
          />

          <Box>
            <Stack direction={'column'} gap={2}>
              <Typography variant='h5'>Category</Typography>
              <Typography  variant='p'>Add or change topics (up to 3) so readers know what your story is about:</Typography>
              <Stack direction={'row'} alignItems={'center'}>
                <TextField
                  label="Add category"
                  variant="standard"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={addNewChip}>
                  Add
                </Button>
              </Stack>
            </Stack>
            {chipData && chipData.length>0 ? (
             <Paper
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  backgroundColor:'whitesmoke',
                  listStyle: 'none',
                  p: 0.5,
                  mt: 1,
                }}
                component="ul"
              >
                {chipData.map((data) => {
                  return (
                    <ListItem key={data.key}>
                      <Chip
                        color="primary"
                        label={data.label}
                        onDelete={handleDelete(data)}
                      />
                    </ListItem>
                  );
                })}
              </Paper>
            ) : (null)}
          </Box>
          <Button variant='contained' type='submit'>Publish</Button>
        </Stack>
      </form>
    </Box>
  )
}

export default Write
