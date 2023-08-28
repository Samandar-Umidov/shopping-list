var elForm = document.querySelector(".form");
var elSearchForm = document.querySelector(".form-search");
var elInputText = document.querySelector(".text")
var elInput = document.querySelector(".count-text");
var elList = document.querySelector(".list");
var elInputSearch = document.querySelector(".form-search__input");
var elRecord = document.querySelector("#recordButton");

const orders = JSON.parse(localStorage.getItem('orders') || "[]");
renderOrders(orders);

function addTodo() {
  const textValue = elInputText.value.trim();
  const inputValue = elInput.value.trim();

  if (textValue !== '' && inputValue !== '') {
    const new_obj = {
      id: orders.length ? orders.length + 1 : 1,
      text: textValue,
      count: inputValue,
    }

    orders.push(new_obj);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders(orders);

    elInput.value = '';
    elInputText.value = '';
  } else {
    alert('Please fill all blanks')
  }
}

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addTodo();
});

function renderOrders(data) {
  elList.innerHTML = "";
  data.forEach(function (item) {
    var liElement = document.createElement("li");
    var countElement = document.createElement("span");
    var textElement = document.createElement("span");

    liElement.classList.add("item");

    countElement.textContent = item.count;
    countElement.classList.add("count");

    const elRecordBtn = document.createElement("button");
    elRecordBtn.classList.add("click");
    elRecordBtn.textContent = `⏺`;

    textElement.textContent = item.text;
    textElement.classList.add("text");

    let daleteBtn = document.createElement("button");
    daleteBtn.classList.add("button");
    daleteBtn.textContent = '🚮';
    daleteBtn.dataset.id = item.id;

    let editBtn = document.createElement("button");
    editBtn.classList.add('edit-btn');
    editBtn.textContent = "🖊";
    editBtn.dataset.id = item.id;

    liElement.append(countElement);
    liElement.append(textElement);
    liElement.append(editBtn, daleteBtn);

    elList.append(liElement);
  })
}

elList.addEventListener('click', function (evt) {
  if (evt.target.matches('.button')) {
    let daleteId = evt.target.dataset.id;

    let findObj = orders.findIndex(function (item) {
      return item.id == daleteId;
    });
    orders.splice(findObj, 1);
    renderOrders(orders);
    localStorage.setItem("orders", JSON.stringify(orders));

  }

  if (evt.target.matches('.edit-btn')) {
    const edit_text = prompt("O'zgarishni kiriting");
    const edit_count = prompt("Sanoqni kiriting");

    const editBtnId = evt.target.dataset.id;

    const findItem = orders.find(function (item) {
      return item.id == editBtnId;
    });

    findItem.text = edit_text;
    findItem.count = edit_count;

    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders(orders);

  }
})

elSearchForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  let elSearchValue = elInputSearch.value.trim().toLowerCase();

  let filtered = orders;
  if (elSearchValue) {
    filtered = filtered.filter(function (item) {
      let result = item.text.toLowerCase() === elSearchValue;
      return result;
    })
  }

  renderOrders(filtered);
});

let isRecording = false;
let recognition = null;

function startRecognition() {
  recognition = new webkitSpeechRecognition();
  // recognition.lang = 'en-EN';
  recognition.lang = 'uz-UZ';

  recognition.onresult = function (event) {
    const speechResult = event.results[0][0].transcript;
    elInputText.value = speechResult;
  };

  recognition.onstart = function () {
    isRecording = true;
    elRecord.textContent = 'Stop';
  };

  recognition.onend = function () {
    isRecording = false;
    elRecord.textContent = '🔴';
  };

  recognition.start();
}

function stopRecognition() {
  recognition.stop();
}

elRecord.addEventListener('click', function () {
  if (!isRecording) {
    startRecognition();
  } else {
    stopRecognition();
  }
});