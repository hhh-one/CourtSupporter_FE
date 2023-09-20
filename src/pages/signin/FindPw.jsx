import React, { useState } from 'react';
import styled from 'styled-components';
import { Footer, Header } from '../../components';
import '../../style/FindPw.css'
import { useNavigate } from 'react-router-dom';
import * as api from 'api';
import * as utils from 'utils';

const FindPw = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
  })

  const [emailNum, setEmailNum] = useState(''); //입력한 인증번호

  const onChangeId = (e) => {
    const { name, value } = e.target;

    setInputData({ ...inputData, [name]: value });
  }

  const onChangeName = (e) => {
    const { name, value } = e.target;

    setInputData({ ...inputData, [name]: value });
  }

  const onChangeEmail = (e) => {
    const { name, value } = e.target;

    setInputData({ ...inputData, [name]: value });
  }

  const onChangeEmailNum = (e) => {
    const inputValue = e.target.value;

    setEmailNum(inputValue);
  }

  //인증번호 전송
  const [clickSendEmail, setClickSendEmail] = useState(false);
  const [rightEmailNum, setRightEmailNum] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    //유효성 검사 처리 해야될 부분

    api.apis.find_users(inputData)
      .then(response => {
        console.log(response.data)

        //해당하는 회원이 있을 때
        if (response.data != '') {
          setClickSendEmail(true);

          api.apis.send_email(inputData)
            .then(response => {
              console.log("발송한 인증번호:" + response.data)
              setRightEmailNum(response.data);
            }).catch(err => {
              console.log(err)
              alert('이메일 발송에 실패했습니다. 다시 시도해주세요')
            })
        } else {
          alert('등록된 회원 정보가 없습니다')
          return
        }
      }).catch(err => {
        console.log(err)
      })
  }

  //인증번호 확인
  const confirmEmailNum = (e) => {
    e.preventDefault();

    if (!clickSendEmail) {
      alert('인증번호를 전송해주세요')
      return
    }

    if (emailNum == rightEmailNum) {

      navigate(utils.URL.HOME.PWSUCCESS, { state: inputData });
    } else {
      alert('알맞은 인증번호를 입력해주세요')
    }
  }

  return (
    <S.Wrap>
      <Header />
      <S.FindPw>
        <S.FindPwWrap>
          <S.FindPwTitle>비밀번호 찾기</S.FindPwTitle>
          <fieldset className="form-wrap">
            <div className="findpw-box-wrap">
              <div className="findpw-input">
                <div className='find-info'>
                  회원정보에 등록된 정보로 비밀번호를 찾을 수 있습니다.
                </div>
                <div className="input-box">
                  <label for="user-id">아이디</label>
                  <input type="text" id="user-id" name='user_id' value={inputData.user_id} onChange={onChangeId} />
                </div>
                <div className="input-box">
                  <label for="user-name">이름</label>
                  <input type="text" id="user-name" name='user_name' value={inputData.user_name} onChange={onChangeName} />
                </div>
                <div>
                  <span className="input-box">
                    <label for="user-email">이메일</label>
                    <input type="text" id="user-email" name='user_email' value={inputData.user_email} onChange={onChangeEmail} />
                  </span>
                  <span>
                    <a href="#none" id="sendEmail" className="check-btn" onClick={sendEmail}>인증번호 발송</a>
                  </span>
                </div>
                {clickSendEmail &&
                  <div className="input-box">
                    <label for="user-email-num">인증번호</label>
                    <input type="text" id="user-email-num" value={emailNum} onChange={onChangeEmailNum} />
                  </div>
                }
                <div class="btnbox btnbox02">
                  <a href="#none" class="btnfb7" onClick={confirmEmailNum}>확인</a>
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

export default FindPw;