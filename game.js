
game = {}

function Item(word, rarity) {
    this.word = word
    this.rarity = rarity
    this.selected = false
}

Item.prototype.value = function() {
    var value = 0
    for (letter of this.word) {
	value += alphaValues[letter]
    }
    value *= Math.pow(2, this.rarity)
    return value
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
	newdiv.draggable = true
	newdiv.ondragstart = startWordDrag
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

	    var popup_div = document.createElement('div')
	    popup_div.className = 'upgrade-popup'

	    var description_div = document.createElement('div')
	    var cost_div = document.createElement('div')
	    var flavor_div = document.createElement('div')

	    description_div.className = 'popup-description'
	    cost_div.className = 'popup-cost'
	    flavor_div.className = 'popup-flavor'

	    description_div.innerText = upgradeData[i].description
	    flavor_div.innerText = upgradeData[i].flavor_text

	    var can_afford = true
	    for (let letter in upgradeData[i].cost) {
		var letter_div = document.createElement('div')
		if (upgradeData[i].cost[letter] <= game.letters[letter])
		    letter_div.className = 'can-afford'
		else {
		    letter_div.className = 'cannot-afford'
		    can_afford = false
		}
		letter_div.innerText = ''
		    + letter
		    + ': '
		    + upgradeData[i].cost[letter]
		    + ' ('
		    + game.letters[letter]
		    + ')'
		cost_div.appendChild(letter_div)
	    }

	    if (can_afford)
		div.classList.add('upgrade-can-afford')
	    else
		div.classList.add('upgrade-cannot-afford')
	    
	    popup_div.appendChild(description_div)
	    popup_div.appendChild(cost_div)
	    popup_div.appendChild(flavor_div)
	    
	    div.appendChild(popup_div)

	    upgrades_div.appendChild(div)
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
        + ( isPurchased('Bats') ? 5 : 0)
    	+ ( isPurchased('Bees') ? 5 : 0)
    	+ ( isPurchased('Boas') ? 5 : 0)
    	+ ( isPurchased('Cats') ? 5 : 0)
        + ( isPurchased('Cows') ? 5 : 0)
    	+ ( isPurchased('Dogs') ? 5 : 0)
    	+ ( isPurchased('Eels') ? 5 : 0)
        + ( isPurchased('Emus') ? 5 : 0)
    	+ ( isPurchased('Ewes') ? 5 : 0)
    	+ ( isPurchased('Foxes') ? 5 : 0)
        + ( isPurchased('Flys') ? 5 : 0)
	+ ( isPurchased('Hens') ? 5 : 0)
    	+ ( isPurchased('Koi') ? 5 : 0)
    	+ ( isPurchased('Owls') ? 5 : 0)
        + ( isPurchased('Pigs') ? 5 : 0)
        + ( isPurchased('Yaks') ? 5 : 0)
}

function calcInventorySize() {
    return 20
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

function autogrinderUpdate() {
    var autogrinder_div = document.getElementById('autogrinder')
    var autogrinder2_div = document.getElementById('autogrinder2')
    if (isPurchased('Autogrinder'))
	autogrinder_div.style.visibility = 'visible'
    else
	autogrinder_div.style.visibility = 'hidden'
    if (isPurchased('Common Ground'))
	autogrinder2_div.style.visibility = 'visible'
    else
	autogrinder2_div.style.visibility = 'hidden'
}

function selectRandomWord() {
    var listNum = jRandom( [
	2,
	12,
	386,
	isPurchased('Four') ? 1000 : 0,
	isPurchased('Five') ? 1000 : 0
    ]);
    var list = wordList[listNames[listNum]]
    return list[Math.floor(Math.random()*list.length)]
}

function boxClick() {
    //Decide whether to toss out a word
    var chance = calcWordChance()
    if (!jRandom([100-chance, chance])) {
	return
    }

    var word = selectRandomWord()
    var rarity = jRandom([10000, 1000, 100, 10, 1])
    
    var autogrinder_checked = document.getElementById('autogrinder-checkbox').checked
    var autogrinder2_checked = document.getElementById('autogrinder2-checkbox').checked
    
    if (game.inventory.length >= calcInventorySize() && !autogrinder_checked
	&& !(rarity == 0 && autogrinder2_checked)) {
	console.log('TODO: inventory full message')
	return
    }
    
    var div = document.createElement('div')
    div.className = 'bouncing-word'
    div.innerText = word
    addRarityClass(div, rarity)

    if (autogrinder2_checked && rarity == 0)
	grind(new Item(word, rarity))
    else if (game.inventory.length < calcInventorySize())
	game.inventory.push(new Item(word, rarity));
    else if (autogrinder_checked) {
	grind(new Item(word, rarity))
    }
    update()
    
    wordbox = document.getElementById('wordbox')
    wordbox.appendChild(div)

    // Do animation of word
    let yfrom = 100
    let yto = 300 - div.clientHeight +
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
    }, 2500);

}


