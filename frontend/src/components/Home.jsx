import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='flex-grow md:w-2/3 lg:w-3/4'>
                <Feed />
                <Outlet />
            </div>
            <div className='hidden md:block md:w-1/3 lg:w-1/4'>
                <RightSidebar />
            </div>
        </div>
    )
}

export default Home
