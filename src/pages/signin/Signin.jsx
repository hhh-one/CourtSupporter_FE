import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import '../../style/Signin.css'

import * as utils from 'utils'
import * as api from 'api'
import { Header, Footer } from '../../components';

const Signin = () => {
  const navigate = useNavigate()

  const getUserList = () => {
    api.apis.get_users().then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Header />

      <div className="signin">
        <div className="signin-wrap">
          <div className="signin-title">
            <h1 onClick={() => getUserList()}>로그인</h1>
          </div>

          <div className="tab-wrap">
            <ul className="tab-user">
              <li>
                <span>
                  <a href="#" className="active">사용자</a>
                </span>
              </li>
              <li>
                <span>
                  <a href="#">관리자</a>
                </span>
              </li>
            </ul>
          </div>

          <fieldset className="form-wrap">
            <div className="signin-box-wrap">
              <div className="signin-input">
                <div className="input-box">
                  <label for="user-id">아이디</label>
                  <input type="text" id="user-id" placeholder="아이디를 입력하세요" />
                </div>
                <p className="input-info">영문, 숫자 조합하여 4~16자 입력</p>
                <div className="input-box">
                  <label for="user-pw">비밀번호</label>
                  <input type="password" id="user-pw" placeholder="비밀번호를 입력하세요" />
                </div>
                <p className="id-save">
                  <input type="checkbox" id="id-save-check" className="id-check" />
                  <label for="id-save-check"><span></span>아이디 저장</label>
                </p>
                <div className="signin-btn-wrap">
                  <button type="button" className="button-type-blue login-btn">아이디 로그인</button>
                </div>
              </div>
              <div className="signin-other-wrap">
                <div className="other-box">
                  <span className="join-tap">
                    <a onClick={() => navigate(utils.URL.HOME.JOINACCEPT)}>회원가입</a>
                  </span>
                  <div className="find-info">
                    <ul>
                      <li className="find-li">
                        <a href="#" className="find-id">아이디 찾기</a>
                      </li>
                      <li className="find-li">
                        <a href="#" className="find-pw">비밀번호 찾기</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <div className="infor-text-box">
            <strong>확인하세요!</strong>
            <p className="inbox-text inbox-text-red">사용자, 관리자 선택은 필수입니다.</p>
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