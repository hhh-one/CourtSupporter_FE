import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Footer, Header } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from 'api';
import * as utils from 'utils';
import '../../style/FindResult.css'

const FindIdSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <S.Wrap>
      <Header />
      <S.FindId>
        <S.FindIdWrap>
          <S.FindIdTitle>아이디 찾기 결과</S.FindIdTitle>
          <S.FindIdResultForm>
            <S.FindIdResultTitle>요청하신 아이디 찾기 결과입니다</S.FindIdResultTitle>
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <S.FindIdResult>입력한 정보로 조회한 아이디는 <S.IdResult>{data}</S.IdResult> 입니다.</S.FindIdResult>
            <div className="result-form  btnbox02">
              <a href="#none" className="btnfb7" onClick={(e) => {
                e.preventDefault();
                navigate(utils.URL.HOME.LOGIN)
              }}>로그인</a>
              <a href='#none' className="btnfb7 btn-grey" onClick={(e) => {
                e.preventDefault();
                navigate(utils.URL.HOME.PWFIND)
              }}>비밀번호 찾기</a>
            </div>
          </S.FindIdResultForm>
        </S.FindIdWrap>
      </S.FindId>
      <Footer />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div``,
  FindId: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 150px;
  `,
  FindIdWrap: styled.div`
    width: 1280px;
    margin: 0 auto;
  `,
  FindIdTitle: styled.div`
    border-bottom: 2px solid rgb(51, 51, 51);
    padding-bottom: 10px;
    margin-bottom: 50px;
    margin-top: 20px;
    line-height: 1.3;
    letter-spacing: -1px;
    font-size: 1.5rem;
    font-weight: bold;
  `,
  FindIdResultForm: styled.div`
    margin: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 54px 99px 55px 99px;
    border: 1px solid #d3d3d3;
    vertical-align: middle;
    width: 100%;
  `,
  FindIdResultTitle: styled.div`
    font-size: 30px;
    font-weight: 900;
    letter-spacing: -1px;
    background-color: #eee;
    margin-bottom: 50px;
    padding: 4px 200px;
  `,
  FindIdResult: styled.div`
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -1px;
  `,
  IdResult: styled.span`
    font-size: 24px;
    color: rgb(11, 38, 110);
  `
}

export default FindIdSuccess;