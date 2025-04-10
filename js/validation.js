// js로 인증 처리할 폼요소 변수에 할당

// FormData 클래스를 활용한 효율적인 폼 요소값 가져오기
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {

  const formData = new FormData(form);

  //사용자 이름 인증시
  if (formData.get('username').trim().length < 2) {
    e.preventDefault();
    console.error("이름은 최소 2글자 입력하세요.");
  }

  if (!formData.get('gender')) {
    e.preventDefault();
    console.error("성별을 선택해주세요");
  }
  if (!formData.get('edu')) {
    e.preventDefault();
    console.error("학력을 선택해주세요");
  }

  if (formData.getAll('colors').length == 0) {
    e.preventDefault();
    console.error("색상을 선택해주세요");
  }

  if (formData.get("comments").trim().length < 4 || formData.get("comments").length >= 10) {
    e.preventDefault();
    console.error("남기는말은 최소 5글자이상 최대 10글자 이하로 작성해주세요");
  }
  //비밀번호 인증 구현 (특수문자, 문자, 숫자 모두 포함)
  //정규표현식(RgEx)을 이용해서 특수문자, 문자, 숫자가 비밀번호에 포함되었는지 확인하는 방법
  //입력받은 비밀번호 변수에 저장
  const pwd1 = formData.get('pwd1');

  //테스트할 조건을 정규표현식으로 미리 설정
  const spc = /[!@#$%^&*()]/;
  const num = /[0-9]/;
  const str = /[a-zA-Z]/;

  if (!spc.test(pwd1) || (!spc.test(pwd2) || !num.test(pwd1))) {
    e.preventDefault();
    console.log("비밀번호에 특수문자, 문자, 숫자를 모두 포함하세요");
  }
  //비밀번호 확인
  const pwd2 = formData.get('pwd2');
  if (pwd1 !== pwd2) {
    e.preventDefault();
    console.error('두개의 비밀번호를 같게 입력하세요.');
  }

  //이메일 인증 처리
  const email = formData.get('email');
  const [forwardText, backwardText] = email.split("@");

  //1. @앞뒤로 문자값 모두 존재(1차 실패시 인증 실패)
  if (!forwardText || !backwardText) {
    e.preventDefault();
    console.error("@앞뒤로 문자값이 필요합니다.");
  } else {

  }
});