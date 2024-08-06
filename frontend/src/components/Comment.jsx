import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-start'>
                <Avatar className='w-10 h-10'>
                    <AvatarImage src={comment?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <span className='font-bold text-sm break-words'>{comment?.author.username}</span>
                    <span className='font-normal text-sm break-words'>{comment?.text}</span>
                </div>
            </div>
        </div>
    )
}

export default Comment
