import React, { Dispatch, SetStateAction, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { IAuthHandler, IUser } from '../../types';
import Profile from '../UI/Profile.tsx';
interface IHeaderProps {
    authHandler: IAuthHandler;
    setAddPostForm: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ authHandler, setAddPostForm }: IHeaderProps) => {
    const location = useLocation();
    const currentUrl = location.pathname;
    console.log(authHandler.user?.user.name);
    const { url, username, name } = authHandler.user?.user! as IUser;
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };
    const showAddForm = () => {
        setAddPostForm(true);
    }
    return (
        <>
            <nav className='flex items-center justify-between bg-sub-color basis-1/10'>
                <img className='pl-8' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'} />
                <ul className='pr-8 flex gap-4 items-center justify-around text-main-color text-2xl'>
                    {currentUrl === process.env.PUBLIC_URL && (
                        <li className='ml-4 cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                            <FontAwesomeIcon onClick={showAddForm} icon={faSquarePlus} />
                        </li>
                    )}
                    <li className='cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon onClick={() => handleNavigate('/dogWorld')} icon={faHouse} />
                    </li>
                    <li className='cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon onClick={() => handleNavigate('/map')} icon={faTruckMedical} />
                    </li>
                    <li className='cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon onClick={() => handleNavigate('/weather')} icon={faCloud} />
                    </li>
                    {authHandler.user &&
                        (
                            <div onClick={toggleDropdown} className='cursor-pointer text-sm flex gap-2 items-center'>
                                <h6 className='text-sm font-bold'>{username}</h6>
                                <Profile width={30} height={30} url={url} username={username} />
                                <div className="relative">
                                    <FontAwesomeIcon className='text-base' icon={faCaretDown} />
                                    <div className={`dropdown-menu ${isDropdownOpen ? 'dropdown-menu active' : 'dropdown-menu'} absolute w-32 text-center right-0 mt-2 bg-sub-color text-main-color rounded shadow-md`}>
                                        <ul className="list-none p-2 font-bold text-sm">
                                            <li className="rounded-md cursor-pointer hover:bg-hover-main-color p-2 transition-colors duration-200 ease-in-out">
                                                <a href="/profile">프로필</a>
                                            </li>
                                            <li onClick={authHandler.logout} className="rounded-md cursor-pointer hover:bg-hover-main-color p-2 transition-colors duration-200 ease-in-out">
                                                <h3>로그아웃</h3>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </ul>
            </nav>
        </>
    )
}

export default Header;