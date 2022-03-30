import React, { FC, memo } from 'react';
import { PostsType } from '../../types/types';
import './post.scss'

type PropsType = {
   info: PostsType
}

export const Post: FC<PropsType> = memo((props) => {

   const { info } = props

   return (
      <div className="post">
         <h3 className="post__title name">
            {info.title}
         </h3>
         <p className="post__text text">
            {info.body}
         </p>
      </div>
   )
})