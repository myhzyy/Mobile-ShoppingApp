import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://mobile-app-data-651ba-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field") 
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-List")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    clearInput()

})


onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val())




    clearShoppingListEl()
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]

        let currentItemId = currentItem[0]
        let currentItemValue = currentItem[1]


        addItems(currentItemValue)
    }
         
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""

}


function clearInput() {
    inputFieldEl.value = ""
}

function addItems(itemValue) {
    // shoppingListEl.innerHTML += `<li>${itemValue}<li>`

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    shoppingListEl.append(newEl)
}