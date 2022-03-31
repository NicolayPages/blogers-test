import React, { FC, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import base from '../../assets/images/base.svg';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { Header } from '../../components/Header/Header';
import { Posts } from '../../components/Posts/Posts';
import Preloader from '../../components/Preloader/Preloader';
import { Slider } from '../../components/Slider/Slider';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { requestUsers } from '../../redux/reducers/users-reducer';
import './main.scss';

const Main: FC = memo(() => {
   const { users, isLoading } = useTypedSelector(state => state.users)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(requestUsers())
   }, []);

   if (!users.length) {
      return <Preloader />
   }
   return (
      <section className='wrapper'>
         <div className='container'>
            <Header />
            <Slider />
            <Posts
               users={users}
            />
         </div>
         <img className='rightBase' src={base} alt="base" />
         <img className='leftBase' src={base} alt="base" />
      </section>
   )
})

export default Main