import { useDispatch, useSelector } from 'react-redux';

import './user.css'

export const User = () => {
   /*  const { currentUser } = useSelector((state) => state.user); */
    const dispatch = useDispatch()
    return (
    <main className='user__container'>
       {/*  <section className='user__section'>
            <h3>Nombre: {currentUser.nombre}</h3>
            <h3 >Patente: <span className='user__patente'>{currentUser.patente}</span></h3>
            <button className='btn-load' onClick={()=> dispatch(logout())}>Cerrar sesion</button>
        </section> */}
    </main>
  )
}
