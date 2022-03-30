import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import arrow from '../../assets/images/arrow.svg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { actions as postsActions } from '../../redux/reducers/posts-reducer';
import { actions as usersActions } from '../../redux/reducers/users-reducer';
import { User } from '../User/User';
import './slider.scss';


export const Slider: FC = memo(() => {

   const { users, isFollowing } = useTypedSelector(state => state.users)
   const { setSortedPosts } = postsActions
   const { toggleIsFollowing } = usersActions
   const { limit, posts, sortedPosts } = useTypedSelector(state => state.posts)
   const dispatch = useDispatch()


   let getUserPosts = (userId: number, name: string) => {
      dispatch(setSortedPosts(posts, limit, userId, name))
      dispatch(toggleIsFollowing(false, sortedPosts[0]?.userId))
      dispatch(toggleIsFollowing(true, userId))
   }

   let usersList = users.map(user =>
      <SwiperSlide key={user.id}>
         <User
            isFollowing={isFollowing}
            getUserPosts={getUserPosts}
            info={user}
         />
      </SwiperSlide>)

   return (
      <div className="slider">
         <div className="slider__nav">
            <button className='slider__btn prev'><img src={arrow} alt="arrow" /></button>
            <button className='slider__btn right next'><img src={arrow} alt="arrow" /></button>
         </div>
         <div className="slider__content">
            <Swiper
               modules={[Navigation]}
               loop={true}
               navigation={{
                  prevEl: '.prev',
                  nextEl: '.next',
               }}
               breakpoints={{
                  320: {
                     slidesPerView: 1,
                     spaceBetween: 10,
                     centeredSlides: true
                  },
                  768: {
                     slidesPerView: 2,
                     spaceBetween: 20,
                  },
                  1024: {
                     slidesPerView: 4,
                     spaceBetween: 40,
                  },
               }}
               centeredSlidesBounds={true}
            >
               {usersList}
            </Swiper>
         </div>
      </div >
   )
})