// http://localhost:5500/contacts?pageno=값


function getPageno() {
  const params = new URLSearchParams(location.search);
  const paramsno = params.get('pageno');
  const pageno = parseInt(paramsno);
  // pageno가 없거나 숫자로 바꿀 수 없는 값인 경우 parseInt의 결과는 NaN(Not a Number)
  // NaN를 비교하면 무조건 false(Js에서 NaN은 비교되는 값이 아니다)
  // NaN와 비교할 때는 isNaN() 함수를 사용해야 한다.
  // 지금 여기서 isNaN(pageno)가 null 까지 잡아줌
  return isNaN(pageno) || pageno <0 ? 1: pageno ;
}

// 기본 매개변수(default parameter)
async function fetch (pageno=1, pagesize=10) {
  const API = 'http://sample.bmaster.kro.kr/contacts'
  const url = `${API}?pageno=${pageno}&pagesize=${pagesize}`
  // $.ajax 는 비동기처리되는 코드 → 언제 끝날지 모른다
  // 비동기코드를 리턴 받는 것은 '미래에 값이 들어올 것이다' 라는 값을 가진다 
  // 이것을 Promise 객체라고 한다.
  try {
      return await $.ajax(url);
  } catch (error) {
      console.log(error);
      return null;
  };
};