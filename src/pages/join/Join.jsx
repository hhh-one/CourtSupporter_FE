import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Footer, Header } from '../../components';
import '../../style/Join.css'
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import * as api from 'api'

const Join = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    user_proper_num: '',
    user_pw: '',
    user_name: '',
    user_rrn: '',
    user_birthdate: '',
    user_email: '',
    user_phone: '',
    user_job: '',
    user_ar: '',
    user_ar_zonecode: '',
    user_ar_jibun: '',
    user_ar_detail: '',
    user_bank: '',
    user_bank_account: '',
    user_bank_holder: '',
    user_joindate: '',
    user_delete_yn: '',
  });

  //비밀번호 확인
  const [passwordConfirm, setPasswordConfirm] = useState('');
  //아이디 정보 숨기기
  const [isIdHidden, setIsIdHidden] = useState(false);
  //비밀번호 정보 숨기기
  const [isPwHidden, setIsPwHidden] = useState(false);

  //오류 메시지 상태저장
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  //input 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [isEmail1, setIsEmail1] = useState(false);
  const [isEmail2, setIsEmail2] = useState(false);

  //이메일 입력값
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [emailProvider, setEmailProvider] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  //주소 입력값
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  //계좌 선택값
  const [isCustomBank, setIsCustomBank] = useState(true);

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
  const onChangeId = (e) => {
    const idRegex = /^[A-Za-z0-9]{4,16}$/;
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (value.length < 4) {
      setIdMessage('4글자 이상으로 입력해주세요');
      setIsIdHidden(true);
      setIsId(false);
    } else if (!idRegex.test(value)) {
      setIdMessage('4~16자 영문/숫자를 입력해주세요');
      setIsIdHidden(true);
      setIsId(false);
    } else {
      setIsIdHidden(true);
      setIsId(true);
    }
  };


  //password 유효성 검사
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (value.length < 8 || value.length > 16) {
      setPasswordMessage('8글자 이상 16글자 이하로 입력해주세요');
      setIsPwHidden(true);
      setIsPassword(false);
    } else if (!passwordRegex.test(value)) {
      setPasswordMessage('8~16자 문자 + 숫자 + 특수문자를 입력해주세요');
      setIsPwHidden(true);
      setIsPassword(false);
    } else {
      setIsPwHidden(true);
      setIsPassword(true);
    }
  };

  //비밀번호 확인
  const onChangePasswordConfirm = (e) => {

    setPasswordConfirm(e.target.value);
    if (formData.user_pw !== e.target.value) {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('');
      setIsPasswordConfirm(true);
    }
  }

  //이름 유효성 검사
  const onChangeName = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (value.length <= 0) {
      setNameMessage('이름은 필수 입력사항입니다');
      setIsName(false);
    } else {
      setIsName(true);
    }
  }

  //주민번호 유효성 검사
  const [userRrn1, setUserRrn1] = useState('');
  const [userRrn2, setUserRrn2] = useState('');

  const onChangeUserRrn1 = (e) => {
    const rrn1Value = e.target.value;
    setUserRrn1(rrn1Value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      user_rrn: `${rrn1Value}-${userRrn2}`,
    }));
  }

  const onChangeUserRrn2 = (e) => {
    const rrn2Value = e.target.value;
    setUserRrn2(rrn2Value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      user_rrn: `${userRrn1}-${rrn2Value}`,
    }));
  }

  //생년월일 유효성 검사
  const onChangeBirthday = (e) => {
    const birthdayRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (!birthdayRegex.test(value)) {
      setBirthdayMessage('0000-00-00 형식으로 작성해주세요')
      setIsBirthday(false);
    } else {
      const [year, month, day] = value.split('-');
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
  }

  //이메일 select 시 뒤의 input에 작성
  const handleSelectEmailChange = (e) => {
    const currentEmail2 = e.target.value;

    if (currentEmail2 === '') {
      setCustomEmail('');
    } else {
      setEmailProvider(currentEmail2);
      setEmail2(currentEmail2);
      updateEmail();
    }
  }

  //이메일 유효성 검사
  const onChangeEmail1 = (e) => {
    const email1Regex = /^[a-zA-Z0-9]{1,}$/;
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
      updateEmail();
    }
  }

  const onChangeEmail2 = (e) => {
    const email2Regex = /^[a-zA-Z0-9.-]{1,}\.[a-zA-Z]{2,4}$/;
    const currentEmail2 = e.target.value;

    setEmail2(currentEmail2);
    setCustomEmail(currentEmail2);

    if (currentEmail2.length <= 0) {
      setEmailMessage('이메일을 입력해주세요');
      setIsEmail2(false);
    } else if (!email2Regex.test(currentEmail2)) {
      setEmailMessage('이메일 형식에 맞게 입력해주세요');
      setIsEmail2(false);
    } else {
      setEmailMessage('');
      setIsEmail2(true);
      updateEmail();
    }
  }

  const updateEmail = () => {
    console.log("1:" + email1);
    console.log("2:" + email2);
    const fullEmail = `${email1}@${email2}`;
    setFormData((prevFormData) => ({ ...prevFormData, user_email: fullEmail }));
  };

  //직업 유효성 검사
  const onChangeJob = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  //주소 클릭 이벤트
  const handleAddressClick = () => {
    setIsAddressOpen(true);
  }

  //주소 저장
  const handleDaumPostcodeComplete = (data) => {
    setFormData({
      ...formData,
      user_ar_jibun: data.jibunAddress,
      user_ar_zonecode: data.zonecode,
      user_ar: data.address,
    });
  }

  //상세주소 저장
  const onChangeAddrDetail = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  //휴대폰번호 유효성 검사
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  const onChangePhone1 = (e) => {
    const phone3Regex = /^[0-9]{3}$/;
    const currentPhone = e.target.value;

    setPhone1(currentPhone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_phone: `${currentPhone}-${phone2}-${phone3}`,
    }));
    if (phone3Regex.test(currentPhone)) {

    }
  }

  const onChangePhone2 = (e) => {
    const phone3Regex = /^[0-9]{4}$/;
    const currentPhone = e.target.value;

    setPhone2(currentPhone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_phone: `${phone1}-${currentPhone}-${phone3}`,
    }));
    if (phone3Regex.test(currentPhone)) {

    }
  }

  const onChangePhone3 = (e) => {
    const phone3Regex = /^[0-9]{4}$/;
    const currentPhone = e.target.value;

    setPhone3(currentPhone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_phone: `${phone1}-${phone2}-${currentPhone}`,
    }));
    if (phone3Regex.test(currentPhone)) {

    }
  }

  //계좌번호 유효성 검사
  const onChangeBankAccount = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  //계좌 은행 유효성 검사
  const onChangeBank = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  //계좌 예금주 유효성 검사
  const onChangeBankHolder = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleJoinForm = (e) => {
    e.preventDefault();

    api.apis.insert_users(formData)
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
  }

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

                <form>
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
                              <input type="text" name='user_id' id="userId" value={formData.user_id} onChange={onChangeId} />
                              <span className="id-check-btn">
                                <a href="#" id="idCheck" className="check-btn">중복확인</a>
                              </span>
                            </span>
                            {isIdHidden ? null : <span className="input-desc" id='idTextCorrect'>4~16자까지 영문/숫자만 허용</span>}
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
                              <input type="password" name='user_pw' id="userPassword" value={formData.user_pw} onChange={onChangePassword} />
                            </span>
                            {isPwHidden ? null : <span>8~16자까지 모든 문자 + 숫자 + 특수문자 : 영문 대소문자는 구별하여 입력해 주세요</span>}
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
                              <input type="password" id="userPwCheck" value={passwordConfirm} onChange={onChangePasswordConfirm} />
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
                              <input type="text" name='user_name' id="userName" value={formData.user_name} onChange={onChangeName} />
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
                              <input type='hidden' name='user_rrn' id="userRRN" value={formData.user_rrn} />
                              <input type="text" id='userRRN1' value={userRrn1} onChange={onChangeUserRrn1} />
                              <span>-</span>
                              <input type="password" id='userRRN2' value={userRrn2} onChange={onChangeUserRrn2} />
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
                              <input type="text" name='user_birthdate' id="userBirth" placeholder='0000-00-00으로 작성' value={formData.user_birthdate} onChange={onChangeBirthday} />
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
                            <input type='hidden' name='user_email' value={formData.user_email} />
                            <input type="text" title="전자우편아이디" className='input-email1' name="email1" id="userEmail" value={email1} onChange={onChangeEmail1} />
                            <span>@</span>
                            {emailProvider === '' ? <input type="text" title="전자우편서비스" name="email2" id="email-provider" value={customEmail} onChange={onChangeEmail2} /> : null}
                            <select className="selC" name="email_select" id="email_select" title="전자우편서비스선택" value={emailProvider} onChange={handleSelectEmailChange} >
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
                            {(!isEmail1 || !isEmail2) && <span className='error-text-red'>{emailMessage}</span>}
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
                            <input type='hidden' id="userPhone" name='user_phone' value={formData.user_phone} />
                            <input title="핸드폰앞자리" name="hp_1" type="text" value={phone1} onChange={onChangePhone1} />
                            <span>-</span>
                            <input title="핸드폰중간자리" name="hp_2" type="text" value={phone2} onChange={onChangePhone2} />
                            <span>-</span>
                            <input title="핸드폰뒷자리" name="hp_3" type="text" value={phone3} onChange={onChangePhone3} />
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
                              <input type="text" id="userJob" name='user_job' value={formData.user_job} onChange={onChangeJob} />
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
                                <input type="text" name='user_ar_zonecode' id="userAddressNum" className="input-addr" placeholder="우편번호" value={formData.user_ar_zonecode} onClick={() => handleAddressClick()} />
                                <button type='button' id="addressFindBtn" className="check-btn" onClick={() => handleAddressClick()}>주소찾기</button>
                              </div>
                              <input type="text" id="userAddress" name='user_ar' maxLength="50" className="input-addr input-addr-w" placeholder="주소" value={formData.user_ar} onClick={() => handleAddressClick()} />
                              <input type='hidden' name='user_ar_jibun' value={formData.user_ar_jibun} />
                              <br />
                              <input type="text" name='user_ar_detail' id="userAddressDetail" maxLength="50" className="input-addr-w" placeholder="상세주소" value={formData.user_ar_detail} onChange={onChangeAddrDetail} />
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
                            <span className='account-text4'>계좌번호</span>
                            <input type="text" title="계좌정보" name="user_bank_account" id="user_bank_account" value={formData.user_bank_account} onChange={onChangeBankAccount} />
                            <div className='account-div'>
                              <span className='account-text3'>은행명</span>
                              {isCustomBank ? <input title="은행명" name="user_bank" type="text" id="user_bank" value={formData.user_bank} /> : null}
                              <select className="selC" name="user_bank" id="account_select" title="계좌정보선택" value={formData.user_bank} onChange={onChangeBank}>
                                <option value='국민'>국민</option>
                                <option value='신한'>신한</option>
                                <option value='우리'>우리</option>
                                <option value='IBK'>IBK</option>
                                <option value='기업'>기업</option>
                                <option value='KEB'>KEB</option>
                                <option value='카카오뱅크'>카카오뱅크</option>
                                <option value='농협'>농협</option>
                                <option value='' selected>직접입력</option>
                              </select>
                            </div>
                            <div className='account-div'>
                              <span className='account-text3'>예금주</span>
                              <input title="예금주" name="user_bank_holder" type="text" id="user_bank_holder" value={formData.user_bank_holder} onChange={onChangeBankHolder} />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="btnbox btnbox02">
                    <a href="#none" className="btn4d5">취소</a>
                    <a href="#none" className="btnfb7" onClick={handleJoinForm}>가입완료</a>
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
