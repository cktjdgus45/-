import React, { useState } from 'react';
import dogVideo from '../assets/runwithdog.mp4';
import Banner from '../components/UI/Banner.tsx';
import Loader from '../components/UI/Loader.tsx';

const AuthForm = ({ onSignUp, onLogin }) => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setURL] = useState('');
  const [text, setText] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signup) {
        await onSignUp(username, password, name, email, url);
      } else {
        await onLogin(username, password);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const setError = (error) => {
    setText(error.toString());
    setIsAlert(true);
  };
  console.log(loading);
  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'url':
        return setURL(value);
      case 'signup':
        return setSignup(checked);
      default:
    }
  };
  return (
    <div className='flex flex-col justify-start items-center h-screen'>
      <div className='relative w-full h-full'>
        <video src={dogVideo} autoPlay loop muted controls={false} />
        <Banner text={text} isAlert={isAlert} />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)]'>
          <div className='p-5 bg-glass flex flex-col justify-center items-center rounded-lg shadow-lg'>
            <nav className='text-white text-base font-semibold flex self-start justify-self-start gap-4'>
              <h3 onClick={() => setSignup(!signup)} className={`${signup ? 'border-b-2' : ''} border-cyan-300 cursor-pointer`}>회원가입</h3>
              <h3 onClick={() => setSignup(!signup)} className={`${signup ? '' : 'border-b-2'} border-pink-300 cursor-pointer`}>로그인</h3>
            </nav>
            <form className='flex flex-col items-center justify-center mt-2' onSubmit={onSubmit}>
              <input
                name='username'
                type='text'
                placeholder='Id'
                value={username}
                onChange={onChange}
                className={`transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50 font-light mb-1 bg-glass-md focus:bg-glass ${signup ? 'focus:border-cyan-300' : 'focus:border-pink-300'} ${signup ? 'hover:border-cyan-50' : 'hover:border-pink-50'} border-glass border-[0.7px] border-solid placeholder:text-[rgba(0,0,0,0.6)]`}
                required
              />
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                className={`transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50  font-light mb-1 bg-glass-md focus:bg-glass ${signup ? 'focus:border-cyan-300' : 'focus:border-pink-300'} ${signup ? 'hover:border-cyan-50' : 'hover:border-pink-50'} border-glass border-[0.7px] border-solid placeholder:text-[rgba(0,0,0,0.6)]`}
                onChange={onChange}
              />
              {signup && (
                <input
                  name='name'
                  type='text'
                  placeholder='이름'
                  value={name}
                  onChange={onChange}
                  className={`transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50  font-light mb-1 bg-glass-md focus:bg-glass ${signup ? 'focus:border-cyan-300' : 'focus:border-pink-300'} ${signup ? 'hover:border-cyan-50' : 'hover:border-pink-50'} border-glass border-[0.7px] border-solid placeholder:text-[rgba(0,0,0,0.6)]`}
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
                  className={`transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50  font-light mb-1 bg-glass-md focus:bg-glass ${signup ? 'focus:border-cyan-300' : 'focus:border-pink-300'} ${signup ? 'hover:border-cyan-50' : 'hover:border-pink-50'} border-glass border-[0.7px] border-solid placeholder:text-[rgba(0,0,0,0.6)]`}
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
                  className={`transition-colors duration-200 ease-in-out px-4 py-2 text-sm text-neutral-50 font-light mb-1 bg-glass-md focus:bg-glass ${signup ? 'focus:border-cyan-300' : 'focus:border-pink-300'} ${signup ? 'hover:border-cyan-50' : 'hover:border-pink-50'} border-glass border-[0.7px] border-solid placeholder:text-[rgba(0,0,0,0.6)]`}
                />
              )}
              <button className={`tracking-wide transition-colors duration-300 ease-in-out self-end px-1 py-2 mt-3 rounded-lg text-sm text-white font-semibold ${signup ? 'bg-cyan-300' : 'bg-pink-300'} ${signup ? 'hover:bg-cyan-500' : 'hover:bg-pink-500'}`} type='submit'>
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
