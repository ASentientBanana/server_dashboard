import { ReactNode, useState, memo, Dispatch,SetStateAction, useEffect } from 'react'
import Router from 'next/router';
import styles from './styles.module.scss'

interface IProps {
    page: {
        id:number
        name:string,
        path:string
    },
}

const Link = ({ page }: IProps) => (
    <button
        
        onClick={() => {
            Router.push(page.path);
        }}>{page.name}</button>
)

const pages = [
    {
        name:'Home',
        path:'/'
    },
    {
        name:'Some page',
        path:'some-page'
    }
]

const Layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
    // const [selectedPage, setSelectedPage] = useState(0)
    useEffect(()=>{
        console.log(Router.pathname);
    },[])
    
    return (
        <>
            <nav className={styles.container}>
                {pages.map((page, i) => (
                    <Link 
                        key={i} 
                        page={{...page, id:i}}
                    />
                ))}
            </nav>
            {children}
        </>
    )
}


export default Layout;