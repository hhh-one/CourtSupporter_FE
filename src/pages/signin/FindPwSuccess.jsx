import React, { useState } from 'react';
import styled from 'styled-components';
import { Footer, Header } from '../../components';
import '../../style/FindPw.css';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from 'api';
import * as utils from 'utils';

const FindPwSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.user_id;

  const [inputData, setInputData] = useState({
    user_pw: '',
    user_id: '',
  })

  //에러 처리
  const [errorState, setErrorState] = useState({
    user_pw: { isRight: false, message: '' },
    confirm_pw: { isRight: false, message: '' }
  })

  const [confirmPw, setConfirmPw] = useState('');

  //비밀번호 유효성 검사
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const { name, value } = e.target;

    setInputData({ user_id: data, [name]: value });
    if (value.length < 8 || value.length > 16) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '8글자 이상 16글자 이하로 입력해주세요' }
      });
    } else if (!passwordRegex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '8~16자 문자 + 숫자 + 특수문자를 입력해주세요' }
      });
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    }
  }

  //비밀번호 확인
  const onChangeConfirmPw = (e) => {
    const inputValue = e.target.value;
    const name = e.target.name;

    setConfirmPw(inputValue);

    if (inputData.user_pw !== inputValue) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '비밀번호가 일치하지 않습니다' }
      });

    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    }
  }

  const onClickPwUpdate = (e) => {
    e.preventDefault();

    if (!errorState['user_pw'].isRight) {
      alert('재설정할 비밀번호를 입력해주세요')
      return
    }
    if (!errorState['confirm_pw'].isRight) {
      alert('비밀번호를 한 번 더 입력해주세요')
      return
    }

    api.apis.update_pw(inputData)
      .then(response => {
        console.log(response)
        alert('비밀번호가 변경되었습니다. 다시 로그인해주세요')
        navigate(utils.URL.HOME.LOGIN);
      }).catch(err => {
        console.log(err)
      })
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
                {!errorState['user_pw'].isRight && <div>{errorState['user_pw'].message}</div>}
                <div className="input-box input-box-left">
                  <label className='label-left' for="confirm-pw">비밀번호 확인</label>
                  <input type="password" id="confirm-pw" name='confirm_pw' value={confirmPw} onChange={onChangeConfirmPw} />
                </div>
                {!errorState['confirm_pw'].isRight && <div>{errorState['confirm_pw'].message}</div>}
                <div class="btnbox btnbox02">
                  <a href="#none" class="btnfb7" onClick={onClickPwUpdate}>비밀번호 재설정</a>
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