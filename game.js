
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
game.upgrades_purchased = new Array(upgradeData.length).fill(false)

function buy_upgrade(num) {
    var upgrade = upgradeData[num]
    var can_afford = true
    for (let letter in upgrade.cost) {
	if ( game.letters[letter] < upgrade.cost[letter] )
	    can_afford = false
    }
    if (can_afford) {
	game.upgrades_purchased[num] = true
	for (let letter in upgrade.cost) {
	    game.letters[letter] -= upgrade.cost[letter]
	}
	update()
    }
}

// Takes an array of relative chance values and returns a random result
function jRandom(input) {
    var sum = 0
    for (let i=0; i<input.length; i++) {
	sum += input[i]
    }
    var value = Math.floor( Math.random() * sum )
    sum = 0
    for (let i=0; i<input.length; i++) {
	sum += input[i]
	if (sum > value) {
	    return i
	}
    }
}

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

function upgradesUpdate() {
    var upgrades_div = document.getElementById('upgrades')
    while (upgrades_div.firstChild)
	upgrades_div.removeChild(upgrades_div.lastChild)
    for (let i=0; i<upgradeData.length; i++) {
	if (upgradeData[i].isUnlocked() && !game.upgrades_purchased[i]) {
	    var div = document.createElement('div')
	    div.className = 'upgrade'
	    div.innerText = upgradeData[i].name
	    div.onclick = function() {buy_upgrade(i)}


	    upgrades_div.appendChild(div)
	    console.log(upgrades_div)
	}
    }
}

function isPurchased(name) {
    return game.upgrades_purchased[upgradeIndex[name]]
}

function calcWordChance() {
    return 5
	+ ( isPurchased('Ants') ? 5 : 0)
	+ ( isPurchased('Apes') ? 5 : 0)
    	+ ( isPurchased('Asps') ? 5 : 0)
    	+ ( isPurchased('Bees') ? 5 : 0)
    	+ ( isPurchased('Boas') ? 5 : 0)
    	+ ( isPurchased('Cats') ? 5 : 0)
        + ( isPurchased('Cows') ? 5 : 0)
    	+ ( isPurchased('Bees') ? 5 : 0)
    	+ ( isPurchased('Eels') ? 5 : 0)
    	+ ( isPurchased('Ewes') ? 5 : 0)
    	+ ( isPurchased('Foxes') ? 5 : 0)
    	+ ( isPurchased('Koi') ? 5 : 0)
    	+ ( isPurchased('Owls') ? 5 : 0)
        + ( isPurchased('Pigs') ? 5 : 0)
}

// calculate word chance %
function wordboxInfoUpdate() {
    var wordbox_info = document.getElementById('wordbox-info')
    wordbox_info.innerText = "Word chance: " + calcWordChance() + "%"
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
    //Decide whether to toss out a word
    var chance = calcWordChance()
    if (!jRandom([100-chance, chance])) {
	return
    }

    var div = document.createElement('div')
    div.className = 'bouncing-word'
    
    //Select a random word from wordList    
    var word = wordList[Math.floor(Math.random()*wordList.length)]
    div.innerText = word

    var rarity = jRandom([10000, 1000, 100, 10, 1])
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

// Grind all of the selected words into letters
function grindSelected() {
    for (let i=0; i<game.inventory.length; i++) {
	var item = game.inventory[i]
	if (item.selected) {
	    var mult = ([1,2,4,8,16])[item.rarity]
	    for (let j=0; j<mult; j++) {
		for (let k=0; k<item.word.length; k++) {
		    var letter = item.word[k]
		    game.letters[letter] += 1
		}
	    }
	}
    }
    // Remove selected items from inventory
    var newInventory = []
    for (let i=0; i<game.inventory.length; i++) {
	if (!game.inventory[i].selected)
	    newInventory.push(game.inventory[i])
    }
    game.inventory = newInventory
    update()
}


function update() {
    inventoryWordsUpdate()
    inventoryLettersUpdate()
    upgradesUpdate()
    wordboxInfoUpdate()
}

window.onload = function() {update();}
