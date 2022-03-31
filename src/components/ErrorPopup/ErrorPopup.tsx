import React from 'react';
import { useDispatch } from 'react-redux';
import errorIcon from '../../assets/images/error.jpg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { actions } from '../../redux/reducers/errors-reducer';
import s from './ErrorPopup.module.scss';




const ErrorPopup: React.FC = React.memo(() => {

   const { errorMessage } = useTypedSelector(state => state.errors)
   let dispatch = useDispatch()
   let { deactivateMode } = actions

   let onDeactivateMode = () => {
      dispatch(deactivateMode())
   }

   let showError = errorMessage != null;
   return (
      <div className={showError ? s.wrapper : s.wrapperNone}>
         <div className={s.wrapperBody}>
            <div className={s.header}>
               <h1 className={s.title}>Oops, something is wrong!</h1>
               <div className={s.closeWrapper}><p className={s.close} onClick={onDeactivateMode}>x</p></div>
            </div>
            <div className={s.content}>
               <h2 className={s.subtitle}>{errorMessage}</h2>
               <div className={s.image}><img src={errorIcon} alt="" /></div>
            </div>
         </div>
      </div>
   );
})



export default ErrorPopup

