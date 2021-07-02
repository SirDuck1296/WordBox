

function Item(name, rarity) {
    this.name = name
    this.rarity = rarity
}


function boxClick() {
    var div = document.createElement('div')
    div.className = 'bouncing-word'
    
    //Select a random word from wordList    
    var word = wordList[Math.floor(Math.random()*wordList.length)]
    div.innerHTML = word

    var rarity = Math.floor( 5 * Math.pow(Math.random(),20) )
    switch (rarity) {
    case 0: break;
    case 1: div.classList.add('magic'); break;
    case 2: div.classList.add('rare'); break;
    case 3: div.classList.add('epic'); break;
    case 4: div.classList.add('legendary'); break;
    }
    
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
    }, 2500);

}
