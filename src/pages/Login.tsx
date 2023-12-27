import React, { useState } from 'react';
import Banner from '../components/Banner.tsx';

const Login = ({ onSignUp, onLogin }) => {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setURL] = useState('');
  const [text, setText] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      console.log(username, password, name, email, url)
      onSignUp(username, password, name, email, url).catch(setError);
    } else {
      onLogin(username, password).catch(setError);
    }
  };

  const setError = (error) => {
    setText(error.toString());
    setIsAlert(true);
  };

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
    <>
      <Banner text={text} isAlert={isAlert} />
      <form className='' onSubmit={onSubmit}>
        <input
          name='username'
          type='text'
          placeholder='Id'
          value={username}
          onChange={onChange}
          className=''
          required
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          className=''
          onChange={onChange}
        />
        {signup && (
          <input
            name='name'
            type='text'
            placeholder='이름'
            value={name}
            onChange={onChange}
            className=''
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
            className=''
            required
          />
        )}
        {signup && (
          <input
            name='url'
            type='url'
            placeholder='프로필 사진'
            value={url}
            onChange={onChange}
            className=''
          />
        )}
        <button className='' type='submit'>
          {signup ? '회원가입' : '로그인'}
        </button>
      </form>
      <div className='form-devider'>
        <div className='flex'>
          <label htmlFor='signup'>{signup ? '이미 가지고 있는 계정이 있습니까?' : '회원가입이 처음이신가요?'}</label>
          <div onClick={() => setSignup(!signup)} className='cursor-pointer'>
            {signup ? "로그인" : "회원가입"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
