document.getElementById("searchText").addEventListener("input", search)

var editorDict = {}
async function setDict() {
    editorDict = await getDict()
    const updatedDate = await getUpdatedDate()
    var updatedElement = document.getElementById("updatedDate")
    updatedElement.innerText = updatedDate
}; setDict()


function search() {
    const searchStr = getSearchStr()
    if ( searchStr.length === 0 ) {
        clearResult(true)
        return
    }
    clearResult()
    const searchStart = isSearchTypeStart()
    var isEmpty = true
    for (const puzzleData of editorDict) {
        if ( searchPuzzleNames(searchStr, puzzleData.names, searchStart) ) {
            for (const editor of puzzleData.editors) {
                setResult(puzzleData.title, editor)
                isEmpty = false
            }
        }
    }
    if (isEmpty) {
        setEmptyResult()
    }
}

function searchPuzzleNames(str, nameList, isSearchStart) {
    const space = new RegExp(/[\s-_・]/g)
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
