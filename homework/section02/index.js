const 수강생리스트 = []
const 수강생1 = {이름: "", 이메일:"", 비밀번호:"", 성별:"여", 전화번호:"", 동의여부:"Y", 자기소개:"", 가입일시:""}

function 가입버튼누르기() {
    const 현재날짜 = new Date();
    
    const 이름 =  document.getElementById("입력이름").value
    const 이메일 = document.getElementById("입력이메일").value
    const 비밀번호 = document.getElementById("입력비밀번호").value

    //const 성별
    const 전화번호원본 = document.getElementById("입력전화번호").value
    const 쪼갠전화번호 = 전화번호원본.split('-')
    const 전화번호앞부분 = 쪼갠전화번호[0]
    const 전화번호뒷부분 = 쪼갠전화번호[2]
    const 전화번호 = `${전화번호앞부분}-****-${전화번호뒷부분}`

    //const 동의여부
    const 자기소개 = document.getElementById("입력자기소개").value
    const 가입일시 = `${현재날짜.getFullYear()}-${현재날짜.getMonth() + 1}-${현재날짜.getDate()}`
    수강생1.이름 = 이름;
    수강생1.이메일 = 이메일;
    수강생1.비밀번호 = 비밀번호;
    수강생1.전화번호 = 전화번호;
    수강생1.자기소개 = 자기소개;
    수강생1.가입일시 = 가입일시;


    
    // const 수강생1 = {
    //     이름: 이름,
    //     이메일: 이메일,
    //     비밀번호: 비밀번호,
    //     성별: "여",
    //     전화번호: 전화번호,
    //     동의여부: "Y",
    //     자기소개: 자기소개,
    //     가입일시: 가입일시,
    // }

    수강생리스트.push(수강생1)
    document.getElementById("수강생이름").innerText = 이름;
    alert(`
        회원가입을 축하합니다.
        [가입일시: ${가입일시}]`)
    수강생1클릭();
}

function 수강생1클릭 () {
    alert(`
        이름: ${수강생리스트[0].이름}
        이메일: ${수강생리스트[0].이메일}
        비밀번호: ${수강생리스트[0].비밀번호}
        성별: ${수강생리스트[0].성별}
        전화번호: ${수강생리스트[0].전화번호}
        동의여부: ${수강생리스트[0].동의여부}
        자기소개: ${수강생리스트[0].자기소개}
        (가입일시: ${수강생리스트[0].가입일시})
        `)
}
let 인터벌삭제

function 인증번호요청() {

    clearInterval(인터벌삭제)
    const 인증번호 = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

    document.getElementById("인증번호").innerText = 인증번호

    let 시간 = 179;
    인터벌삭제 = setInterval(function() {
        const 분 = String(Math.floor(시간 / 60)).padStart(2, "0")
        const 초 = String(시간 % 60).padStart(2, "0")
    
        document.getElementById("인증번호남은시간").innerText = `${분}:${초}`
        시간 = 시간 - 1;
    }, 1000)

    setTimeout(function () {
        document.getElementById("인증하기버튼").disabled = true;
        document.getElementById("인증하기버튼").style = `background-color: #C7C7C7`
    }, 180000)
    
}

function 인증하기버튼() {
    document.getElementById("인증하기버튼").innerText = "인증완료"
    document.getElementById("인증하기버튼").style = `background-color: #C7C7C7`
    document.getElementById("인증하기버튼").disabled = "true";
    document.getElementById("인증번호남은시간").innerText = "";
}
