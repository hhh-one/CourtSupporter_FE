import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Footer, Header } from '../../components';
import '../../style/Join.css'
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const Join = () => {
  //input 입력값
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  //주민등록번호 처리 어쩌지 :)
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  //연락처 처리 어쩌지 :)
  //계좌 처리 어쩌지 :)

  //오류 메시지 상태저장
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  //input 유효성 검사
  const [isId, setIsId] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
  const [isName, setIsName] = useState(true);
  const [isBirthday, setIsBirthday] = useState(true);
  const [isEmail1, setIsEmail1] = useState(true);
  const [isEmail2, setIsEmail2] = useState(true);

  //이메일 선택
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [isCustomEmail2, setIsCustomEmail2] = useState(true);

  //주소 입력값
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [userAddress, setUserAddress] = useState({
    postcode: '',
    address: '',
  })

  let addressRef = useRef(null)
  useEffect(() => {
    const handleOutside = e => {
      if (
        addressRef.current &&
        !addressRef.current.contains(e.target)) {
        setIsAddressOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [addressRef])

  //id 유효성 검사
  const onBlurId = useCallback((e) => {
    const idRegex = /^[A-Za-z0-9]{4,16}$/;
    const currentId = e.target.value;
    const idTextCorrect = document.getElementById('idTextCorrect');

    setId(currentId);
    if (currentId.length < 4) {
      setIdMessage('4글자 이상으로 입력해주세요');
      setIsId(false);
    } else if (!idRegex.test(currentId)) {
      setIdMessage('4~16자 영문/숫자를 입력해주세요');
      setIsId(false);
    } else {
      idTextCorrect.style.display = 'hidden';
      setIsId(true);
    }
  }, []);

  //password 유효성 검사
  const onBlurPassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const currentPassword = e.target.value;

    setPassword(currentPassword);
    if (currentPassword.length < 8) {
      setPasswordMessage('8글자 이상으로 입력해주세요');
      setIsPassword(false);
    } else if (!passwordRegex.test(currentPassword)) {
      setPasswordMessage('8~16자 문자 + 숫자 + 특수문자를 입력해주세요');
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  //비밀번호 확인
  const onBlurPasswordConfirm = useCallback((e) => {
    const currentPasswordConfirm = e.target.value;

    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('');
      setIsPasswordConfirm(true);
    }
  }, [password]);

  //이름 유효성 검사
  const onBlurName = useCallback((e) => {
    const currentName = e.target.value;

    setName(currentName);
    if (currentName.length <= 0) {
      setNameMessage('이름은 필수 입력사항입니다');
      setIsName(false);
    } else {
      setIsName(true);
    }
  }, []);

  //생년월일 유효성 검사
  const onBlurBirthday = useCallback((e) => {
    const birthdayRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    const currentBirthday = e.target.value;

    setBirthday(currentBirthday);
    if (!birthdayRegex.test(currentBirthday)) {
      setBirthdayMessage('0000-00-00 형식으로 작성해주세요')
      setIsBirthday(false);
    } else {
      const [year, month, day] = currentBirthday.split('-');
      const parsedYear = parseInt(year);
      const parsedMonth = parseInt(month);
      const parsedDay = parseInt(day);

      if (parsedMonth >= 1 && parsedMonth <= 12 && parsedDay >= 1 && parsedDay <= 31) {
        // 유효한 날짜인 경우
        setIsBirthday(true);
        return;
      }
      setIsBirthday(false);
      setBirthdayMessage('유효하지 않은 날짜 형식입니다')
    }
  }, []);

  //주소 클릭 이벤트
  const handleAddressClick = () => {
    setIsAddressOpen(true);
  }

  //주소 저장
  const handleDaumPostcodeComplete = (data) => {
    console.log(data);
    setUserAddress({
      postcode: data.zonecode,
      address: data.address,
    });
  }

  //이메일 select 시 뒤의 input에 작성
  const handleSelectEmail2 = (e) => {
    const currentEmail2 = e.target.value;

    if (currentEmail2 !== '') {
      setEmail2(currentEmail2);
      setIsCustomEmail2(false);
    } else {
      setEmail2('');
      setIsCustomEmail2(true);
    }
  }

  //이메일 유효성 검사
  const onBlurEmail1 = useCallback((e) => {
    const email1Regex = /^[a-zA-Z0-9._-]{1,}$/;
    const currentEmail1 = e.target.value;

    setEmail1(currentEmail1);
    if (currentEmail1.length <= 0) {
      setEmailMessage('이메일을 입력해주세요');
      setIsEmail1(false);
    } else if (!email1Regex.test(currentEmail1)) {
      setEmailMessage('이메일 형식에 맞게 입력해주세요');
      setIsEmail1(false);
    } else {
      setEmailMessage('');
      setIsEmail1(true);
    }
  }, []);

  const onBlurEmail2 = useCallback((e) => {
    const email2Regex = /^[a-zA-Z0-9.-]{1,}\.[a-zA-Z]{2,4}$/;
    const currentEmail2 = e.target.value;

    setEmail2(currentEmail2);
    if (currentEmail2.length <= 0) {
      setEmailMessage('이메일을 입력해주세요');
      setIsEmail2(false);
    } else if (!email2Regex.test(currentEmail2)) {
      setEmailMessage('이메일 형식에 맞게 입력해주세요');
      setIsEmail2(false);
    } else {
      setEmailMessage('');
      setIsEmail2(true);
    }
  }, []);

  //휴대폰번호 유효성 검사
  const onBlurPhone3 = useCallback((e) => {
    const phone3Regex = /^[0-9]{3}$/;
    const currentPhone = e.target.value;

    if (phone3Regex.test(currentPhone)) {

    }
  }, []);

  const onBlurPhone4 = useCallback((index, e) => {
    const phone4Regex = /^[0-9]{4}$/;
    const currentPhone = e.target.value;

    if (phone4Regex.test(currentPhone)) {

    }
  }, []);

  if (addressRef === null) {
    return;
  }

  return (
    <S.Wrap>
      <Header />
      <div className="join">
        <div className="join-wrap">
          <div className="join-title">
            <h1>회원가입</h1>
          </div>

          <div className="contents-wrap">
            <div className="join-contents">
              <div className="contents-inner">
                <ol className="process">
                  <li className="first">
                    <span className="num">01.</span>
                    <span className="process-text">약관동의</span>
                  </li>
                  <li className="current">
                    <span className="num">02.</span>
                    <span className="process-text">회원정보 입력</span>
                  </li>
                  <li className="last">
                    <span className="num">03.</span>
                    <span className="process-text">회원가입 완료</span>
                  </li>
                </ol>

                <form action="#">
                  <h2>회원정보 필수입력</h2>
                  <p className="required-text">
                    <i className="required-img">
                      <span className="hidden">필수입력</span>
                    </i>
                    표시는 필수 입력사항입니다.
                  </p>

                  <div className="input-list">
                    <table className="tableT popT">
                      <colgroup>
                        <col className="input-title" />
                        <col className="input-content" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row">
                            <label for="userId">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              아이디
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="text" id="userId" maxLength="16" onBlur={onBlurId} />
                              <span className="id-check-btn">
                                <a href="#" id="idCheck" className="check-btn">중복확인</a>
                              </span>
                            </span>
                            {isId && <span className="input-desc" id='idTextCorrect'>4~16자까지 영문/숫자만 허용</span>}
                            {!isId && <span className="error-text-red">{idMessage}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userPassword">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              비밀번호
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="password" id="userPassword" maxLength="12" onBlur={onBlurPassword} />
                            </span>
                            {isPassword && <span>8~12자까지 모든 문자 + 숫자 + 특수문자 : 영문 대소문자는 구별하여 입력해 주세요</span>}
                            {!isPassword && <span className="error-text-red">{passwordMessage}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userPwCheck">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              비밀번호 확인
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="password" id="userPwCheck" maxLength="12" onBlur={onBlurPasswordConfirm} />
                            </span>
                            {!isPasswordConfirm && <span className="error-text-red">{passwordConfirmMessage}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userName">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              이름
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="text" id="userName" onBlur={onBlurName} />
                            </span>
                            {!isName && <span className='error-text-red'>{nameMessage}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userRRN">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              주민등록번호
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type='hidden' id="userRRN" />
                              <input type="text" id='userRRN1' />
                              <span>-</span>
                              <input type="password" id='userRRN2' />
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userBirth">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              생년월일
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="text" id="userBirth" placeholder='0000-00-00으로 작성' onBlur={onBlurBirthday} />
                            </span>
                            {!isBirthday && <span className='error-text-red'>{birthdayMessage}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userEmail">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              이메일
                            </label>
                          </th>
                          <td className="">
                            <input type="text" title="전자우편아이디" className='input-email1' name="email1" id="userEmail" maxLength="50" onBlur={onBlurEmail1} />
                            <span>@</span>
                            {isCustomEmail2 ? <input type="text" title="전자우편서비스" name="email2" id="email-provider" maxLength="40" onBlur={onBlurEmail2} /> : null}
                            <select className="selC" name="email_select" id="email_select" title="전자우편서비스선택" onChange={handleSelectEmail2} >
                              <option value='hanmail.net'>hanmail.net</option>
                              <option value='lycos.co.kr'>lycos.co.kr</option>
                              <option value='empal.com'>empal.com</option>
                              <option value='hotmail.com'>hotmail.com</option>
                              <option value='naver.com'>naver.com</option>
                              <option value='paran.com'>paran.com</option>
                              <option value='yahoo.co.kr'>yahoo.co.kr</option>
                              <option value='nate.com'>nate.com</option>
                              <option value='' selected="selected">직접입력</option>
                            </select>
                            {(!isEmail1 || ((!isEmail2 && isCustomEmail2) || (isEmail2 && !isCustomEmail2))) && <span className='error-text-red'>{emailMessage}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userPhone">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              휴대폰번호
                            </label>
                          </th>
                          <td className="uptr04">
                            <input type='hidden' />
                            <input title="핸드폰앞자리" name="hp_1" type="text" id="userPhone" maxLength='3' onBlur={onBlurPhone3} />
                            <span>-</span>
                            <input title="핸드폰중간자리" name="hp_2" type="text" maxLength='4' onBlur={onBlurPhone4} />
                            <span>-</span>
                            <input title="핸드폰뒷자리" name="hp_3" type="text" maxLength='4' onBlur={onBlurPhone4} />
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userJob">
                              직업
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="text" id="userJob" />
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userAddress">
                              주소
                            </label>
                          </th>
                          <td>
                            <span className="input-btn ">
                              <div className="uptr04">
                                <input type="text" id="userAddressNum" className="input-addr" placeholder="우편번호" value={userAddress.postcode} onClick={() => handleAddressClick()} />
                                <button type='button' id="addressFindBtn" className="check-btn" onClick={() => handleAddressClick()}>주소찾기</button>
                              </div>
                              <input type="text" id="userAddress" maxLength="50" className="input-addr input-addr-w" placeholder="주소" value={userAddress.address} onClick={() => handleAddressClick()} />
                              <br />
                              <input type="text" id="userAddressDetail" maxLength="50" className="input-addr-w" placeholder="상세주소" />
                              <div ref={addressRef}>
                                {isAddressOpen && <div><S.PostCode onComplete={handleDaumPostcodeComplete} autoClose /></div>}
                              </div>
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label for="userAccount">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              계좌
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="text" id="userAccount" maxLength="16" />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="btnbox btnbox02">
                    <a href="#none" className="btn4d5">취소</a>
                    <a href="#none" className="btnfb7">가입완료</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </S.Wrap>
  );
};

const S = {
  PostCode: styled(DaumPostcode)`
    position: fixed;
    top: calc(50vh - 230px);
    left: calc(50vw - 300px);
    height: 460px !important;
    width: 600px !important;
  `,
  Wrap: styled.div`
    position: relative;
  `,
}

export default Join;

