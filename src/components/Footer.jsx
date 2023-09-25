import React from "react";
import '../style/Header.css'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div id="footer-box">
          <div className="logo-footer">
            <img src={require('images/logo_black_tr.png').default} alt="재판조력자" />
          </div>
          <ul className="footer-menu">
            <li></li>
          </ul>
          <p className="footer-notice clear">
            <span>"홈페이지 이용/장애문의" TEL 02.3480.1715 (평일 9시~18시)</span>
          </p>
          <address>
            " Copyright 2023 "
            <a href="#" target="_blank" title="대한민국 법원 공식 홈페이지 이동">Supreme Court of Korea.</a>
            "&nbsp;All Right Reserved. "
          </address>
          <div className="goto-family">
            <form id="family" name="site" action="#">
              <fieldset>
                <select id="site-search" title="관련사이트바로가기">
                  <option value>관련사이트</option>

                  <optgroup label="법원">
                    <option value="">대한민국법원</option>
                  </optgroup>

                  <optgroup label="대법원사이트">
                    <option value="">전자민원센터</option>
                    <option value="">종합법률정보</option>
                    <option value="">대법원 나홀로소송</option>
                    <option value="">대법원 전자소송 홈페이지</option>
                    <option value="">인터넷등기소</option>
                    <option value="">법원경매정보</option>
                  </optgroup>

                </select>
                <span className="btngoto mar13">
                  <a href="#none" title="선택된 관련사이트로 이동하는 버튼" onclick="moveSite();">이동</a>
                </span>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer