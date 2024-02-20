import React from 'react';
import Avartar from '../UI/Avartar.tsx';
import { IAuthHandler, IAuthorizedUser, IUser } from '../../types';

interface IHero {
    authHandler: IAuthHandler;
    setEditProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({ authHandler, setEditProfileForm }: IHero) => {
    const { user } = authHandler.user as IAuthorizedUser;
    const { username, name, url } = user ?? (authHandler.user as unknown as IUser);
    return (
        <div className='flex gap-3 items-center p-6'>
            <Avartar width={64} height={64} url={url} name={username} />
            <div className='text-sm font-semibold text-span-color'>
                <div className="flex gap-3 items-center mb-3 text-span-color">
                    <h3>{name}</h3>
                    <button className="transition-colors duration-200 hover:text-white ease-in-out text-hover-main-color p-2 rounded-full bg-main-color" onClick={() => setEditProfileForm(true)}>프로필 업데이트</button>
                </div>
                <h3 className='mr-5 font-normal'>{username}</h3>
            </div>
        </div>
    )
}

export default Hero;