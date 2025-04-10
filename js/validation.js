const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const formData = new FormData(form);
  const errs = form.querySelectorAll("span");

  // 전송버튼 클릭할때마다 모든 에러문구를 일단 다 찾은 뒤 화면에서 숨김처리
  errs.forEach((text, idx) => {
    text.style.display = "none";
  });

  //문자열.trim() : 문자열 양옆의 빈 공백문제를 제거해서 정리

  // 사용자 이름 인증시 메인이동, 그렇지 않으면 오류 콘솔 출력
  if (formData.get("username").trim().length < 2) {
    e.preventDefault();
    console.error("이름은 최소 2글자 이상 입력하세요.");
    form.querySelector(".errName").style.display = "block";
  }

  //성별이 선택되어 있지 않으면 전송기능 막고 콘솔 에러 출력
  if (!formData.get("gender")) {
    e.preventDefault();
    console.error("성별을 선택하세요.");
    form.querySelector(".errGender").style.display = "block";
  }

  //학력이 선택되어 있지 않으면 이하 동일
  if (!formData.get("edu")) {
    e.preventDefault();
    console.error("최종 학력을 선택하세요.");
    form.querySelector(".errEdu").style.display = "block";
  }

  //좋아하는 색상선택이 하나도 없으면 이하동일
  if (formData.getAll("myColor").length === 0) {
    e.preventDefault();
    console.error("좋아하는 색상을 최소 하나 이상 선택하세요.");
    form.querySelector(".errColors").style.display = "block";
  }

  //남기는 말은 최소글자 5글자 이상 최대글자수 10글자 이하일때 이하동일
  if (
    formData.get("comments").trim().length < 4 ||
    formData.get("comments").trim().length >= 10
  ) {
    e.preventDefault();
    console.error("나기는 말을 5글자 이상 10글자 미만으로 입력하세요.");
    form.querySelector(".errComments").style.display = "block";
  }

  // 비밀번호 인증 구현 (특수문자, 문자, 숫자 모두 포함)
  // 정규표현식(RgEx, Regular Expression)을 이용해서 특수문자, 문자, 숫자가 비밀번호에 포함되었는지 확인하는 방법

  // 입력받은 비밀번호 변수에 저장
  const pwd1 = formData.get("pwd1");

  // 테스트할 조건을 정규표현식으로 미리 설정
  const spc = /[!@#$%^&*()]/;
  const str = /[a-zA-Z]/;
  const num = /[0-9]/;

  if (!spc.test(pwd1) || !str.test(pwd1) || !num.test(pwd1)) {
    e.preventDefault();
    console.error("비밀번호에 특수문자, 문자, 숫자를 모두 포함하세요.");
    form.querySelector(".errPwd1").style.display = "block";
  }

  // 비밀번호 확인
  const pwd2 = formData.get("pwd2");

  if (pwd1 !== pwd2) {
    e.preventDefault();
    console.error("두개의 비밀번호를 같게 입력하세요.");
    form.querySelector(".errPwd2").style.display = "block";
  }

  // 이메일 인증처리
  const email = formData.get("email");
  const [forwardText, backwardText] = email.split("@");

  //1. @앞뒤로 문자값 모두 존재 (1차실패시 인증 실패)
  if (!forwardText || !backwardText) {
    e.preventDefault();
    console.error("@앞뒤로 문자값이 필요합니다.");
    form.querySelector(".errEmail").style.display = "block";
  } else {
    //2. 1번 조건이 만족된상태에서 다시 .앞뒤로 문자값 존재 (2차까지 인증완료되야함)
    if (!backwardText.split(".")[0] || !backwardText.split(".")[1]) {
      e.preventDefault();
      console.error(".앞뒤로 문자값이 필요합니다.");
      form.querySelector(".errEmail").style.display = "block";
    }
  }
});