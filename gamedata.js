wordList = {}


function loadDoc(filename) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
	wordList[filename] = this.responseText.split("\n")
    }
    xhttp.open("GET", "https://sirduck1296.github.io/WordBox/wordlists/" + filename + '.txt');
    xhttp.send();
}

var listNames = [
    'one-common',
    'two-common',
    'three-common',
    'four-common',
    'five-common' ]

for (let name of listNames) {
    loadDoc(name);
}

alphaSettings = {
    a: {"value": 1, "type":"main"},
    b: {"value": 1, "type":"main"},
    c: {"value": 1, "type":"main"},
    d: {"value": 1, "type":"main"},
    e: {"value": 1, "type":"main"},
    f: {"value": 1, "type":"main"},
    g: {"value": 1, "type":"main"},
    h: {"value": 1, "type":"main"},
    i: {"value": 1, "type":"main"},
    j: {"value": 1, "type":"main"},
    k: {"value": 1, "type":"main"},
    l: {"value": 1, "type":"main"},
    m: {"value": 1, "type":"main"},
    n: {"value": 1, "type":"main"},
    o: {"value": 1, "type":"main"},
    p: {"value": 1, "type":"main"},
    q: {"value": 1, "type":"main"},
    r: {"value": 1, "type":"main"},
    s: {"value": 1, "type":"main"},
    t: {"value": 1, "type":"main"},
    u: {"value": 1, "type":"main"},
    v: {"value": 1, "type":"main"},
    w: {"value": 1, "type":"main"},
    x: {"value": 1, "type":"main"},
    y: {"value": 1, "type":"main"},
    z: {"value": 1, "type":"main"}
}
