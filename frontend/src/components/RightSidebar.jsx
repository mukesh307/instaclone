import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className='w-full max-w-xs mx-auto my-4 px-4 md:px-0'>
      <div className='flex items-center gap-3 md:gap-2 mb-4'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar className='h-12 w-12 md:h-16 md:w-16'>
            <AvatarImage src={user?.profilePicture} alt="profile_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className='font-semibold text-base md:text-lg'>
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  )
}

export default RightSidebar;
