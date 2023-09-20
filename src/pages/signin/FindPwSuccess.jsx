import React, { useState } from 'react';
import styled from 'styled-components';
import { Footer, Header } from '../../components';
import '../../style/FindPw.css'
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from 'api';
import * as utils from 'utils';

const FindPwSuccess = () => {
  const location = useLocation();
  const data = location.state.user_id;

  const [inputData, setInputData] = useState({
    user_pw: '',
    user_id: '',
  })

  //에러 처리
  // const [errorState, setErrorState] = useState({
  //   user_pw: '',
  // })

  const [confirmPw, setConfirmPw] = useState('');

  const onChangePw = (e) => {
    const { name, value } = e.target;

    setInputData({ ...inputData, user_id: data, [name]: value });
  }

  const onChangeConfirmPw = (e) => {
    const inputValue = e.target.value;

    setConfirmPw(inputValue);

    // if (inputData.user_pw !== inputValue) {

    // }
  }

  return (
    <S.Wrap>
      <Header />
      <S.FindPw>
        <S.FindPwWrap>
          <S.FindPwTitle>비밀번호 재설정</S.FindPwTitle>
          <fieldset className="form-wrap">
            <div className="findpw-box-wrap">
              <div className="findpw-input">
                <div className="input-box input-box-left">
                  <label className='label-left' for="user-pw">비밀번호</label>
                  <input type="password" id="user-pw" name='user_pw' value={inputData.user_pw} onChange={onChangePw} />
                </div>
                <div className="input-box input-box-left">
                  <label className='label-left' for="confirm-pw">비밀번호 확인</label>
                  <input type="password" id="confirm-pw" name='confirm-pw' value={confirmPw} onChange={onChangeConfirmPw} />
                </div>
                <div class="btnbox btnbox02">
                  <a href="#none" class="btnfb7">비밀번호 재설정</a>
                </div>
              </div>
            </div>
          </fieldset>
        </S.FindPwWrap>
      </S.FindPw>
      <Footer />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div``,
  FindPw: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 150px;
  `,
  FindPwWrap: styled.div`
    width: 1280px;
    margin: 0 auto;
  `,
  FindPwTitle: styled.div`
    border-bottom: 2px solid rgb(51, 51, 51);
    padding-bottom: 10px;
    margin-bottom: 50px;
    margin-top: 20px;
    line-height: 1.3;
    letter-spacing: -1px;
    font-size: 1.5rem;
    font-weight: bold;
  `,
  FindPWForm: styled.div`
    vertical-align: middle;
    max-width: 420px;
    margin: 35px auto 50px;
  `,
}

export default FindPwSuccess;