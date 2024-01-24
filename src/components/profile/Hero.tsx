import React from 'react';
import Avartar from '../UI/Avartar.tsx';
import { IAuthHandler, IUser } from '../../types';

interface IHero {
    authHandler: IAuthHandler;
    setEditProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ authHandler, setEditProfileForm }: IHero) => {
    const { username, name, url } = authHandler.user?.user! as IUser;
    return (
        <div className='flex items-center p-6'>
            <Avartar width={28} height={28} url={url} name={username} />
            <div className='ml-5 text-base font-bold text-main-color'>
                <div className="flex items-center mb-3">
                    <h3>{name}</h3>
                    <button className='transition-colors duration-200 hover:text-white ease-in-out text-hover-main-color p-2 rounded-sm bg-main-color' onClick={() => setEditProfileForm(true)}>Edit Profile</button>
                </div>
                <h3 className='mr-5 font-normal'>{username}</h3>
            </div>
        </div>
    )
}

export default Hero;