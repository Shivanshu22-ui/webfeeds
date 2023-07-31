"use client"

import Profile from '@/components/Profile/Profile';
import './profile_page.css';
export default function dynamicName({params,searchParams}){
    return (
        <div className='_profile_wrapper'> 
            <Profile user = {params}/>
        </div>
    )
}