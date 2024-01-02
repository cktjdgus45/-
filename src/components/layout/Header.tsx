import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { IAuthHandler } from '../../types';
interface IHeaderProps {
    authHandler: IAuthHandler;
}

const Header = ({ authHandler }: IHeaderProps) => {
    console.log(authHandler);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };
    return (
        <>
            <nav className='flex items-center justify-between bg-sub-color basis-1/10'>
                <img className='pl-8' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'} />
                <ul className='pr-8 flex items-center justify-around text-main-color text-2xl'>
                    {authHandler.user &&
                        (
                            <div onClick={toggleDropdown} className='cursor-pointer text-sm flex gap-1 items-center'>
                                <h6>{authHandler.user.username}</h6>
                                <div className="relative">
                                    <FontAwesomeIcon className='text-base' icon={faCaretDown} />
                                    <div className={`dropdown-menu ${isDropdownOpen ? 'dropdown-menu active' : 'dropdown-menu'} absolute w-32 text-center right-0 mt-2 bg-sub-color text-main-color rounded shadow-md`}>
                                        <ul className="list-none p-2">
                                            <li className="rounded-md cursor-pointer hover:bg-hover-main-color p-2 transition-colors duration-200 ease-in-out">
                                                <a href="/">프로필</a>
                                            </li>
                                            <li onClick={authHandler.logout} className="rounded-md cursor-pointer hover:bg-hover-main-color p-2 transition-colors duration-200 ease-in-out">
                                                <a href="/">로그아웃</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {/* {authHandler.user && (
                        <li onClick={authHandler.logout} className='ml-4 cursor-pointer hover:text-hover-main-color px-4 py-2 bg-main-color text-sm text-white rounded-md transition-colors duration-200 ease-in-out'>
                            <span>로그아웃</span>
                        </li>
                    )} */}
                    <li className='ml-4 cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon onClick={() => handleNavigate('/dogWorld')} icon={faHouse} />
                    </li>
                    <li className='ml-4 cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon onClick={() => handleNavigate('/map')} icon={faTruckMedical} />
                    </li>
                    <li className='ml-4 cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <FontAwesomeIcon onClick={() => handleNavigate('/weather')} icon={faCloud} />
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header;