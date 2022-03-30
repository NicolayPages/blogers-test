import React, { FC, memo } from 'react';
import s from './miniloader.module.scss'

export const MiniLoader: FC = memo(() => {
   return (
      <div className={s.ldsFacebook}><div></div><div></div><div></div></div>
   )
})