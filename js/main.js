document.getElementById("searchText").addEventListener("input", search)
document.getElementById("searchTypeStart").addEventListener("click", search)
document.getElementById("searchTypePart").addEventListener("click", search)
document.getElementById("randomButton").addEventListener("click", random)

var puzzleDict = {}
async function setDict() {
    puzzleDict = await getDict()
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
    for (const puzzleData of puzzleDict) {
        if ( searchPuzzleNames(searchStr, puzzleData.names, searchStart) ) {
            setPuzzle(puzzleData)
            isEmpty = false
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

function setPuzzle(puzzleData) {
    for (const editor of puzzleData.editors) {
        setResult(puzzleData.title, editor)
    }
}

function random() {
    clearResult()
    setPuzzle(getPuzzleAtRandom())
}

function getPuzzleAtRandom() {
    const dictLength = puzzleDict.length
    const randomNumber = Math.floor(Math.random() * dictLength)
    return puzzleDict[randomNumber]
}