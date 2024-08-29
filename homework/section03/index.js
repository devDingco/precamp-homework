const 수강생리스트 = []
let 인터벌삭제;
const 이메일종류 = ["naver.com", "gmail.com", "hanmail.net", "kakao.com"]

function 수강생있는지없는지() {
    if (수강생리스트.length === 0) {
        document.getElementById("수강생있는지없는지").style.display = "block";

    } else if (수강생리스트.length !== 0){
        document.getElementById("수강생있는지없는지").style.display = "none";

    }
}

function 수강생DOM만들기() {
  const 수강생목록 = 수강생리스트
    .map(
      (수강생, index) =>
        `<div class="수강생항목" onclick="수강생상세정보(${index})"><img class="프로필이미지" src="./assets/내 프로필_A.png" />
        <div id= "수강생이름"  class="수강생1">${수강생.이름}</div></div>`
    )
    .join("");

    document.getElementById("수강생리스트_영역").innerHTML = 수강생목록;
}

function 인풋검증기능() {
    const 이름인풋 =  document.getElementById("입력이름").value
    const 이메일인풋 = document.getElementById("입력이메일").value
    const 비밀번호인풋 = document.getElementById("입력비밀번호").value
    const 비밀번호확인인풋 = document.getElementById("입력비밀번호확인").value
    const 전화번호인풋 = document.getElementById("입력전화번호").value
    const 자기소개인풋 = document.getElementById("입력자기소개").value

    const 남자선택 = document.getElementById("male").checked
    const 여자선택 = document.getElementById("female").checked
    const 성별체크 = 남자선택 || 여자선택



    const 동의체크 = document.getElementById("agreement").checked

    const 다입력했나 = 이름인풋 !== "" && 이메일인풋 !== "" && 비밀번호인풋 !== "" && 비밀번호확인인풋 !== "" && 전화번호인풋 !== "" && 자기소개인풋 !== "" && 성별체크 && 동의체크
    if (다입력했나) {
        document.getElementById("가입버튼").src = "./assets/가입버튼활성화.png"
    }

}

