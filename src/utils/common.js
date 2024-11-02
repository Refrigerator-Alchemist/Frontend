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
