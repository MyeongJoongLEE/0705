function getPageno() {
  const param = new URLSearchParams(location.search).get('pageno');
  const pageno = parseInt(param);
  if(isNaN(pageno))
    return 1;
  else if(pageno<1)
    return 1;
  else 
    return pageno;
}

async function fetch(pageno=1, pagesize=10) {
  try {
    return await $.ajax(`http://sample.bmaster.kro.kr/contacts?pageno=${pageno}&pagesize=${pagesize}`);
  } catch(err) {
    console.log(err);
    return null;
  }
}

function getPagination({pageno, pagesize, totalcount, blockSize=5}) {
  const countOfPage = Math.ceil(totalcount/pagesize);
  const prev = Math.floor((pageno-1)/blockSize)*blockSize;
  const start = prev+1;
  let end = prev + blockSize;
  let next = end + 1;
  if(end>=countOfPage) {
    end = countOfPage;
    next = 0;
  }
  return {prev, start, end, next, pageno};
}

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

function printPagination({prev, start, end, next, pageno}) {
  const $parent = $('#pagination');
  if(prev>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list.html?pageno=${prev}'>이전으로</a>
      </li>`;
    $parent.append(html);
  }
  for(let i=start; i<=end; i++) {
    const className = pageno===i? 'page-item active' : 'page-item';
    const html =`
      <li class='${className}'>
        <a class='page-link' href='list.html?pageno=${i}'>${i}</a>
      </li>`;
    $parent.append(html);  
  }
  if(next>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list.html?pageno=${next}'>다음으로</a>
      </li>`;
    $parent.append(html);
  }
}