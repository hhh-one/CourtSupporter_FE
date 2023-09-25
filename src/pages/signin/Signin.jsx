import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCookies } from 'react-cookie';
import '../../style/Signin.css'

import * as utils from 'utils'
import * as api from 'api'
import { Header, Footer } from '../../components';
import axios from 'axios';

const Signin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Refresh']);
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({
    member_id: "",
    member_password: "",
    member_role: ""
  })

  const clickEnterKeyID = (e) => {
    const idInput = document.getElementById('user-id');
    const pwInput = document.getElementById('user-pw');

    if (e.key === 'Enter') {
      if (loginInfo.member_id === '') {
        idInput.focus();
        alert('아이디를 입력해주세요')
        return;
      }
      pwInput.focus();
    }
  }

  const clickEnterKey = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  }

  const login = () => {
    const idInput = document.getElementById('user-id');

    api.apis.login(loginInfo).then(response => {
      setCookie('Authorization', response.data.accessToken, {
        path: '/',
      });
      setCookie('Refresh', response.data.refreshToken, {
        path: '/',
      });

      window.location.href = 'http://43.202.60.221/';
    }).catch(err => {
      setLoginInfo({
        member_id: '',
        member_password: '',
        member_role: ''
      })
      console.log(err);
      idInput.focus();
      alert('로그인에 실패하였습니다. 다시 한 번 시도해주세요.')
    })
  }

  return (
    <>
      <Header />

      <div className="signin">
        <div className="signin-wrap">
          <div className="signin-title">
            <h1>로그인</h1>
          </div>

          <fieldset className="form-wrap">
            <div className="signin-box-wrap">
              <div className="signin-input">
                <div className="input-box">
                  <label for="user-id">아이디</label>
                  <input type="text" onChange={e => setLoginInfo({
                    ...loginInfo,
                    member_id: e.target.value
                  })} id="user-id" placeholder="아이디를 입력하세요" value={loginInfo.member_id} onKeyUp={clickEnterKeyID} />
                </div>
                <p className="input-info">영문, 숫자 조합하여 4~16자 입력</p>
                <div className="input-box">
                  <label for="user-pw">비밀번호</label>
                  <input type="password" onChange={e => setLoginInfo({
                    ...loginInfo,
                    member_password: e.target.value
                  })} id="user-pw" placeholder="비밀번호를 입력하세요" value={loginInfo.member_password} onKeyUp={clickEnterKey} />
                </div>
                <div className="signin-btn-wrap">
                  <button type="button" onClick={() => login()} className="button-type-blue login-btn">아이디 로그인</button>
                </div>
              </div>
              <div className="signin-other-wrap">
                <div className="other-box">
                  <span className="join-tap">
                    <a href='#none' onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo(0, 0);
                      navigate(utils.URL.HOME.JOINACCEPT)
                    }}>회원가입</a>
                  </span>
                  <div className="find-info">
                    <ul>
                      <li className="find-li">
                        <a href='#none' className="find-id" onClick={(e) => { e.preventDefault(); navigate(utils.URL.HOME.IDFIND) }}>아이디 찾기</a>
                      </li>
                      <li className="find-li">
                        <a href='#none' className="find-pw" onClick={(e) => { e.preventDefault(); navigate(utils.URL.HOME.PWFIND) }} >비밀번호 찾기</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <div className="infor-text-box">
            <strong>확인하세요!</strong>
            <p className="inbox-text">아이디 로그인 시, 서비스가 일부 제한될 수 있습니다.</p>
            <p className="inbox-text">개인정보 보호를 위해 비밀번호 5회 이상 오류 시, 비밀번호 재설정이 필요합니다.</p>
            <p className="inbox-text">비밀번호는 주기적(6개월)으로 변경하시고, 서비스 이용 후 반드시 로그아웃 하시기 바랍니다.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signin;