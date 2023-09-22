import React, { useEffect, useRef, useState } from 'react';
import { Footer, Header } from '../../components';
import { useNavigate } from 'react-router-dom';
import '../../style/Join.css'
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import * as api from 'api';
import * as utils from 'utils';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Join = () => {
  const navigate = useNavigate();

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

  //유효성 검사 & 오류메시지
  const [errorState, setErrorState] = useState({
    user_id: { isRight: false, message: '', messageName: '아이디는' },
    user_pw: { isRight: false, message: '' },
    user_pw_confirm: { isRight: false, message: '' },
    user_name: { isRight: false, message: '' },
    user_rrn1: { isRight: false, message: '' },
    user_rrn2: { isRight: false, message: '' },
    user_birthdate: { isRight: false, message: '' },
    email1: { isRight: false, message: '' },
    email2: { isRight: false, message: '' },
    user_phone1: { isRight: false, message: '' },
    user_phone2: { isRight: false, message: '' },
    user_phone3: { isRight: false, message: '' },
    user_bank_account: { isRight: false, message: '' },
    user_bank: { isRight: false, message: '' },
    user_bank_holder: { isRight: false, message: '' },
  });

  //아이디 정보 숨기기
  const [isIdHidden, setIsIdHidden] = useState(false);
  //비밀번호 정보 숨기기
  const [isPwHidden, setIsPwHidden] = useState(false);

  //주소 입력값
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  //은행 선택값
  const [isCustomBank, setIsCustomBank] = useState(true);

  //주소 선택
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

    setUsableId(false);
    const idCheckField = document.getElementById('idCheck');
    idCheckField.innerHTML = '중복확인';
    idCheckField.style.background = '#616161';
    idCheckField.style.color = '#fff';

    setFormData({ ...formData, [name]: value });
    if (value.length < 4) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '4글자 이상 입력해주세요' }
      });
      setIsIdHidden(true);
    } else if (!idRegex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '4~16자 영문/숫자를 입력해주세요' }
      });
      setIsIdHidden(true);
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
      setIsIdHidden(true);
    }
  };

  //아이디 중복확인
  const [usableId, setUsableId] = useState(false);

  const checkDuplicateId = (e) => {
    e.preventDefault();
    // 사용자가 입력한 아이디 가져오기
    const userId = formData.user_id;

    api.apis.check_id(userId)
      .then(response => {
        if (response.data === 1) {
          setErrorState({
            ...errorState,
            user_id: { isRight: false, message: '중복된 아이디입니다. 다시 입력해주세요' }
          });
          setUsableId(false);
        } else {
          setErrorState({
            ...errorState,
            user_id: { isRight: true, message: '' }
          });
          e.target.innerHTML = '✔';
          e.target.style.color = 'rgb(11, 38, 110)';
          e.target.style.background = 'none';
          setUsableId(true);
        }
      }).catch(err => {
        console.log(err)
      })
  }


  //password 유효성 검사
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (value.length < 8 || value.length > 16) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '8글자 이상 16글자 이하로 입력해주세요' }
      });
      setIsPwHidden(true);
    } else if (!passwordRegex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '8~16자 문자 + 숫자 + 특수문자를 입력해주세요' }
      });
      setIsPwHidden(true);
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
      setIsPwHidden(true);
    }
  };

  //비밀번호 미리보기 기능
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //비밀번호 확인
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onChangePasswordConfirm = (e) => {
    const { name, value } = e.target;
    setPasswordConfirm(value);

    if (formData.user_pw !== value) {
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

  //이름 유효성 검사
  const onChangeName = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (value.length <= 0) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '이름은 필수 입력사항입니다' }
      });
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    }
  }

  //주민번호 유효성 검사
  const [userRrn1, setUserRrn1] = useState('');
  const [userRrn2, setUserRrn2] = useState('');

  const onChangeUserRrn1 = (e) => {
    const rrn1Regex = /^[0-9]{6}$/;
    const { name, value } = e.target;
    setUserRrn1(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      user_rrn: `${value}-${userRrn2}`,
    }));
    if (value.length <= 0) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '주민등록번호는 필수입니다' }
      });
    } else if (rrn1Regex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '6자리의 앞자리를 바르게 입력해주세요' }
      });
    }
  }

  const onChangeUserRrn2 = (e) => {
    const rrn2Regex = /^[0-9]{7}$/;
    const { name, value } = e.target;
    setUserRrn2(value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      user_rrn: `${userRrn1}-${value}`,
    }));
    if (value.length <= 0) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '주민등록번호는 필수입니다' }
      });
    } else if (rrn2Regex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '7자리의 뒷자리를 바르게 입력해주세요' }
      });
    }
  }

  //생년월일 유효성 검사
  const onChangeBirthday = (e) => {
    const birthdayRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    const { name, value } = e.target;

    const inputValue = value.replace(/\D/g, '');

    if (inputValue.length === 5) {
      let formattedValue = inputValue.replace(/(\d{4})(\d{1})/, '$1-$2');
      setFormData({ ...formData, [name]: formattedValue });
    } else if (inputValue.length === 6) {
      let formattedValue = inputValue.replace(/(\d{4})(\d{2})/, '$1-$2');
      setFormData({ ...formData, [name]: formattedValue });
    } else if (inputValue.length === 7) {
      let formattedValue = inputValue.replace(/(\d{4})(\d{2})(\d{1})/, '$1-$2-$3');
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      let formattedValue = inputValue.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      setFormData({ ...formData, [name]: formattedValue });
    }

    if (!birthdayRegex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '올바른 생년월일을 입력하세요' }
      });
    } else {
      const [year, month, day] = value.split('-');
      const parsedYear = parseInt(year);
      const parsedMonth = parseInt(month);
      const parsedDay = parseInt(day);

      if (parsedMonth >= 1 && parsedMonth <= 12 && parsedDay >= 1 && parsedDay <= 31) {
        // 유효한 날짜인 경우
        setErrorState({
          ...errorState,
          [name]: { isRight: true, message: '' }
        });
        return;
      }
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '유효하지 않은 날짜 형식입니다' }
      });
    }
  }


  //이메일 유효성 검사
  const [emailId, setEmailId] = useState(''); //이메일 앞쪽 아이디
  const [emailProvider, setEmailProvider] = useState(''); // 이메일 서비스 선택
  const [customEmail, setCustomEmail] = useState(''); // 직접 입력한 이메일
  const [isEmail1, setIsEmail1] = useState(false);
  const [isEmail2, setIsEmail2] = useState(false);

  const onChangeEmailId = (e) => {
    const currentEmail = e.target.value;

    setEmailId(currentEmail);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_email: `${currentEmail}@${customEmail}`,
    }));

    if (currentEmail.length <= 0) {
      setErrorState({
        ...errorState,
        email1: { isRight: false, message: '이메일은 필수 입력사항입니다' }
      });
      setIsEmail1(false);
    } else {
      setErrorState({
        ...errorState,
        email1: { isRight: true, message: '' }
      });
      setIsEmail1(true);
    }
  }

  const handleSelectEmailChange = (e) => {
    const selectedValue = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      user_email: `${emailId}@${selectedValue}`,
    }));

    if (selectedValue === '') {
      // 선택한 값이 빈 문자열인 경우 직접 입력 가능
      setCustomEmail('');
      setErrorState({
        ...errorState,
        email2: { isRight: false, message: '이메일을 입력해주세요' }
      });
    } else {
      // 선택한 값이 빈 문자열이 아닌 경우 해당 값을 입력란에 설정하고 입력란 비활성화
      setCustomEmail(selectedValue);
      setErrorState({
        ...errorState,
        email2: { isRight: true, message: '' }
      });

    }
    setEmailProvider(selectedValue); // 선택한 값을 상태로 설정
  };

  const onChangeCustomEmail = (e) => {
    const emailRegex = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;

    setCustomEmail(e.target.value);
    setFormData((prevFormData) => (
      {
        ...prevFormData,
        user_email: `${emailId}@${e.target.value}`,
      }));

    if (emailRegex.test(e.target.value)) {
      setIsEmail2(true);
      setErrorState({
        ...errorState,
        email2: { isRight: true, message: '' }
      });
    } else {
      setIsEmail2(false);
      setErrorState({
        ...errorState,
        email2: { isRight: false, message: '이메일 형식에 맞게 입력해주세요' }
      });
    }
  }

  //이메일 인증번호 전송
  const [clickSendEmail, setClickSendEmail] = useState(false);
  const [rightEmailNum, setRightEmailNum] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setClickSendEmail(true);

    api.apis.send_email(formData)
      .then(response => {
        console.log(response.data)
        setRightEmailNum(response.data);
      }).catch(err => {
        console.log(err)
      })
  }

  //인증번호 입력
  const [emailNum, setEmailNum] = useState(''); //입력한 인증번호
  const [clickEmailNum, setClickEmailNum] = useState(false); //인증번호 확인버튼 클릭여부
  const [emailNumErrorState, setEmailNumErrorState] = useState({ isRight: false, message: '' });

  const onChangeEmailNum = (e) => {
    const value = e.target.value;
    setEmailNum(value);
  }

  //인증번호 확인
  const confirmEmailNum = (e) => {
    e.preventDefault();
    console.log(emailNum)
    console.log(rightEmailNum)
    console.log(emailNum == rightEmailNum)
    if (emailNum == rightEmailNum) {
      e.target.innerHTML = '✔';
      e.target.style.color = 'rgb(11, 38, 110)';
      e.target.style.background = 'none';
      setClickEmailNum(true);
      setEmailNumErrorState({ isRight: true, message: '' });
    } else {
      setEmailNumErrorState({ isRight: false, message: '인증번호를 정확히 입력해주세요' });
    }
  }

  //직업 저장
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
  const [isPhone1, setIsPhone1] = useState(false);
  const [isPhone2, setIsPhone2] = useState(false);
  const [isPhone3, setIsPhone3] = useState(false);

  const onChangePhone1 = (e) => {
    const phone3Regex = /^[0-9]{3}$/;
    const currentPhone = e.target.value;

    setPhone1(currentPhone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_phone: `${currentPhone}-${phone2}-${phone3}`,
    }));
    if (phone3Regex.test(currentPhone)) {
      setErrorState({
        ...errorState,
        user_phone1: { isRight: true, message: '' }
      });
      setIsPhone1(true);
    } else {
      setErrorState({
        ...errorState,
        user_phone1: { isRight: false, message: '휴대폰 번호를 정확히 입력해주세요' }
      });
      setIsPhone1(false);
    }
  }

  const onChangePhone2 = (e) => {
    const phone4Regex = /^[0-9]{4}$/;
    const currentPhone = e.target.value;

    setPhone2(currentPhone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_phone: `${phone1}-${currentPhone}-${phone3}`,
    }));
    if (phone4Regex.test(currentPhone)) {
      setErrorState({
        ...errorState,
        user_phone2: { isRight: true, message: '' }
      });
      setIsPhone2(true);
    } else {
      setErrorState({
        ...errorState,
        user_phone2: { isRight: false, message: '휴대폰 번호를 정확히 입력해주세요' }
      });
      setIsPhone2(false);
    }
  }

  const onChangePhone3 = (e) => {
    const phone4Regex = /^[0-9]{4}$/;
    const currentPhone = e.target.value;

    setPhone3(currentPhone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_phone: `${phone1}-${phone2}-${currentPhone}`,
    }));
    if (phone4Regex.test(currentPhone)) {
      setErrorState({
        ...errorState,
        user_phone3: { isRight: true, message: '' }
      });
      setIsPhone3(true);
    } else {
      setErrorState({
        ...errorState,
        user_phone3: { isRight: false, message: '휴대폰 번호를 정확히 입력해주세요' }
      });
      setIsPhone3(false);
    }
  }

  //계좌번호 유효성 검사
  const [customBank, setCustomBank] = useState('');

  const onChangeBankAccount = (e) => {
    const accountRegex = /^[0-9]{1,}$/;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (accountRegex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '계좌번호를 숫자만 입력해주세요' }
      });
    }
  }

  //계좌 은행 유효성 검사
  const [selectBank, setSelectBank] = useState('');

  const handleSelectBankChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: `${value}`,
    }));

    if (value === '') {
      // 선택한 값이 빈 문자열인 경우 직접 입력 가능
      setCustomBank('');
      setErrorState({
        ...errorState,
        user_bank: { isRight: false, message: '은행을 선택/입력해주세요' }
      });
    } else {
      // 선택한 값이 빈 문자열이 아닌 경우 해당 값을 입력란에 설정하고 입력란 비활성화
      setCustomBank(value);
      setErrorState({
        ...errorState,
        user_bank: { isRight: true, message: '' }
      });
    }
    setSelectBank(value);
  };

  const onChangeCustomBank = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setCustomBank(value);

    if (value.length > 1) {
      setIsCustomBank(true);
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '은행을 선택/입력해주세요' }
      });
    }
  }

  //계좌 예금주 유효성 검사
  const onChangeBankHolder = (e) => {
    const holderRegex = /^[a-zA-Z가-힣]{1,}$/;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (holderRegex.test(value)) {
      setErrorState({
        ...errorState,
        [name]: { isRight: true, message: '' }
      });
    } else {
      setErrorState({
        ...errorState,
        [name]: { isRight: false, message: '예금주를 정확히 입력해주세요' }
      });
    }
  }

  //모든 필드가 유효성을 만족하는지
  const isAllFieldsValid = () => {
    for (const key in errorState) {
      if (!errorState[key].isRight) {
        return false;
      }
    }
    return true;
  }


  // 필드 중 유효성을 만족하지 않는 첫 번째 필드에 focus
  const focusOnFirstError = () => {
    for (const key in errorState) {

      if (!errorState[key].isRight) {
        const errorField = document.querySelector(`input[name=${key}]`);
        if (errorField) {
          errorField.classList.add('error-red');
          errorField.focus();
        }
        break;
      }
    }
  }

  //회원가입 완료 버튼
  const handleJoinForm = (e) => {
    e.preventDefault();

    //모든 유효성 만족
    if (isAllFieldsValid()) {
      if (!usableId) {
        alert('아이디 중복 확인을 눌러주세요')
        return
      }

      if (!clickSendEmail) {
        alert('이메일로 인증번호 발송은 필수입니다')
        return
      }

      if (!clickEmailNum) {
        alert('알맞은 인증번호를 입력해주세요')
        return
      }

      api.apis.insert_users(formData)
        .then(response => {
          if (response.data === 1) {
            window.scrollTo(0, 0);
            navigate(utils.URL.HOME.JOINSUCCESS);
          }
        }).catch(err => {
          console.log(err)
        })
    } else {
      alert('필드를 알맞게 입력해주세요')
      focusOnFirstError();
    }
  }

  //취소 버튼
  const handleMain = (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8788/';
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
                  <h2>회원정보 입력</h2>
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
                            <label htmlFor="userId">
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
                                <a href="#" id="idCheck" className="check-btn" onClick={checkDuplicateId}>중복확인</a>
                              </span>
                            </span>
                            {isIdHidden ? null : <span className="input-desc" id='idTextCorrect'>4~16자까지 영문/숫자만 허용</span>}
                            {!errorState['user_id'].isRight && <span className="error-text-red">{errorState['user_id'].message}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userPassword">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              비밀번호
                            </label>
                          </th>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span className="input-btn">
                                <input type={showPassword ? "text" : "password"} name='user_pw' id="userPassword" value={formData.user_pw} onChange={onChangePassword} />
                              </span>
                              <span onClick={togglePasswordVisibility}>
                                {showPassword ? <AiFillEyeInvisible style={{ fontSize: '22px' }} /> : <AiFillEye style={{ fontSize: '22px' }} />}
                              </span>
                              {isPwHidden ? null : <span style={{ marginLeft: '10px' }}>8~16자까지 모든 문자 + 숫자 + 특수문자 : 영문 대소문자는 구별하여 입력해 주세요</span>}
                              {!errorState['user_pw'].isRight && <span style={{ marginLeft: '10px' }} className="error-text-red">{errorState['user_pw'].message}</span>}
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userPwCheck">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              비밀번호 확인
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="password" name='user_pw_confirm' id="userPwCheck" value={passwordConfirm} onChange={onChangePasswordConfirm} />
                            </span>
                            {!errorState['user_pw_confirm'].isRight && <span className="error-text-red">{errorState['user_pw_confirm'].message}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userName">
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
                            {!errorState['user_name'].isRight && <span className='error-text-red'>{errorState['user_name'].message}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userRRN">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              주민등록번호
                            </label>
                          </th>
                          <td>
                            <div className="input-btn">
                              <input type='hidden' name='user_rrn' id="userRRN" value={formData.user_rrn} />
                              <input type="text" name='user_rrn1' id='userRRN1' value={userRrn1} onChange={onChangeUserRrn1} />
                              <span>-</span>
                              <input type="password" id='userRRN2' name='user_rrn2' value={userRrn2} onChange={onChangeUserRrn2} />
                            </div>
                            {!errorState['user_rrn1'].isRight && <div className="error-text-red step-error">{errorState['user_rrn1'].message}</div>}
                            {!errorState['user_rrn2'].isRight && <div className="error-text-red step-error">{errorState['user_rrn2'].message}</div>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userBirth">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              생년월일
                            </label>
                          </th>
                          <td>
                            <span className="input-btn">
                              <input type="text" name='user_birthdate' id="userBirth" placeholder='숫자로 8자리 작성' value={formData.user_birthdate} onChange={onChangeBirthday} />
                            </span>
                            {!errorState['user_birthdate'].isRight && <span className='error-text-red'>{errorState['user_birthdate'].message}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userEmail">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              이메일
                            </label>
                          </th>
                          <td className="">
                            <input type='hidden' name='user_email' value={formData.user_email} />
                            <input type="text" title="전자우편아이디" className='input-email1 input-email-size' name="email1" id="userEmail" value={emailId} onChange={onChangeEmailId} />
                            <span>@</span>
                            {emailProvider === '' ? <input type="text" title="전자우편서비스" name="email2" id="email-provider" value={customEmail}
                              onChange={onChangeCustomEmail} /> : null}
                            <select className="selC" name="email_select" id="email_select" title="전자우편서비스선택" value={emailProvider} onChange={handleSelectEmailChange}>
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
                            <span className="id-check-btn">
                              <a href="#" id="EmailCheck" className="check-btn" onClick={sendEmail}>인증번호 발송</a>
                            </span>
                            {clickSendEmail && <div className='input-email-num'>

                              <input type='text' placeholder='인증번호 입력' value={emailNum} onChange={onChangeEmailNum} />

                              <span className="id-check-btn">
                                <a href="#" id="EmailCheck" className="check-btn" onClick={confirmEmailNum}>확인</a>
                              </span>

                              {!emailNumErrorState.isRight && <span className="error-text-red">{emailNumErrorState.message}</span>}</div>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userPhone">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              휴대폰번호
                            </label>
                          </th>
                          <td className="uptr04">
                            <input type='hidden' id="userPhone" name='user_phone' value={formData.user_phone} />
                            <input title="핸드폰앞자리" name="user_phone1" type="text" value={phone1} onChange={onChangePhone1} />
                            <span>-</span>
                            <input title="핸드폰중간자리" name="user_phone2" type="text" value={phone2} onChange={onChangePhone2} />
                            <span>-</span>
                            <input title="핸드폰뒷자리" name="user_phone3" type="text" value={phone3} onChange={onChangePhone3} />
                            {(!isPhone1 || !isPhone2 || !isPhone3) && <span className="error-text-red">{errorState['user_phone1'].message}</span>}
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userJob">
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
                                {isAddressOpen &&
                                  <div>
                                    <S.PostCode onComplete={handleDaumPostcodeComplete} autoClose />
                                    <S.ModalBackDrop></S.ModalBackDrop>
                                  </div>}
                              </div>
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">
                            <label htmlFor="userAccount">
                              <i className="required-img">
                                <span className="hidden">필수입력</span>
                              </i>
                              계좌
                            </label>
                          </th>
                          <td>
                            <span className='account-text4'>계좌번호</span>
                            <input type="text" title="계좌정보" name="user_bank_account" id="user_bank_account" value={formData.user_bank_account} onChange={onChangeBankAccount} />
                            {!errorState['user_bank_account'].isRight && <div className="error-text-red">{errorState['user_bank_account'].message}</div>}
                            <div className='account-div'>
                              <span className='account-text3'>은행명</span>
                              {selectBank == '' ? <input title="은행명" name="user_bank" type="text" id="user_bank" value={customBank} onChange={onChangeCustomBank} /> : null}
                              <select className="selC" name="user_bank" id="account_select" title="계좌정보선택" value={selectBank} onChange={handleSelectBankChange}>
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
                            {!errorState['user_bank'].isRight && <div className="error-text-red">{errorState['user_bank'].message}</div>}
                            <div className='account-div'>
                              <span className='account-text3'>예금주</span>
                              <input title="예금주" name="user_bank_holder" type="text" id="user_bank_holder" value={formData.user_bank_holder} onChange={onChangeBankHolder} />
                            </div>
                            {!errorState['user_bank_holder'].isRight && <div className="error-text-red">{errorState['user_bank_holder'].message}</div>}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="btnbox btnbox02">
                    <a href="#none" className="btn4d5" onClick={handleMain}>취소</a>
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
    z-index: 100;
  `,
  Wrap: styled.div`
    position: relative;
  `,
  ModalBackDrop: styled.div`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  `
}

export default Join;