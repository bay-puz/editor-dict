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
    const searchStr = convertStr(getSearchStr())
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
    const stickyFlag =isSearchStart ? "y" : ""
    const regex = new RegExp(str, "i" + stickyFlag)
    for (const name of nameList) {
        if ( regex.test(convertStr(name)) ){
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

function convertStr(str) {
    const sign = new RegExp(/[\s-・]/g)
    str = str.replaceAll(sign, '')
    str = toKatakana(str)
    return str
}

function toKatakana(str) {
    var newStr = new String("")
    for(const char of str) {
        code = char.codePointAt(0)
        if ('ァ'.codePointAt(0) <= code && code <= 'ヶ'.codePointAt(0)) {
            code -= 96
        }
        newStr += String.fromCodePoint(code)
    }
    return newStr
}