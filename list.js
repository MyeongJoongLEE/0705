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

function printContacts(contacts) {
  const $parent = $('#tbody');
  for(c of contacts) {
    const html = `
      <tr>
        <td>${c.no}</td>
        <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
        <td>${c.tel}</td>
        <td>${c.address}</td>
      </tr>
    `;
    $parent.append(html);
  }
}

function getPagination({pageno, pagesize, totalcount, blockSize=5}) {
  // totalcount    페이지 개수
  // 101~110          11
  const 페이지개수 = Math.ceil(totalcount/pagesize);
  const prev = Math.floor((pageno-1)/blockSize)*blockSize;
    const start = prev+1;
  let end = prev + blockSize;
  let next = end + 1;
  if(end>=페이지개수) {
    end = 페이지개수;
    next = 0;
  }
  console.log({prev, start, end, next, pageno})
  return {prev, start, end, next, pageno};
}

// pagination에 필요한 prev, start, end, next, pageno를 리턴하는 함수

// getPagiation(result)->result에서 pageno, pagesize, totalcount를 꺼내는 문법
// 구조분해할당
function getPagination({pageno, pagesize, totalcount, blockSize=5}) {
  // 페이지의 개수 개산
  const countOfPage = Math.ceil(totalcount/pagesize);

  // prev, start, end, next를 계산한 다음 목록의 끝에 도달한 경우 end, next를 변경
  const prev = Math.floor((pageno-1)/blockSize)*blockSize;
  const start = prev+1;
  let end = prev + blockSize;
  let next = end + 1;
  if(end>=countOfPage) {
    end = countOfPage;
    next = 0;
  }
  // 구조분해할당 : 객체->변수로 분해, 변수를 모아서 객체를 생성
  // return {prev:prev, start:start, end:end, next:next, pageno:pageno};
  return {prev, start, end, next, pageno};
}

function pringPagination({prev, start, end, next, pageno}) {
  const $parent = $('#pagination');
  if(prev>0) {
    const html=`<li class="page-item active"><a href='list.html?pageno=${prev}" class="page-link">이전으로</a></li>`;
  }
    $parent.append(이전으로);
  for(let i=start; i<=end; i++) {
    const html=`<li class="${classname}"><a href='list.html?pageno=${i}" class="page-link">${i}</a></li>`;
    $parent.append(i);
  }
  if(next>0) {
    {
      const html=`<li class="page-item"><a href='list.html?pageno=${next}" class="page-link">다음으로</a></li>`;
    }
  $parent.append(다음으로);
  }
}