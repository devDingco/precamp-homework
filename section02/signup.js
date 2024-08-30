function showWelcomeMessage() {
  const userEmail = document.querySelector('.email').value;
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const splitedEmail = userEmail.split('@');
  const id = splitedEmail[0];
  const domain = splitedEmail[1];
  const name = document.querySelector('.name').value;
  const password = document.querySelector('.password').value;
  const passwordConfirm = document.querySelector('.password-confirm').value;
  const radio = document.querySelector('input[type="radio"]').checked;
  const agree = document.querySelector('#agree').checked;

  const isValid = name.trim() === '' || password.trim() === '' || passwordConfirm.trim() === '' || !radio || !agree;
  console.log(isValid);

  if (isValid) {
    alert('필수 항목을 모두 입력해 주세요.');
  } else if (!regEmail.test(userEmail) || id.length < 4) {
    alert('올바른 이메일 형식이 아닙니다.');
  } else {
    const slicedId = id.slice(0, Math.floor(id.length / 2));
    // const masking = '*'.repeat(id.length / 2);
    const maskedId = slicedId.padEnd(id.length, '*');
    const maskedEmail = `${maskedId}@${domain}`;

    alert(`회원가입을 축하합니다. 가입하신 이메일은 ${maskedEmail}입니다.`);
  }
}
