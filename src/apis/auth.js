import api from '../apis/api';

// 로그인
export const login = (email, password, socialType) =>
  api.post('/login', {
    email: email,
    password: password,
    socialType: socialType,
  });

// 사용자 정보
export const info = (userEmail) => api.get(`/users/${userEmail}`);

// 회원가입
export const signup = (data) => api.post(`/users`, data);

// 회원 정보 수정
export const update = (data) => api.put(`/users`, data);

// 회원 탈퇴
export const remove = (userEmail) => api.delete(`/users/${userEmail}`);
