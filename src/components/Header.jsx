import React from "react";
import '../style/Header.css'

const Header = () => {
  return (
    <div>
      <div className="header-login-wrap">
        <div className="login-wrap">
          <p>로그인</p>
        </div>
      </div>
      <div className="fix-header">
        <div className="header-menu-wrap">
          <div className="logo-wrap">
            <a href="#">
              <img src={require('images/logo_color.png').default} alt="재판조력자" />
            </a>
          </div>
          <div className="menu-wrap">
            <ul className="menus">
              <li className="menu01">
                <span className="">조력자등재신청</span>
              </li>
              <li className="menu02">
                <span className="">조력자신청안내</span>
              </li>
              <li className="menu03">
                <span className="">My Page</span>
              </li>
              <li className="menu04">
                <span className="">공지사항</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header