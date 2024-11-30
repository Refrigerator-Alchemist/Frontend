import { toast } from 'react-toastify';

export const emailPattern =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export const isPasswordValid = (password) => {
  return (
    password.length >= 10 &&
    password.length <= 15 &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password) &&
    /[a-zA-Z]/.test(password)
  );
};

export const handleError = async (error) => {
  const genericToastId = 'generic-error';

  if (error.response && error.response.data && error.response.data.code) {
    const errorName = Object.values(ERRORS).find(
      (obj) => obj.code === error.response.data.code
    );
    const userNotice = errorName ? errorName.notice : '확인되지 않은 에러';
    console.log(`에러 내용: ${JSON.stringify(errorName)}`);
    toast.error(userNotice, {
      toastId: error.response.data.code,
    });
    return error.response.data.code;
  } else if (!error.response) {
    console.log('서버로부터 응답이 없습니다');
    toast.error('서버로부터 응답이 없습니다', {
      toastId: 'no-server-connection',
    });
  } else {
    console.log(`확인되지 않은 에러, ${error}`);
    toast.error('알 수 없는 에러가 발생했습니다', {
      toastId: genericToastId,
    });
  }
};
