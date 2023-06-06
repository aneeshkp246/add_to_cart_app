import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "Your_firebase_database_url"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB = ref(database, "shoppingList")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById('shopping-list')

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(shoppingListinDB, inputValue)
    clearInput()
})

onValue(shoppingListinDB, function(snapshot){
    if (snapshot.exists())
    {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i = 0; i<itemsArray.length ; i++)
        {
            let currentItem = itemsArray[i] 
            // let currentItemID = currentItem[0]
            // let currentItemValue = currentItem[1]
            appendItem(currentItem)
        }
    }
    else{
        shoppingListEl.innerHTML = 'No items here... yet'
    }
})

function clearInput() {
    inputFieldEl.value = ""
}

function appendItem(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}

function clearShoppingListEl()
{
    shoppingListEl.innerHTML = ""
}
