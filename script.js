let listContainer = document.querySelector('.containerlist');
let addinput = document.querySelector('#ip');
let addbtn = document.querySelector('.btn');
let API = 'https://689d8369ce755fe69788d34b.mockapi.io/api/v1/todo';


async function fetchData() {
  let resposon = await fetch(API);
  let data = await resposon.json();
  console.log('data', data); ''
  if (data) {
    listContainer.innerHTML = '';
    data.map((item) => {
      const div = document.createElement('div');
      div.classList.add('list');

      div.innerHTML = `
        <p>${item.text}</p>
        <input id="editip" type="text" value ="${item.text}"/>
        <div class ="btns">
        <button class="delete">🗑️</button>
        <button class="edit">✏️</button>
        <button class ="save">💾</button>
        <div>
      `;
      div.querySelector('.delete').addEventListener('click', () => {
        deleteData(item.id)
      });
      let edit = div.querySelector('.edit');
      let save = div.querySelector('.save');
      let input = div.querySelector('#editip')
      let p = div.querySelector('p')
      edit.addEventListener('click', () => {
        edit.style.display = 'none'
        save.style.display = 'inline'
        input.style.display = 'inline'
        p.style.display = 'none'
      });
      save.addEventListener('click', () => {
        edit.style.display = 'inline'
        save.style.display = 'none'
        input.style.display = 'none'
        p.style.display = 'inline'
        editData(item.id,input.value);
      });
      listContainer.appendChild(div);
    });
  }
}
async function postData() {
  const text = addinput.value.trim();
  if (text === '') return;
  let obj = {
    text: text,
  }
  let resposon = await fetch(API,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  if (resposon.status === 201) {
    addinput.value = '';
    fetchData();
  }
}
async function deleteData(id) {
  let resposon = await fetch(`${API}/${id}`,
    {
      method: 'DELETE'
    });
  if (resposon.status === 200) {
    fetchData();
  }
}
async function editData(id,newText) {
  const text = newText.trim();
  if (text === '') return;
  let obj = {
    text: text,
  }
  let resposon = await fetch(`${API}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  if (resposon.status === 200) {

    fetchData();
  }
}
fetchData();
addbtn.addEventListener('click', postData);
