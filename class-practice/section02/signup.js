function register() {
  const value = document.getElementById('이메일').value.trim();
  const [email, domain] = value.split('@');

  const halfLength = Math.floor(email.length / 2);
  const maskedEamil = email.slice(0, halfLength) + '*'.repeat(halfLength);

  const message = `회원가입을 축하합니다. 가입하신 이메일은 ${maskedEamil}@${domain}입니다.`;
  alert(message);
}
