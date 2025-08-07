let list = [
 
];

let listContainer = document.querySelector('.containerlist');
let addinput = document.querySelector('#ip');
let addbtn = document.querySelector('.btn');

function renderList(arr) {
  listContainer.innerHTML = '';

  arr.map((item) => {
    const div = document.createElement('div');
    div.classList.add('list');

    div.innerHTML = `
      <p>${item.text}</p>
      <button class="delete">🗑️</button>
    `;
    div.querySelector('.delete').addEventListener('click', () => {
      div.remove();
    });

    listContainer.appendChild(div);
  });
}
function addlist() {
  const text = addinput.value.trim();
  if (text === '') return; 

  let obj = {
    id: Date.now(),
    text: text,
  };

  list.push(obj);
  addinput.value = ``;
  renderList(list);
}

addbtn.addEventListener('click', addlist);
