import { Outlet } from 'react-router-dom'
import HeaderTop from '../Header'
export default function Layout(){
    return(
        <>
            <HeaderTop/> 
            <Outlet/>
        </>
    )
}