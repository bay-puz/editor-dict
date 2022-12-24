async function getDict() {
    const file = "../data/dict.json"
    return await fetch(file).then(response=>response.json())
}

async function getUpdatedDate() {
    const file = "../data/updated.txt"
    return await fetch(file).then(response=>response.text())
}