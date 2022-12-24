document.getElementById("searchText").addEventListener("input", search)

var editorDict
async function setDict() {
    editorDict = await getDict()
    const updatedDate = await getUpdatedDate()
    var updatedElement = document.getElementById("updatedDate")
    updatedElement.innerText = updatedDate
}; setDict()

function search() {
    const searchStr = document.getElementById("searchText").value
    if ( searchStr === "" ) {
        return
    }
    const searchStart = document.getElementById("searchTypeStart").checked
    var resultElement = document.getElementById("result")
    resultElement.innerText = ""
    for (const puzzleData of editorDict) {
        if ( searchPuzzleNames(searchStr, puzzleData.names, searchStart) ) {
            for (const editor of puzzleData.editors) {
                const element = getEditorElement(puzzleData.title, editor)
                resultElement.appendChild(element)
            }
        }
    }
}

function searchPuzzleNames(str, nameList, isSearchStart) {
    const space = new RegExp(/\s/g)
    str = str.replaceAll(space, '')
    const stickyFlag =isSearchStart ? "y" : ""
    const regex = new RegExp(str, "i" + stickyFlag)
    for (const name of nameList) {
        if ( regex.test(name.replaceAll(space, '')) ) {
            return true
        }
    }
    return false
}

function getEditorElement(name, editor) {
    var linkElement = document.createElement("a")
    linkElement.href = editor.link
    linkElement.innerText = editor.link
    linkElement.target = "_blank"
    var element = document.createElement("p")
    element.appendChild(linkElement)
    element.innerHTML += "（" + editor.name + " - " + name + "）"
    return element
}