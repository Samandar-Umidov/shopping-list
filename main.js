var elForm = document.querySelector(".form");
var elInputText = document.querySelector (".text")
var elInput = document.querySelector(".count-text");
var elList = document.querySelector(".list")

var orders = [
  {
    text: "Buy Benanes",
    count: 14,
  },
  
  {
    text: "Buy Apple",
    count: 11,
  },
  {
    text: "Buy Fovorite Book",
    count: 9,
  },
  {
    text: "Pay Bill",
    count: 2,
  },
  {
    text: "Damadaran Milk",
    count: 10,
  },
];



elForm.addEventListener("submit", function(evt){
  evt.preventDefault();
  textValue = elInputText.value.trim();
  inputValue = elInput.value.trim();
  var new_obj = {
    text:textValue,
    count:inputValue,
  }

  orders.unshift(new_obj);
 

  renderOrders(orders);
  elInput.value = ""
  elInputText.value = ""
})






function renderOrders(orders){
  elList.innerHTML = "";
 orders.forEach(function(item, index, arr){
    var liElement = document.createElement("li");
    var countElement = document.createElement("span");
    var textElement = document.createElement("span");

    liElement.classList.add("item");

    countElement.textContent = item.count;
    countElement.classList.add("count");


    textElement.textContent = item.text;
    textElement.classList.add("text");
    


    liElement.append(countElement);
    liElement.append(textElement);
    
    elList.append(liElement);
  })
    
}
renderOrders(orders);