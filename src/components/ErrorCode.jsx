// 서버 status 상태코드별 에러메세지 등록해 둔 거랑 매치시키기
const ErrorCode = {
  EXIST_USER_EMAIL_SOCIALTYPE: {
    status: 409,
    message: '해당 socialType의 이메일이 이미 존재합니다.',
  },

  EXIST_USER_NICKNAME: {
    status: 409,
    message: '해당 닉네임이 이미 존재합니다.',
  },

  NOT_EXIST_USER_EMAIL_SOCIALTYPE: {
    status: 404,
    message: '해당 socialType의 이메일이 존재하지 않습니다.',
  },

  NOT_EXIST_USER_EMAIL: { status: 404, message: '이메일이 존재하지않습니다.' },

  NOT_EXIST_USER_NICKNAME: {
    status: 404,
    message: '닉네임이 존재하지않습니다.',
  },

  NOT_EXIST_USER_SOCIALID: {
    status: 404,
    message: 'socialId가 존재하지않습니다.',
  },

  EXIST_REFRESHTOKEN_BLACKLIST: {
    status: 409,
    message: '이미 로그아웃한 사용자입니다.',
  },

  NOT_EXIST_REFRESHTOKEN: {
    status: 404,
    message: '존재하지 않는 Refresh Token입니다.',
  },

  NOT_VALID_REFRESHTOKEN: {
    status: 400,
    message: '유효하지 않은 Refresh토큰입니다.',
  },

  NOT_EXTRACT_EMAIL: {
    status: 401,
    message: '토큰에서 email을 추출 할 수 없습니다.(잘못된 토큰)',
  },

  NOT_VALID_ACCESSTOKEN: {
    status: 401,
    message: 'Access토큰이 유요하지 않습니다.',
  },

  NOT_EQUAL_JSON: {
    status: 400,
    message: 'data content-type이 json이 아닙니다.',
  },

  NOT_EXTRACT_ACCESSTOKEN: {
    status: 401,
    message: '토큰에서 AccessToken을 추출 할 수 없습니다.(잘못된 토큰)',
  },

  WRONG_CERTIFICATION_NUMBER: {
    status: 400,
    message: '인증번호가 틀렸습니다.',
  },

  EXPIRE_CERTIFICATION_NUMBER: {
    status: 400,
    message: '인증번호가 만료되었습니다.',
  },

  WRONG_PASSWORD: { status: 400, message: '비밀번호를 재입력해주세요' },
  NOT_REFRIGERATOR_SOCIALTYPE: {
    status: 400,
    message: '자체 서비스 회원가입 시 만든 비밀번호만 변경 가능합니다.',
  },

  SEND_EMAIL_FAIL: { status: 500, message: '이메일 전송을 실패했습니다.' },

  NOT_AUTHENTICATION_INFO: { status: 400, message: '사용자 정보가 없습니다.' },

  NOT_EXIST_USER_TOKEN: {
    status: 404,
    message: 'TOKEN DB와 매핑 할 수 없습니다',
  },

  NOT_EQUAL_EACH_TOKEN_SOCIALID: {
    status: 400,
    message: '로그인한 사용자의 Refresh Token이 아닙니다',
  },

  NOT_EXIST_RERESHTOKEN_COOKIE: {
    status: 404,
    message: '해당 쿠키를 찾을 수 없습니다.',
  },
};

export default ErrorCode;
