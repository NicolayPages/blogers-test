import React, { FC, memo, useState } from 'react';
import { UsersType } from '../../types/types';
import './user.scss';
import img from '../../assets/images/man.jpg'
import { MiniLoader } from '../MiniLoader/MiniLoader';


type PropsType = {
   info: UsersType
   getUserPosts: (userId: number, name: string) => void
   isFollowing: Array<number>
}
export const User: FC<PropsType> = memo(({ info, getUserPosts, isFollowing }) => {

   let random = Math.floor(Math.random() * (50 - 1)) + 1
   let ava = `https://i.pravatar.cc/300?img=${random}`

   let onGetUserPosts = () => {
      getUserPosts(info.id, info.name)
   }

   let active = isFollowing.some((id: number | null) => id === info.id)
   return (
      <div onClick={onGetUserPosts} className={active ? 'user active' : 'user'}>
         <div className='user__image'>
            <img src={ava} alt="user-image" />
         </div>
         <h3 className='user__name name'>{info.name}</h3>
         <p className='user__company subtitle'>{info.company.name}</p>
      </div>
   )
})


