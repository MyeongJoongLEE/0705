function getNo() {
  const param = new URLSearchParams(location.search).get('no');
  const no = parseInt(param);
  return (isNaN(no) || no<1)? null : no;
}

async function fetch(no) {
  try {
    return await $.ajax(`http://sample.bmaster.kro.kr/contacts/${no}`);
  } catch(err) {
    console.log(err);
    return null;
  }
}

function printContact(contact) {
  $('#photo').attr('src', contact.photo);
  $('#name').text(contact.name);
  $('#address').text(contact.address);
  $('#tel').text(contact.tel);
}