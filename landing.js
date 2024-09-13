const resetButton = document.getElementById("reset-button")
const recordsOutput = document.getElementById("records-output")

resetButton.addEventListener("click", _ => {
    console.log("init")
    gameFinished = false
    localStorage.setItem("deathCount", 0)
    localStorage.setItem("level", 1)
    console.log("success")
})

window.addEventListener("load", _ => {
    let currentRecord = localStorage.getItem("bestScore") || "TBD"
    if (recordsOutput.innerHTML === "") {
        recordsOutput.innerHTML = `The lowest amount of deaths so far is ${currentRecord}`
    }
})