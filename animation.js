function animate({timing, draw, duration}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
	// timeFraction goes from 0 to 1
	let timeFraction = (time - start) / duration;
	if (timeFraction > 1) timeFraction = 1;
	
	// calculate the current animation state
	let progress = timing(timeFraction);
	
	draw(progress); // draw it
	
	if (timeFraction < 1) {
	    requestAnimationFrame(animate);
	}
    });
}

function linear(timeFraction) {
    return timeFraction;
}

function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

// accepts a timing function, returns the transformed variant
function makeEaseOut(timing) {
    return function(timeFraction) {
	return 1 - timing(1 - timeFraction);
    }
}

function bounce(timeFraction) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
	if (timeFraction >= (7 - 4 * a) / 11) {
	    return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
	}
    }
}
