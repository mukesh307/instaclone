import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    try {
      setLoading(true);
      const res = await axios.post('https://instaclone-54jh.onrender.com/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts])); // [1] -> [1,2] -> total element = 2
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className='p-4 sm:p-6'>
        <DialogHeader className='text-center font-semibold text-lg sm:text-xl'>Create New Post</DialogHeader>
        <div className='flex flex-col sm:flex-row gap-4 items-center'>
          <Avatar className='flex-shrink-0'>
            <AvatarImage src={user?.profilePicture} alt="img" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='text-center sm:text-left'>
            <h1 className='font-semibold text-sm sm:text-base'>{user?.username}</h1>
            <span className='text-gray-600 text-xs'>Bio here...</span>
          </div>
        </div>
        <Textarea 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className="focus-visible:ring-transparent border-none mt-4"
          placeholder="Write a caption..." 
        />
        {imagePreview && (
          <div className='w-full h-64 flex items-center justify-center mt-4'>
            <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
          </div>
        )}
        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
        <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] mt-4'>Select from computer</Button>
        {imagePreview && (
          loading ? (
            <Button className='w-full mt-4'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button onClick={createPostHandler} type="submit" className="w-full mt-4">Post</Button>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost
