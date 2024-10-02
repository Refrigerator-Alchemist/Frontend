/**
🔗
@description 
- 서버 status 상태코드별 메세지 전달과 유저에게 전달
      - status, code가 리스폰스 헤더로 옴
      - 로그에는 code를 출력하고, toast(alert)에는 notice를 보여주기

- 클라이언트 에러 4XX
      - 400 Bad Request 401 Unauthorized 402 Payment Required 403 Forbiden 404 Not Found 405 Method Not Allowed
      - 406 Not Acceptable 407 Proxy Authentication Required 408 Request Timeout 409 Conflict 410 Gone 411 Length Requiredh
      - 412 Precondition Failed 413 Payload Too Large 414 URI Too Long 415 Unsupported Media Type 416 Requested Range Not Satifiable
 */
const ERRORS = {
  EXIST_USER_EMAIL_SOCIALTYPE: {
    status: 409,
    code: 'RAU1',
    message: '해당 socialType의 이메일이 이미 존재합니다.',
    notice: '이미 사용중인 이메일입니다',
  },

  EXIST_USER_NICKNAME: {
    status: 409,
    code: 'RAU2',
    message: '해당 닉네임이 이미 존재합니다.',
    notice: '이미 사용중인 닉네임입니다',
  },

  NOT_EXIST_USER_EMAIL_SOCIALTYPE: {
    status: 404,
    code: 'RAU3',
    message: '해당 socialType의 이메일이 존재하지 않습니다.',
    notice: '가입된 적이 없는 이메일입니다',
  },

  NOT_EXIST_USER_EMAIL: {
    status: 404,
    code: 'RAU4',
    message: '이메일이 존재하지 않습니다.',
    notice: '가입된 적이 없는 이메일입니다',
  },

  NOT_EXIST_USER_NICKNAME: {
    status: 404,
    code: 'RAU5',
    message: '닉네임이 존재하지 않습니다.',
    notice: '닉네임을 다시 입력해주세요',
  },

  NOT_EXIST_USER_SOCIALID: {
    status: 404,
    code: 'RAU6',
    message: 'socialId가 존재하지 않습니다.',
    notice: '계정이 존재하지 않습니다',
  },

  EXIST_REFRESHTOKEN_BLACKLIST: {
    status: 409,
    code: 'RAT1',
    message: '이미 로그아웃한 사용자입니다.',
    notice: '로그인 상태가 아닙니다',
  },

  NOT_EXIST_REFRESHTOKEN: {
    status: 404,
    code: 'RAT2',
    message: '존재하지 않는 Refresh Token입니다.',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  NOT_VALID_REFRESHTOKEN: {
    status: 400,
    code: 'RAT3',
    message: '유효하지 않은 Refresh Token입니다.',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  NOT_EXTRACT_EMAIL: {
    status: 401,
    code: 'RAT4',
    message: '토큰에서 email을 추출 할 수 없습니다.(잘못된 토큰)',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  NOT_VALID_ACCESSTOKEN: {
    status: 401,
    code: 'RAT5',
    message: 'Access Token이 유효하지 않습니다.',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  WRONG_SIGNATURE_TOKEN: {
    status: 401,
    code: 'RAT6',
    message: '잘못된 JWT 서명입니다.',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  NOT_EQUAL_JSON: {
    status: 400,
    code: 'RAD1',
    message: 'Data Content-Type이 json이 아닙니다.',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  NOT_EXTRACT_ACCESSTOKEN: {
    status: 401,
    code: 'RAT7',
    message: '토큰에서 Access Token을 추출할 수 없습니다.(잘못된 토큰)',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  WRONG_CERTIFICATION_NUMBER: {
    status: 400,
    code: 'RAC1',
    message: '인증번호가 틀렸습니다.',
    notice: '인증번호를 다시 입력해주세요',
  },

  EXPIRE_CERTIFICATION_NUMBER: {
    status: 400,
    code: 'RAC2',
    message: '인증번호가 만료되었습니다.',
    notice: '인증번호가 만료되었습니다',
  },

  EXPIRE_TOKEN: {
    status: 400,
    code: 'RAT8',
    message: '토큰이 만료되었습니다.',
    notice: '유저 정보 갱신 중 문제가 발생했습니다',
  },

  NOT_SURPPORTED_TOKEN: {
    status: 400,
    code: 'RAT9',
    message: '지원되지 않는 JWT 토큰입니다.',
    notice: '서버에 문제가 발생했습니다',
  },

  WRONG_PASSWORD: {
    status: 400,
    code: 'RAC3',
    message: '비밀번호를 재입력 해주세요.',
    notice: '비밀번호를 다시 입력해주세요',
  },

  NOT_REFRIGERATOR_SOCIALTYPE: {
    status: 400,
    code: 'RAC4',
    message: '이메일을 이용한 회원가입 시 만든 비밀번호만 변경 가능합니다.',
    notice: '비밀번호 재설정은 이메일로 가입한 유저만 가능합니다',
  },

  SEND_EMAIL_FAIL: {
    status: 500,
    code: 'RAS1',
    message: '이메일 전송을 실패했습니다.',
    notice: '인증번호 발송에 실패했습니다',
  },

  NOT_EQUAL_EACH_TOKEN_SOCIALID: {
    status: 400,
    code: 'RAT10',
    message: '로그인한 사용자의 Refresh Token이 아닙니다',
    notice: '유저 정보가 올바르지 않습니다.',
  },

  ILLEGAL_TOKEN: {
    status: 400,
    code: 'RAT11',
    message: 'JWT 토큰이 잘못되었습니다.',
    notice: '유저 정보가 올바르지 않습니다.',
  },

  //gpt ------------------------------------------------------

  NO_INGREDIENT: {
    status: 400,
    code: 'RAR1',
    message: '입력된 재료가 없습니다',
    notice: '입력된 재료가 없습니다. 재료를 입력해주세요',
  },
  NO_PERMISSION_FOR_RECIPE: {
    status: 403,
    code: 'RAR2',
    message: '해당 레시피에 대한 조회 권한이 없습니다.',
    notice: '해당 레시피의 권한이 없습니다.',
  },

  SAVE_RECIPE_FAIL: {
    status: 500,
    code: 'RAR3',
    message: '레시피 저장을 실패했습니다.',
    notice: '레시피 저장을 실패했습니다.',
  },
  FAILED_TO_GET_RECIPE_LIST: {
    status: 500,
    code: 'RAR4',
    message: '레시피 목록 조회에 실패했습니다.',
    notice: '레시피 목록을 불러오는 중 문제가 발생했습니다. ',
  },

  FAILED_TO_GET_DETAIL_RECIPE: {
    status: 500,
    code: 'RAR5',
    message: '상세 레시피 조회에 실패했습니다. ',
    notice: '레시피 내용을 불러오는 중 문제가 발생했습니다. ',
  },
  FAILED_TO_MAKE_RECIPE: {
    status: 500,
    code: 'RAR6',
    message: '추천 레시피 생성에 실패했습니다 ',
    notice: '추천 레시피를 생성에 실패했습니다',
  },
  NO_EXIST_RECIPEID: {
    status: 404,
    code: 'RAR7',
    message: '해당 recipeId가 존재하지 않습니다.',
    notice: '해당 레시피를 찾을 수 없습니다.',
  },

  NO_EXIST_RECOMMENDID: {
    status: 404,
    code: 'RAR8',
    message: '해당 recommendId가 존재하지 않습니다',
    notice: '해당 레시피가 존재하지 않습니다.',
  },

  // board ---------------------------------------------------

  FAILED_TO_MODIFY_POSTS: {
    status: 500,
    code: 'RAR10',
    message: '게시글을 수정하는 중 에러가 발생했습니다.',
    notice: '게시글을 수정하는 중 에러가 발생했습니다.',
  },
  FAILED_TO_UPLOAD_POSTS: {
    status: 500,
    code: 'RAR11',
    message: '레시피를 업로드하는 중 에러가 발생했습니다.',
    notice: '레시피를 업로드하는 중 에러가 발생했습니다.',
  },
  FAILED_TO_SEND_LIKE: {
    status: 500,
    code: 'RAR12',
    message: '좋아요 누를때 에러가 발생했습니다. ',
    notice: '좋아요 전송하는 중 문제가 발생했습니다. ',
  },
  FAILED_TO_CHECK_LIKE: {
    status: 404,
    code: 'RAR13',
    message: '해당 id가 좋아요를 눌렀는지 확인하는 중 에러가 발생했습니다.',
    notice: '좋아요 누른 게시물을 확인하는 중 문제가 발생했습니다.',
  },
  FAILED_TO_LOAD_POSTPAGE: {
    status: 404,
    code: 'RAR14',
    message: '게시판 페이지를 불러올 수 없습니다.',
    notice: '게시판 페이지를 불러오는 중 문제가 발생했습니다.',
  },
  FAILED_TO_LOAD_DETAIL: {
    status: 404,
    code: 'RAR15',
    message: '상세 페이지를 불러올 수 없습니다. ',
    notice: '상세페이지를 불러오는 중 문제가 발생했습니다.',
  },
  FAILED_TO_LOAD_TOP: {
    status: 404,
    code: 'RAR16',
    message: '인기 게시물들을 불러올 수 없습니다. ',
    notice: '인기 게시물들을 불러오는 중 문제가 발생했습니다.',
  },
  FAILED_TO_LOAD_MYPOSTS_COUNT: {
    status: 404,
    code: 'RAR17',
    message: '내가 작성한 게시물의 수를 불러올 수 없습니다.',
    notice: '내가 작성한 게시물을 불러오는 중 문제가 발생했습니다.',
  },

  NO_SEARCH_RESULTS: {
    status: 404,
    code: 'RAR18',
    message: '검색한 제목의 게시물을 찾을 수 없습니다.',
    notice: '검색 결과를 찾을 수 없습니다.',
  },

  FAILED_TO_LOAD_LIKEDPOSTS: {
    status: 404,
    code: 'RAR19',
    message: '내가 좋아요 누른 게시물들을 불러올 수 없습니다.',
    notice: '내가 좋아요 누른 게시물들을 불러오는 중 문제가 발생했습니다.',
  },

  FAILED_TO_LOAD_MYPOSTS: {
    status: 404,
    code: 'RAR20',
    message: '내가 작성한 게시물들을 불러올 수 없습니다.',
    notice: '내가 작성한 게시물들을 불러오는 중 문제가 발생했습니다.',
  },

  FAILED_TO_LOAD_MYIMG: {
    status: 404,
    code: 'RAR21',
    message: '내 프로필 이미지를 불러올 수 없습니다.',
    notice: '내 프로필 이미지를 불러오는 중 문제가 발생했습니다.',
  },

  FAILED_TO_LOAD_DELETE_POST: {
    status: 500,
    code: 'RAR22',
    message: '게시글을 삭제하던 중 에러가 발생했습니다.',
    notice: '게시글을 삭제하던 중 문제가 발생했습니다.',
  },

  FAILED_TO_LOAD_LIKEDPOSTS_COUNT: {
    status: 404,
    code: 'RAR23',
    message: '내가 좋아요 누른 게시글의 수를 조회하는 중 에러가 발생했습니다.',
    notice: '내가 좋아요 누른 게시글을 불러오는 중 문제가 발생했습니다.',
  },

  FAILED_TO_LOAD_ALLPOSTS_COUNT: {
    status: 404,
    code: 'RAR24',
    message: '전체 게시글의 수를 조회하는 중 에러가 발생했습니다.',
    notice: '전체 게시글을 불러오는 중 문제가 발생했습니다.',
  },
  FAILED_TO_SEND_DISLIKE: {
    status: 500,
    code: 'RAR25',
    message: '좋아요를 취소 할 때 에러가 발생했습니다.',
    notice: '좋아요를 취소하는 중 문제가 발생했습니다.',
  },
};

export default ERRORS;
