import axios from 'axios';
import { IP_ADDRESS } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ERRORS from '../utils/customedError';

export default class User {
  constructor() {
    this.emailExists = true;
    this.verified = false;
    this.nameDuplicated = true;
  }

  /** 커스텀 에러 처리 
   - errorName : 백엔드 확인용 에러명
   - errorName.notice : 유저 확인용 메세지
  */
  async handleError(error) {
    if (error.response && error.response.data && error.response.data.code) {
      const errorName = Object.values(ERRORS).find(
        (obj) => obj.code === error.response.data.code
      );
      const userNotice = errorName.notice;
      console.log(`에러 내용: ${JSON.stringify(errorName)}`);
      toast.error(`${userNotice}`);
      return error.response.data.code;
    } else if (!error.response) {
      console.log('서버와 연결되어있지 않습니다');
      toast.error(`서버와 연결되어있지 않습니다`);
    } else {
      console.log(`확인되지 않은 에러, ${error}`);
      toast.error(`알 수 없는 에러가 발생했습니다`);
    }
  }

  /** 이메일 인증 요청 : 회원가입용
   - 요청 Body 
        - email 이메일
        - emailType 회원가입 | 비밀번호 변경
        - socialType 서비스 타입
   */
  async requestEmailForSignUp(email, emailType, socialType) {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/email`, {
        email,
        emailType,
        socialType,
      });
      console.log(`이메일: ${email} 회원가입 유형: ${socialType}`);
      if (response.status === 204) {
        this.emailExists = false;
        toast.success('인증번호가 발송되었습니다');
      } else {
        return;
      }
    } catch (error) {
      this.emailExists = true;
      this.handleError(error);
    }
  }

  /** 이메일 인증 요청 : 비밀번호 재설정용
   - 요청 Body
        - email 이메일
        - emailType 회원가입 | 비밀번호 변경
        - socialType 서비스 타입
  */
  async requestEmailForReset(email, emailType, socialType) {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/email`, {
        email,
        emailType,
        socialType,
      });
      console.log(`이메일: ${email} 회원가입 유형: ${socialType}`);
      if (response.status === 204) {
        this.emailExists = true;
        toast.success('인증번호가 발송되었습니다');
      } else {
        return;
      }
    } catch (error) {
      this.emailExists = false;
      this.handleError(error);
    }
  }

  /** 이메일 인증 확인
   - 요청 Body
        - email 이메일
        - emailType 회원가입 | 비밀번호 변경
        - socialType 서비스 타입
        - inputNum 인증번호
   */
  async checkCodeVerification(email, emailType, socialType, inputNum) {
    const NO_CODE_ERROR = '인증번호를 입력해주세요';
    if (!inputNum) {
      toast.error(NO_CODE_ERROR);
      return;
    }
    try {
      const response = await axios.post(
        `${IP_ADDRESS}/auth/register/authentication/number`,
        {
          email,
          emailType,
          inputNum,
          socialType,
        }
      );
      if (response.status === 204) {
        this.verified = true;
        toast.success('인증 완료!');
      } else {
        return;
      }
    } catch (error) {
      this.verified = false;
      this.handleError(error);
    }
  }

  /** 닉네임 중복 확인
   - 요청 Body
        - nickName 닉네임 
  */
  async checkNameDuplication(nickName) {
    try {
      const response = await axios.post(
        `${IP_ADDRESS}/auth/register/authentication/nickname`,
        {
          nickName,
        }
      );
      if (response.status === 204) {
        this.nameDuplicated = false;
        toast.success('사용 가능한 닉네임입니다');
      } else {
        return;
      }
    } catch (error) {
      this.nameDuplicated = true;
      this.handleError(error);
    }
  }

  /** 회원가입 요청
   - 요청 Body
        - email 이메일
        - nickName 닉네임 
        - password 비밀번호
        - socialType 서비스 타입
  
  - 요청 Header
        - 'Content-Type': 'application/json;charset=UTF-8'
        - Accept: 'application/json'
  */
  async signUp(email, password, nickName, socialType) {
    const URL = `${IP_ADDRESS}/auth/register`;
    try {
      const response = await axios.post(
        URL,
        {
          email: email,
          password: password,
          nickName: nickName,
          socialType: socialType,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
          },
        }
      );
      if (response.status === 204) {
        toast.success('회원가입이 완료되었습니다');
        setTimeout(() => {
          useNavigate('/login');
        }, 2000);
      } else {
        return;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  /** 로그인
   - 요청 Body
        - email 이메일
        - password 비밀번호
        - socialType 서비스 타입
  
  - 요청 Header
        - 'Content-Type': 'application/json;charset=UTF-8'
        - Accept: 'application/json'
        - 'Access-Control-Allow-Origin': '*'
  */
  async login(email, password, socialType) {
    const URL = `${IP_ADDRESS}/token/login`;
    try {
      const response = await axios.post(
        URL,
        {
          email: email,
          password: password,
          socialType: socialType,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      if (response.headers) {
        localStorage.setItem(
          'accessToken',
          response.headers['authorization-access']
        );
        localStorage.setItem(
          'refreshToken',
          response.headers['authorization-refresh']
        );
        localStorage.setItem(
          'nickName',
          decodeURIComponent(response.headers.get('nickName'))
        );
        localStorage.setItem('email', email);
        localStorage.setItem('socialId', response.headers.get('socialId'));
        localStorage.setItem('socialType', socialType);
        toast.success('로그인 되었습니다!');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  /** 로그아웃
   - 요청 Header
        - accessToken 액세스 토큰
   */
  async logout() {
    const URL = `${IP_ADDRESS}/token/logout`;
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            'Authorization-Access': accessToken,
          },
        }
      );

      if (response.status === 204) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('socialId');
        localStorage.removeItem('nickName');
        localStorage.removeItem('email');
        localStorage.removeItem('socialType');

        toast.success('로그아웃 되었습니다!');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  /** 비밀번호 재설정
   - 요청 Body :
        - email 이메일
        - password 비밀번호
        - newPassword 새로운 비밀번호
        - socialType 서비스 타입
   */
  async resetPassword(email, password, newPassword, socialType) {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/reset/password`, {
        email,
        password,
        rePassword: newPassword,
        socialType,
      });

      if (response.status === 204) {
        toast.success('비밀번호가 성공적으로 재설정되었습니다');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  /** 회원 탈퇴
   - 백엔드 구현 X, 수정 필요
  */
  async deleteUser() {
    const URL = `${IP_ADDRESS}/auth/delete`;
    try {
      await axios.delete(URL, {
        data: localStorage.getItem('socialId'),
      });
      this.logout();
      toast.success('회원탈퇴가 완료되었습니다');
    } catch (error) {
      this.handleError(error);
    }
  }
}
