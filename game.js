
game = {}

function Item(word, rarity) {
    this.word = word
    this.rarity = rarity
    this.selected = false
}

game.inventory = []
game.letters = {a:0, b:0, c:0, d:0, e:0, f:0, g:0,
		h:0, j:0, i:0, j:0, k:0, l:0, m:0,
		n:0, o:0, p:0, q:0, r:0, s:0, t:0,
		u:0, v:0, w:0, x:0, y:0, z:0}

function addRarityClass(div, rarity) {
    switch (rarity) {
    case 0: break;
    case 1: div.classList.add('magic'); break;
    case 2: div.classList.add('rare'); break;
    case 3: div.classList.add('epic'); break;
    case 4: div.classList.add('legendary'); break;
    }
}

function inventoryWordsUpdate() {
    inventory_div = document.getElementById('inventory-words')
    while(inventory_div.firstChild)
	inventory_div.removeChild(inventory_div.lastChild)
    for (let i=0; i<game.inventory.length; i++) {
	newdiv = document.createElement('div')
	newdiv.className = 'word'
	newdiv.index = i
	newdiv.onclick = wordClick
	newdiv.innerText = game.inventory[i].word
	if (game.inventory[i].selected)
	    newdiv.classList.add('word-selected')
	newdiv.classList.add('unselectable')
	addRarityClass(newdiv, game.inventory[i].rarity)
	inventory_div.appendChild(newdiv)
    }
}

function inventoryLettersUpdate() {
    var am_div = document.getElementById('letters-am')
    var nz_div = document.getElementById('letters-nz')

    while (am_div.firstChild)
	am_div.removeChild(am_div.lastChild)
    while (nz_div.firstChild)
	nz_div.removeChild(nz_div.lastChild)

    for (let letter of 'abcdefghijklm') {
	let div = document.createElement('div')
	div.innerText = letter + ': ' + game.letters[letter]
	am_div.appendChild(div)
    }
    for (let letter of 'nopqrstuvwxyz') {
	let div = document.createElement('div')
	div.innerText = letter + ': ' + game.letters[letter]
	nz_div.appendChild(div)
    }
}

function wordClick() {
    if (this.classList.contains('word-selected')) {
	this.classList.remove('word-selected')
	game.inventory[this.index].selected = false
    }
    else {
	this.classList.add('word-selected')
	game.inventory[this.index].selected = true
    }
}

function boxClick() {
    var div = document.createElement('div')
    div.className = 'bouncing-word'
    
    //Select a random word from wordList    
    var word = wordList[Math.floor(Math.random()*wordList.length)]
    div.innerText = word

    var rarity = Math.floor( 5 * Math.pow(Math.random(),20) )
    addRarityClass(div, rarity)
    
    wordbox = document.getElementById('wordbox')
    wordbox.appendChild(div)

    // Do animation of word
    let yfrom = 100
    let yto = wordbox.clientHeight - div.clientHeight +
	Math.floor(Math.random() * 50);

    let xfrom = 150
    let xto = Math.floor( 300*Math.random() )
    
    animate({
	duration: 2000,
	timing: makeEaseOut(bounce),
	draw(progress) {
	    div.style.top = yfrom + (yto-yfrom) * progress + 'px'
	}
    });

    animate({
	duration: 2000,
	timing: makeEaseOut(quad),
	draw: function(progress) {
	    div.style.left = xfrom + (xto-xfrom) * progress + "px"
	    if (progress > 0.5)
		div.style.opacity = 1-2*(progress - 0.5)
	}
    });
	
    setTimeout(function() {
	wordbox.removeChild(div);
	game.inventory.push(new Item(word, rarity));
	update();
    }, 2500);

}


// Functions for the main menu selection buttons
function boxSelect() {
    var wordbox_select = document.getElementById('select-wordbox')
    var grinder_select = document.getElementById('select-grinder')

    var wordbox = document.getElementById('wordbox-container')
    var grinder = document.getElementById('grinder-container')
    
    if (!wordbox_select.classList.contains('selection-row-selected')) {
	wordbox_select.classList.add('selection-row-selected')
	wordbox.style.display = 'inline-block'
	grinder.style.display = 'none'
	grinder_select.classList.remove('selection-row-selected')
    }
}

function grinderSelect() {
    var wordbox_select = document.getElementById('select-wordbox')
    var grinder_select = document.getElementById('select-grinder')

    var wordbox = document.getElementById('wordbox-container')
    var grinder = document.getElementById('grinder-container')
    
    if (!grinder_select.classList.contains('selection-row-selected')) {
	grinder_select.classList.add('selection-row-selected')
	grinder.style.display = 'inline-block'
	wordbox.style.display = 'none'
	wordbox_select.classList.remove('selection-row-selected')
    }
}



function update() {
    inventoryWordsUpdate()
    inventoryLettersUpdate()
}
