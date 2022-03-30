import React, { FC, memo } from 'react';
import './header.scss'

export const Header: FC = memo(() => {
   return (
      <div className="header">
         <h1 className="header__title title">
            Наши топ-блогеры
         </h1>
         <p className='header__subtitle subtitle'>
            Лучше специалисты в своем деле,<br />
            средний опыт работы в профессии - 27 лет
         </p>
      </div >
   )
})