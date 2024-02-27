import React from 'react';
import dogVideo from '../../assets/runwithdog.mp4';
import Banner from '../../components/UI/Banner.tsx';
import Loader from '../../components/UI/Loader.tsx';
import useAuthEvent from '../../hooks/components/auth/useAuthEvent.tsx';
import useAuthState from '../../hooks/components/auth/useAuthState.tsx';

const AuthForm = ({ onSignUp, onLogin }) => {
  const authState = useAuthState();
  const { username, password, passwordCheck, name, email, url, onChange } = authState;
  const { signup, setSignup, onSubmit, error, loading } = useAuthEvent({ onSignUp, onLogin, authState });

  return (
    <div className='flex flex-col justify-start items-center h-screen'>
      {error && <Banner text={error} isAlert={true} />}
      <div className='relative w-full h-full'>
        <video className='object-cover w-full h-full' src={dogVideo} autoPlay loop muted controls={false} />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)]'>
          <div className='p-5 bg-glass flex flex-col justify-center items-center rounded-lg shadow-2xl'>
            <nav className='text-white text-base font-semibold flex self-start justify-self-start gap-4'>
              <h3 onClick={() => setSignup(!signup)} className={`${signup ? 'border-b-2' : ''} border-slate-700 cursor-pointer`}>회원가입</h3>
              <h3 onClick={() => setSignup(!signup)} className={`${signup ? '' : 'border-b-2'} border-stone-700 cursor-pointer`}>로그인</h3>
            </nav>
            <form className='flex flex-col items-center justify-center mt-2' onSubmit={onSubmit}>
              <input
                name='username'
                type='text'
                placeholder='Id'
                value={username}
                onChange={onChange}
                className={`placeholder:font-semibold outline-none transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50 font-light mb-1 bg-glass-md focus:outline-none hover:outline-none focus:bg-glass ${signup ? 'focus:border-slate-700' : 'focus:border-stone-700'} ${signup ? 'hover:border-slate-50' : 'hover:border-stone-50'} border-glass !important border-2 border-solid placeholder:text-[rgba(255,255,255,0.9)]`}
                required
              />
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                className={`placeholder:font-semibold outline-none transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50  font-light mb-1 bg-glass-md focus:outline-none hover:outline-none focus:bg-glass ${signup ? 'focus:border-slate-700' : 'focus:border-stone-700'} ${signup ? 'hover:border-slate-50' : 'hover:border-stone-50'} border-glass !important border-2 border-solid placeholder:text-[rgba(255,255,255,0.9)]`}
                onChange={onChange}
              />
              {signup && (
                <input
                  name='passwordCheck'
                  type='password'
                  placeholder='passwordCheck'
                  value={passwordCheck}
                  className={`placeholder:font-semibold outline-none transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50  font-light mb-1 bg-glass-md focus:outline-none hover:outline-none focus:bg-glass ${signup ? 'focus:border-slate-700' : 'focus:border-stone-700'} ${signup ? 'hover:border-slate-50' : 'hover:border-stone-50'} border-glass !important border-2 border-solid placeholder:text-[rgba(255,255,255,0.9)]`}
                  onChange={onChange}
                />)}
              {signup && (
                <input
                  name='name'
                  type='text'
                  placeholder='이름'
                  value={name}
                  onChange={onChange}
                  className={`placeholder:font-semibold outline-none transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50  font-light mb-1 bg-glass-md focus:outline-none hover:outline-none focus:bg-glass ${signup ? 'focus:border-slate-700' : 'focus:border-stone-700'} ${signup ? 'hover:border-slate-50' : 'hover:border-stone-50'} border-glass !important border-2 border-solid placeholder:text-[rgba(255,255,255,0.9)]`}
                  required
                />
              )}
              {signup && (
                <input
                  name='email'
                  type='email'
                  placeholder='이메일'
                  value={email}
                  onChange={onChange}
                  className={`placeholder:font-semibold outline-none transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50  font-light mb-1 bg-glass-md focus:outline-none hover:outline-none focus:bg-glass ${signup ? 'focus:border-slate-700' : 'focus:border-stone-700'} ${signup ? 'hover:border-slate-50' : 'hover:border-stone-50'} border-glass !important border-2 border-solid placeholder:text-[rgba(255,255,255,0.9)]`}
                  required
                />
              )}
              {signup && (
                <input
                  name='url'
                  type='url'
                  placeholder='프로필 사진URL(선택)'
                  value={url}
                  onChange={onChange}
                  className={`placeholder:font-semibold outline-none transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50 font-light mb-1 bg-glass-md focus:outline-none hover:outline-none focus:bg-glass ${signup ? 'focus:border-slate-700' : 'focus:border-stone-700'} ${signup ? 'hover:border-slate-50' : 'hover:border-stone-50'} border-glass !important border-2 border-solid placeholder:text-[rgba(255,255,255,0.9)]`}
                />
              )}
              <button className={`relative w-full h-full tracking-wide transition-colors duration-300 ease-in-out self-end px-4 py-2 mt-3 rounded-lg text-sm text-white font-semibold ${signup ? 'bg-main-color' : 'bg-main-color'} ${signup ? 'hover:bg-hover-main-color' : 'hover:bg-hover-main-color'}`} type='submit'>
                {loading ? (
                  <Loader kind='clip' isLoading={loading} color='#fff' />
                ) : (
                  signup ? '회원가입' : '로그인'
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>


  );
};

export default AuthForm;
