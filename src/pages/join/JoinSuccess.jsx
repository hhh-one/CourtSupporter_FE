import React from 'react';
import { Footer, Header } from '../../components';
import '../../style/JoinSuccess.css'
import { useNavigate } from 'react-router-dom';
import * as utils from 'utils'

const JoinSuccess = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div class="join">
        <div class="join-wrap">
          <div class="join-title">
            <h1>회원가입 완료</h1>
          </div>

          <div class="contents-wrap">
            <div class="success-contents">
              <div class="contents-inner">
                <ol class="process">
                  <li class="first">
                    <span class="num">01.</span>
                    <span class="process-text">약관동의</span>
                  </li>
                  <li>
                    <span class="num">02.</span>
                    <span class="process-text">회원정보 입력</span>
                  </li>
                  <li class="last current">
                    <span class="num">03.</span>
                    <span class="process-text">회원가입 완료</span>
                  </li>
                </ol>

                <div class="success-wrap">
                  <div class="success-checkmark">
                    <div class="check-icon">
                      <span class="icon-line line-tip"></span>
                      <span class="icon-line line-long"></span>
                      <div class="icon-circle"></div>
                      <div class="icon-fix"></div>
                    </div>
                  </div>
                  <center>
                    <div class="success-text">
                      <p class="text-title">회원가입이 완료되었습니다.</p>
                      <p class="text-info">추가 정보를 입력하시면 생활에 필요한 정보를 한 번에 안내받고, 반복되는 정보입력의 불편을 해소할 수 있습니다.</p>
                    </div>
                    <div class="btnbox btnbox02">
                      <a class="btnfb7" onClick={() => navigate(utils.URL.HOME.LOGIN)}>로그인화면 가기</a>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JoinSuccess;