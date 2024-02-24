import React, { useEffect, useState } from 'react';
import * as auth from '../apis/auth';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import ManageAccount from '../pages/ManageAccount';

export const User = () => {
  const [userInfo, setUserInfo] = useState();

  const { logout } = useContext(LoginContext);

  // 회원 정보 조회 ▶ /mypage
  const getUserInfo = async () => {
    const response = await auth.info();
    const data = response.data;
    console.log('getUserInfo');
    console.log(data);
    setUserInfo(data);
  };

  // 회원 정보 수정 ▶ /profile
  const updateUser = async (form) => {
    console.log(form);

    let response;
    let data;
    try {
      response = await auth.update(form);
    } catch (error) {
      console.error(`${error}`);
      console.error('회원정보 수정 중 에러가 발생하였습니다');
      return;
    }

    data = response.data;
    const status = response.status;
    console.log(`data : ${data}`);
    console.log(`status ${status}`);

    if (status === 200) {
      console.log('회원정보 수정 성공!');
      alert('회원정보 수정 성공!');
      logout();
    } else {
      console.log('회원정보 수정 실패!');
      alert('회원정보 수정 실패!');
    }
  };

  // 회원 탈퇴 ▶ /DeleteAccount
  const deleteUser = async (userEmail) => {
    console.log(userEmail);

    let response;
    let data;
    try {
      response = await auth.remove(userEmail);
    } catch (error) {
      console.error(`${error}`);
      console.error('회원탈퇴 중 에러가 발생하였습니다');
      return;
    }

    data = response.data;
    const status = response.status;
    console.log(`data : ${data}`);
    console.log(`status ${status}`);

    if (status === 200) {
      console.log('회원탈퇴 성공!');
      alert('회원탈퇴 성공!');
      logout();
    } else {
      console.log('회원탈퇴 실패!');
      alert('회원탈퇴 실패!');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <ManageAccount
        userInfo={userInfo}
        updateUser={updateUser}
        deleteUser={deleteUser}
      />
    </div>
  );
};
