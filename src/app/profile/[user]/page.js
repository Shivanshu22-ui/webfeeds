"use client"
import Profile from '@/components/Profile/Profile';
import './profile_page.css';
export default function dynamicName({params,searchParams}){
    console.log("profile page step 1")
    return (
        <div className='_profile_wrapper'> 
            <Profile user = {params}/>
        </div>
    )
}