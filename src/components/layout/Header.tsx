import React, { SetStateAction, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { IAuthorizedUser, IUser } from '../../types';
import Avartar from '../UI/Avartar.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
interface IHeaderProps {
    setAddPostForm: React.Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setAddPostForm }: IHeaderProps) => {
    const authHandler = useAuth();
    const location = useLocation();
    const currentUrl = location.pathname;
    const { user } = authHandler.user as IAuthorizedUser;
    const { url, name, username } = user ?? (authHandler.user as unknown as IUser);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
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
            <nav className='mobile:flex-row flex flex-col items-center justify-around bg-sub-color basis-1/10  text-main-color text-base font-normal'>
                <img className='pl-8' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'} />
                <ul className={`mobile:flex-row mobile:flex flex-col ${isMenuOpen ? "flex" : "hidden"} mobile:pr-8 gap-4 items-center justify-around`}>
                    {currentUrl === process.env.PUBLIC_URL && (
                        <li className='cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                            <h3 onClick={showAddForm}>새 글</h3>
                        </li>
                    )}
                    <li className='cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <h3 onClick={() => handleNavigate('/dogWorld')}>커뮤니티</h3>
                    </li>
                    <li className='cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <h3 onClick={() => handleNavigate('/map')}>응급24시</h3>
                    </li>
                    <li className='cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out'>
                        <h3 onClick={() => handleNavigate('/weather')}>날씨</h3>
                    </li>
                    <li onClick={() => handleNavigate(`/${username}`)} className="mobile:hidden cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out">
                        <h3>프로필</h3>
                    </li>
                    <li onClick={authHandler.logout} className="mobile:hidden cursor-pointer hover:text-hover-main-color transition-colors duration-200 ease-in-out">
                        <h3>로그아웃</h3>
                    </li>
                </ul>
                {authHandler.user &&
                    (
                        <div onClick={toggleDropdown} className='mobile:flex hidden z-50 cursor-pointer text-sm justify-around gap-1 items-center'>
                            <h6 className='text-sm font-bold'>{name}</h6>
                            <div className='mobile:block hidden'>
                                <Avartar width={36} height={36} url={url} name={name} />
                            </div>
                            <div className="relative">
                                <FontAwesomeIcon className='text-base' icon={faCaretDown} />
                                <div className={`dropdown-menu ${isDropdownOpen ? 'dropdown-menu active' : 'dropdown-menu'} absolute w-32 text-center right-0 mt-3 bg-sub-color text-main-color rounded shadow-md`}>
                                    <ul className="list-none p-2 font-bold text-sm">
                                        <li onClick={() => handleNavigate(`/${username}`)} className="rounded-md cursor-pointer hover:bg-hover-main-color p-2 transition-colors duration-200 ease-in-out">
                                            <h3>프로필</h3>
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
                <div className="fixed right-1 top-1 mobile:hidden block cursor-pointer">
                    <FontAwesomeIcon className='text-base hover:text-hover-main-color' onClick={toggleMenu} icon={faBars} />
                </div>
            </nav>
        </>
    )
}

export default Header;