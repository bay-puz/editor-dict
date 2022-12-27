async function getDict() {
    const file = "./data/dict.json"
    return await fetch(file).then(response=>response.json())
}

async function getUpdatedDate() {
    const file = "./data/updated.txt"
    return await fetch(file).then(response=>response.text())
}

function getSearchStr() {
    return document.getElementById("searchText").value
}

function isSearchTypeStart() {
    return document.getElementById("searchTypeStart").checked
}

function addResultElement(result) {
    var resultElement = document.getElementById("result")
    resultElement.appendChild(result)
}

function clearResult(reset = false) {
    const message = reset ? "ここに結果が表示されます": ""
    var resultElement = document.getElementById("result")
    resultElement.innerText = message
}

function makeLinkElement(link) {
    var linkElement = document.createElement("a")
    linkElement.href = link
    linkElement.innerText = link
    linkElement.target = "_blank"
    return linkElement
}

function setResult(name, editor) {
    var linkElement = makeLinkElement(editor.link)
    var element = document.createElement("p")
    element.appendChild(linkElement)
    element.innerHTML += "（" + editor.name + " - " + name + "）"
    addResultElement(element)
}

function setEmptyResult() {
    const message = "専用エディタが見つかりません\n汎用エディタ："
    const link = "https://opt-pan.github.io/penpa-edit/"
    var linkElement = makeLinkElement(link)

    var resultElement = document.getElementById("result")
    resultElement.innerText = message
    resultElement.appendChild(linkElement)
}