function 가입버튼누르기() {
    const 날짜 = new Date();
    const 현재날짜 = 날짜.getFullYear() +
    "-" +
    (날짜.getMonth() + 1) +
    "-" +
    날짜.getDate();
    
    

    const 이름 =  document.getElementById("입력이름").value
    const 이메일 = document.getElementById("입력이메일").value
    const 비밀번호 = document.getElementById("입력비밀번호").value
    const 비밀번호확인 = document.getElementById("입력비밀번호확인").value
    // 성별
    const 남자 = document.getElementById("male");
    const 여자 = document.getElementById("female");
    let 성별 = ""
    if (남자.checked) 성별 = "남성";
    else if (여자.checked) 성별 = "여성";

    const 전화번호원본 = document.getElementById("입력전화번호").value
    const 쪼갠전화번호 = 전화번호원본.split('-')
    const 전화번호앞부분 = 쪼갠전화번호[0]
    const 전화번호뒷부분 = 쪼갠전화번호[2]
    const 전화번호 = `${전화번호앞부분}-****-${전화번호뒷부분}`

    const 자기소개 = document.getElementById("입력자기소개").value
    
    //검증
    let 이메일포함 = false

    const 이메일자르기 = 이메일.split('@')
    const 이메일뒷부분 = 이메일자르기[1]

    for (let 반복횟수 =  0 ; 반복횟수 < 3 ; 반복횟수 = 반복횟수 + 1) {
        if (이메일뒷부분 === 이메일종류[반복횟수]) {
            이메일포함 = true;
        }
    }
    const 이메일오류 = (이메일포함 === false)
    const 비밀번호오류 = (비밀번호 !== 비밀번호확인)
    const 전화번호하이픈오류 = (!전화번호원본.includes('-'))
    const 전화번호시작오류 = (전화번호앞부분 !== "010")
    const 동의체크 = document.getElementById("agreement").checked
    
    if (이메일오류) {
        document.getElementById("이메일오류").innerText = "이메일은 naver.com, gmail.com, hanmail.net, kakao.com 만 사용 가능합니다."
        document.getElementById("입력이메일").style = "border: 1px solid red"
    } else {
        document.getElementById("이메일오류").innerText = ""
        document.getElementById("입력이메일").style = "border: none"
    }
    if (비밀번호오류) {
        document.getElementById("비밀번호오류").innerText = "비밀번호와 비밀번호 확인이 일치하지 않습니다."
        document.getElementById("입력비밀번호").style = "border: 1px solid red"
        document.getElementById("입력비밀번호확인").style = "border: 1px solid red"
    } else {
        document.getElementById("비밀번호오류").innerText = ""
        document.getElementById("입력비밀번호").style = "border: none"
        document.getElementById("입력비밀번호확인").style = "border: none"
    }
    if (전화번호하이픈오류) {
        document.getElementById("전화번호오류").innerText = "전화번호 입력시 '-'를 입력해주세요 ex)010-1234-1234"
        document.getElementById("입력전화번호").style = "border: 1px solid red"
    } else if (전화번호시작오류) {
        document.getElementById("전화번호오류").innerText = "전화번호는 010으로 시작해야 됩니다."
        document.getElementById("입력전화번호").style = "border: 1px solid red"
    } else {
        document.getElementById("전화번호오류").innerText = ""
        document.getElementById("입력전화번호").style = "border: none"
    } 

    const 수강생객체 = {
        이름: 이름,
        이메일: 이메일,
        비밀번호: 비밀번호,
        성별: 성별,
        전화번호: 전화번호,
        동의여부: "Y",
        자기소개: 자기소개,
        가입일시: 현재날짜,
    }

    if(!이메일오류 && !비밀번호오류 && !전화번호하이픈오류 && !전화번호시작오류 && 동의체크) {
        alert(`
            회원가입을 축하합니다.
            [가입일시: ${현재날짜}]`)

        수강생리스트.push(수강생객체)
        
    }

    // 수강생 한명만 보여줄 때
    // document.getElementById("수강생리스트_영역").innerHTML = `
    //             <div class="수강생항목" onclick="수강생상세정보(${0})"><img class="프로필이미지" src="./assets/내 프로필_A.png" />
    //             <div id= "수강생이름"  class="수강생1">${이름}</div></div>`


    수강생DOM만들기();
    수강생있는지없는지();
    
    
}



function 수강생상세정보 (수강생번호) {
    const 수강생정보 = 수강생리스트[수강생번호]
    alert(`
        이름: ${수강생정보.이름}
        이메일: ${수강생정보.이메일}
        비밀번호: ****
        성별: ${수강생정보.성별}
        전화번호: ${수강생정보.전화번호}
        동의여부: ${수강생정보.동의여부}
        자기소개: ${수강생정보.자기소개}
        (가입일시: ${수강생정보.가입일시})
        `)
}
let 시간 = 179;

function 인증번호요청() {
    if (인터벌삭제) {
        clearInterval(인터벌삭제);
      }

    const 인증번호 = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

    document.getElementById("인증번호").innerText = 인증번호

    시간 = 179;
    인터벌삭제 = setInterval(function() {
        if(시간 != 0){
            const 분 = String(Math.floor(시간 / 60)).padStart(2, "0")
            const 초 = String(시간 % 60).padStart(2, "0")
        
            document.getElementById("인증번호남은시간").innerText = `${분}:${초}`
            시간 = 시간 - 1;
        }
        else {
            clearInterval(인터벌삭제)
        }

    }, 1000)

    setTimeout(function () {
        document.getElementById("인증하기버튼").disabled = true;
        document.getElementById("인증하기버튼").style = `background-color: #C7C7C7`
    }, 180000)
    // 인증하기버튼기능()
    // 인증하기버튼기능()

}

function 인증하기버튼기능() {
    시간 = 0
    document.getElementById("인증하기버튼").src ="./assets/인증완료_비활성화.png"
    document.getElementById("인증하기버튼").disabled = "true";
    document.getElementById("인증번호남은시간").innerText = "";
    
}

