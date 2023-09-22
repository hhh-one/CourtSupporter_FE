import React, { useEffect, useState } from "react";
import '../style/Header.css'
import { useNavigate } from "react-router-dom";
import * as api from 'api';
import * as utils from 'utils';

const Header = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY || window.pageYOffset);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 맨위로 버튼
  const clickToTheTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [menuHeight, setMenuHeight] = useState(100);
  const [isDetailMenuVisible, setIsDetailMenuVisible] = useState(false);

  const handleMouseOver = () => {
    setMenuHeight(330);
    setIsDetailMenuVisible(true);
  };

  const handleMouseOut = () => {
    setMenuHeight(100);
    setIsDetailMenuVisible(false);
  };

  return (
    <>
      <div className="header-login-wrap">
        <div className="login-wrap">
          <p><a onClick={() => navigate(utils.URL.HOME.LOGIN)}>로그인</a></p>
        </div>
      </div>

      <div className="fix-header">
        <div className={scrollY < 20 ? "header-menu-wrap" : 'header-menu-wrap scrolled'} style={{ height: `${menuHeight}px` }}>
          <div className="logo-wrap">
            <a href="http://localhost:8788/">
              <img src={require('images/logo_.png').default} alt="재판조력자" />
            </a>
          </div>

          <div className="menu-wrap" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <ul class="menus">
              <a href="http://localhost:8788/announce/announceList">
                <li class="menu01">
                  <span class="">조력자등재신청</span>
                </li>
              </a>
              <a href="http://localhost:8788/guide/guideInfo">
                <li class="menu02">
                  <span class="">조력자신청안내</span>
                </li>
              </a>
              <a href="http://localhost:8788/usermypage/usermypage">
                <li class="menu03">
                  <span class="">My Page</span>
                </li>
              </a>
              <a href="http://localhost:8788/announce/announceList">
                <li class="menu04">

                  <span class="">공지사항</span>
                </li>
              </a>
            </ul>

            <nav>
              <div class="detail-menu-wrap">
                <div class="detail-menus">
                  <ul class="detail-menu01">
                    <a href="http://localhost:8788/announce/announceList">
                      <h2>조력자등재신청</h2>
                    </a>
                  </ul>
                  <ul class="detail-menu02">
                    <a href="http://localhost:8788/guide/guideInfo">
                      <h2>조력자 제도안내</h2>
                    </a>
                    <a href="http://localhost:8788/guide/guideProcedure">
                      <h2>조력자 신청절차안내</h2>
                    </a>
                  </ul>
                  <ul class="detail-menu03">
                    <a href="http://localhost:8788/usermypage/usermypage_applicationlist">
                      <h2>나의 신청현황</h2>
                    </a>
                    <a href="http://localhost:8788/usermypage/usermypage_activitylist">
                      <h2>나의 활동내역</h2>
                    </a>
                    <a href="http://localhost:8788/usermypage/usermypage">
                      <h2>나의 정보관리</h2>
                    </a>
                    <a href="http://localhost:8788/usermypage/usermypage_pauselist">
                      <h2>중지/해제신청 관리</h2>
                    </a>
                  </ul>
                  <ul class="detail-menu04">
                    <a href="http://localhost:8788/announce/announceList">
                      <h2>모집공고</h2>
                    </a>
                    <a href="http://localhost:8788/notice/noticeList">
                      <h2>공지사항</h2>
                    </a>
                    <a href="http://localhost:8788/faq/faqList">
                      <h2>FAQ</h2>
                    </a>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class={scrollY < 20 ? "to-the-top-wrap" : 'to-the-top-wrap active'} onClick={clickToTheTop}>
        <a>
          <img src={require('images/top_grey.png').default} />
        </a>
      </div>
    </>
  );
};

export default Header