// Functions for the main menu selection buttons
function boxSelect() {
    var wordbox_select = document.getElementById('select-wordbox')
    var grinder_select = document.getElementById('select-grinder')
    var poker_select   = document.getElementById('select-poker')
    
    var wordbox = document.getElementById('wordbox-container')
    var grinder = document.getElementById('grinder-container')
    var poker   = document.getElementById('poker-container')
    
    if (!wordbox_select.classList.contains('selection-row-selected')) {
	wordbox_select.classList.add('selection-row-selected')
	wordbox.style.display = 'inline-block'

	grinder.style.display = 'none'
	grinder_select.classList.remove('selection-row-selected')

	poker.style.display = 'none'
	poker_select.classList.remove('selection-row-selected')
    }
}

function grinderSelect() {
    var wordbox_select = document.getElementById('select-wordbox')
    var grinder_select = document.getElementById('select-grinder')
    var poker_select   = document.getElementById('select-poker')
    
    var wordbox = document.getElementById('wordbox-container')
    var grinder = document.getElementById('grinder-container')
    var poker   = document.getElementById('poker-container')
    
    if (!grinder_select.classList.contains('selection-row-selected')) {
	grinder_select.classList.add('selection-row-selected')
	grinder.style.display = 'inline-block'

	wordbox.style.display = 'none'
	wordbox_select.classList.remove('selection-row-selected')

	poker.style.display = 'none'
	poker_select.classList.remove('selection-row-selected')
    }
}

function pokerSelect() {
    var wordbox_select = document.getElementById('select-wordbox')
    var grinder_select = document.getElementById('select-grinder')
    var poker_select   = document.getElementById('select-poker')
    
    var wordbox = document.getElementById('wordbox-container')
    var grinder = document.getElementById('grinder-container')
    var poker   = document.getElementById('poker-container')

    if (!poker_select.classList.contains('selection-row-selected')) {
	poker_select.classList.add('selection-row-selected')
	poker.style.display = 'inline-block'

	wordbox.style.display = 'none'
	wordbox_select.classList.remove('selection-row-selected')

	grinder.style.display = 'none'
	grinder_select.classList.remove('selection-row-selected')
    }    
}

function grind(item) {
    var mult = ([1,2,4,8,16])[item.rarity]
    for (let k=0; k<item.word.length; k++) {
	var letter = item.word[k]
	game.letters[letter] += mult
    }
}

// Grind all of the selected words into letters
function grindSelected() {
    for (let i=0; i<game.inventory.length; i++) {
	var item = game.inventory[i]
	if (item.selected) {
	    grind(item)
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

function pokerUpdate() {
    var div = document.getElementById('poker-info')
    while (div.firstChild)
	div.removeChild(div.lastChild)
    div.innerText = 'Autopoker: '

    if (game.autopoker != undefined) {
	var newdiv = document.createElement('div')
	newdiv.className = 'word'
	newdiv.innerText = game.autopoker.word
	newdiv.classList.add('unselectable')
	newdiv.style.display = 'inline-block'
	addRarityClass(newdiv, game.autopoker.rarity)
	div.appendChild(newdiv)

	var newdiv = document.createElement('div')
	newdiv.innerText = '' + game.autopoker.value()/10 +
	    ' pokes/sec'
	div.appendChild(newdiv)

	if (game.autopokerInt != undefined)
	    clearInterval(game.autopokerInt)
	game.autopokerInt = setInterval( function() {
	    boxClick();
	}, 10000 / game.autopoker.value() )
    }
    else
	div.innerText += 'none'
}

function update() {
    inventoryWordsUpdate()
    inventoryLettersUpdate()
    upgradesUpdate()
    wordboxInfoUpdate()
    autogrinderUpdate()
    pokerUpdate()
}

function startWordDrag(event) {
    var inventory_words = document.getElementById('inventory-words')
    event.dataTransfer.setData('index', event.target.index)
}

function allowDrop(event) {
    event.preventDefault()
}

function pokerDrop(event) {
    var index = event.dataTransfer.getData('index')

    if (game.autopoker != undefined) {
	game.inventory.push(game.autopoker)
    }
    game.autopoker = game.inventory[index]
    game.inventory.splice(index, 1)
    update()
}

window.onload = function() {update();}
