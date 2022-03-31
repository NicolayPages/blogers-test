import React, { FC, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import quotes from '../../assets/images/quotes.svg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { requestPosts } from '../../redux/reducers/posts-reducer';
import { actions } from '../../redux/reducers/users-reducer';
import { UsersType } from '../../types/types';
import { MiniLoader } from '../MiniLoader/MiniLoader';
import { Post } from '../Post/Post';
import './posts.scss';


type PropsType = {
   users: Array<UsersType>
}


export const Posts: FC<PropsType> = memo(({ users }) => {

   const { isLoading, name, limit, posts } = useTypedSelector(state => state.posts)
   const { toggleIsFollowing } = actions
   const dispatch = useDispatch()

   useEffect(() => {
      if (posts.length < 1) {
         dispatch(requestPosts(limit, users[0]?.id, users[0]?.name))
      }
      dispatch(toggleIsFollowing(true, users[0]?.id))
   }, []);

   return (
      <div className="posts">
         <div className='quotes'><img src={quotes} alt="" /></div>
         {
            isLoading
               ? <div className='posts__loader'><MiniLoader /></div>

               : <div className="posts__content">
                  <h2 className="posts__title title">
                     {`${limit} актуальных поста ${name}`}
                  </h2>
                  <div className='posts__wrapper'>
                     {posts
                        ? posts.map(post => <Post key={post.id} info={post} />)
                        : 'Posts not found'
                     }
                  </div>
               </div>
         }
      </div>
   )
})