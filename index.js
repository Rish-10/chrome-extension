let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const deleteSelectedBtn = document.getElementById("delete-selected-btn")
const skipBtn = document.getElementById("skip-btn")
const disclaimer = document.getElementById("disclaimer")
let x = 0 

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
} else {
}


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        if (i == x) {
            listItems += `
                <li class='selected'>
                    <p> <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a> </p>
                </li>
            `
            deleteSelectedBtn.className = ""
            skipBtn.className = ""
            disclaimer.className = ""
        } else {
            listItems += `
                <li class='not-selected'>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `
            deleteSelectedBtn.className = ""
            skipBtn.className = ""
            disclaimer.className = ""
        }
    }
    ulEl.innerHTML = listItems  
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
    deleteSelectedBtn.className = "disappear"
    skipBtn.className = "disappear"
    disclaimer.className = "disappear"
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    render(myLeads)
})

skipBtn.addEventListener("click", function() {
    x = x + 1 
    if (x === myLeads.length) {
        x = 0
    }
    render(myLeads)
})

deleteSelectedBtn.addEventListener("dblclick", function() {
    myLeads.splice(x, 1)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    x = 0
    render(myLeads)
})