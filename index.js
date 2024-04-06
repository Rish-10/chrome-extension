let myLeads = []
let myLeadsNames = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const leadsNamesFromLocalStorage = JSON.parse( localStorage.getItem("myLeadsNames") )
const tabBtn = document.getElementById("tab-btn")
const deleteSelectedBtn = document.getElementById("delete-selected-btn")
const downBtn = document.getElementById("down-btn")
const upBtn = document.getElementById("up-btn")
const disclaimer = document.getElementById("disclaimer")
const deleteBar = document.getElementById("delete-bar")
const saveAs = document.getElementById("save-as-el")
const copyBtn = document.getElementById("copy-btn")
let x = 0 

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    myLeadsNames = leadsNamesFromLocalStorage
    render(myLeads, myLeadsNames)
} 



tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        myLeadsNames.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        localStorage.setItem("myLeadsNames", JSON.stringify(myLeadsNames) )
        render(myLeads, myLeadsNames)
    })
})

function render(leads, leadsNames) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        if (i == x) {
            listItems += `
                <li class='selected' id='${i}'>
                    <p> <a target='_blank' href='${leads[i]}'>
                        ${leadsNames[i]}
                    </a> </p>
                </li>
            `

            deleteBar.className = ""
            disclaimer.className = ""
        } else {
            listItems += `
                <li class='not-selected' id='${i}'>
                    <a target='_blank' href='${leads[i]}'>
                        ${leadsNames[i]}
                    </a>
                </li>
            `

            deleteBar.className = ""
            disclaimer.className = ""
        }
    }
    ulEl.innerHTML = listItems  
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    myLeadsNames = []
    render(myLeads, myLeadsNames)
    deleteBar.className = "disappear"
    disclaimer.className = "disappear"
    x = 0
    location.reload()
})

inputBtn.addEventListener("click", function() {
    if (saveAs.value === "") {
        saveAs.value = inputEl.value
    }

    if (inputEl.value.length != 0) {
        let input = inputEl.value
        let temp = input[0] + input[1] + input[2] + input[3] + input[4] + input[5] + input[6] + input[7]

        if (temp !== "https://") {
            input = "https://" + inputEl.value
        }

        myLeads.push(input)
        myLeadsNames.push(saveAs.value)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        localStorage.setItem("myLeadsNames", JSON.stringify(myLeadsNames))
        inputEl.value = ""
        saveAs.value = ""
        render(myLeads, myLeadsNames)
    }


    // myLeads.push(inputEl.value)
    // localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // inputEl.value = ""
    // render(myLeads)
})

downBtn.addEventListener("click", function() {
    x = x + 1 
    if (x === myLeads.length) {
        x = 0
    }
    render(myLeads, myLeadsNames)

    window.scrollTo({
        top: document.getElementById(x).offsetTop - 50,
        behaviour: 'smooth', 
    })
    // document.getElementById(x).scrollIntoView()
})

upBtn.addEventListener("click", function() {
    x = x - 1 
    if (x === 0) {
    } else if (x < 0) {
        x = myLeads.length - 1
    }
    render(myLeads, myLeadsNames)

    window.scrollTo({
        top: document.getElementById(x).offsetTop - 50,
        behaviour: 'smooth', 
    })
    // document.getElementById(x).scrollIntoView()
})

deleteSelectedBtn.addEventListener("dblclick", function() {
    myLeads.splice(x, 1)
    myLeadsNames.splice(x, 1)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    localStorage.setItem("myLeadsNames", JSON.stringify(myLeadsNames) )
    x = x - 1
    if (x < 0) {
        x = 0
    }
    render(myLeads, myLeadsNames)
    if (myLeads.length === 0) {
        deleteBar.className = "disappear"
        disclaimer.className = "disappear"
        location.reload()
    }
})


inputEl.addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        inputBtn.click()
    }
})

saveAs.addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        inputBtn.click()
        inputEl.focus()
    }
})

copyBtn.addEventListener("click", function() {
    if (myLeads.length != 0) {
        navigator.clipboard.writeText(myLeads[x])
        copyBtn.innerHTML = "COPIED"
        setTimeout(function() {
            copyBtn.innerHTML = "COPY"
        }, 500)
    }
})

