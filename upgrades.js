// All upgrade info goes here

//isUnlocked -> Do we display this upgrade or not
function Upgrade(name, cost, description, flavor_text, isUnlocked) {
    this.name = name
    this.cost = cost
    this.description = description
    this.flavor_text = flavor_text
    this.isUnlocked = isUnlocked
}

upgradeData = []

upgradeData.push( new Upgrade(
    "Ants",
    {a:1, n:1, t:1, s:1},
    "Gain 5% more words/click",
    "The ants go marching...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Apes",
    {a:2, p:2, e:2, s:2},
    "Gain 5% more words/click",
    "The apes go swinging...",
    function() {return isPurchased('Ants');}
))

upgradeData.push( new Upgrade(
    "Asps",
    {a:3, s:6, p:3},
    "Gain 5% more words/click",
    "The asps go slithering...",
    function() {return isPurchased('Apes');}
))

upgradeData.push( new Upgrade(
    "Bats",
    {b:4, a:4, t:4, s:4},
    "Gain 5% more words/click",
    "The bats go sonaring...",
    function() {return isPurchased('Asps');}
))

upgradeData.push( new Upgrade(
    "Bees",
    {b:5, e:10, s:5},
    "Gain 5% more words/click",
    "The bees go flying...",
    function() {return isPurchased('Bats');}
))

upgradeData.push( new Upgrade(
    "Boas",
    {b:6, o:6, a:6, s:6},
    "Gain 5% more words/click",
    "The boas go constricting...",
    function() {return isPurchased('Bees');}
))

upgradeData.push( new Upgrade(
    "Cats",
    {c:7, a:7, t:7, s:7},
    "Gain 5% more words/click",
    "The cats go sneaking...",
    function() {return isPurchased('Boas');}
))

upgradeData.push( new Upgrade(
    "Cows",
    {c:8, o:8, w:8, s:8},
    "Gain 5% more words/click",
    "The cows go mooing...",
    function() {return isPurchased('Cats');}
))

upgradeData.push( new Upgrade(
    "Dogs",
    {d:9, o:9, g:9, s:9},
    "Gain 5% more words/click",
    "The dogs go barking...",
    function() {return isPurchased('Cows');}
))

upgradeData.push( new Upgrade(
    "Eels",
    {e:20, l:10, s:10},
    "Gain 5% more words/click",
    "The eels go swimming...",
    function() {return isPurchased('Dogs');}
))

upgradeData.push( new Upgrade(
    "Emus",
    {e:11, m:11, u:11, s:11},
    "Gain 5% more words/click",
    "The emus go running...",
    function() {return isPurchased('Eels');}
))

upgradeData.push( new Upgrade(
    "Ewes",
    {e:24, w:12, s:12},
    "Gain 5% more words/click",
    "The ewes go bahing...",
    function() {return isPurchased('Emus');}
))

upgradeData.push( new Upgrade(
    "Foxes",
    {f:13, o:13, x:13, e:13, s:13},
    "Gain 5% more words/click",
    "The foxes go hunting...",
    function() {return isPurchased('Ewes');}
))

upgradeData.push( new Upgrade(
    "Flys",
    {f:14, l:14, y:14, s:14},
    "Gain 5% more words/click",
    "The flys go buzzing...",
    function() {return isPurchased('Foxes');}
))

upgradeData.push( new Upgrade(
    "Hens",
    {h:15, e:15, n:15, s:15},
    "Gain 5% more words/click",
    "The hens go clucking...",
    function() {return isPurchased('Flys');}
))

upgradeData.push( new Upgrade(
    "Koi",
    {k:16, o:16, i:16},
    "Gain 5% more words/click",
    "The koi go ponding...",
    function() {return isPurchased('Hens');}
))

upgradeData.push( new Upgrade(
    "Owls",
    {o:17, w:17, l:17, s:17},
    "Gain 5% more words/click",
    "The owls go hooting...",
    function() {return isPurchased('Koi');}
))

upgradeData.push( new Upgrade(
    "Pigs",
    {p:18, i:18, g:18, s:18},
    "Gain 5% more words/click",
    "The pigs go snorting...",
    function() {return isPurchased('Owls');}
))

upgradeData.push( new Upgrade(
    "Yaks",
    {y:19, a:19, k:19, s:19},
    "Gain 5% more words/click",
    "The yaks go yaking...",
    function() {return isPurchased('Pigs');}
))

upgradeData.push( new Upgrade(
    "The Zoo",
    {z:20, o:40},
    "Adds uncommon words to the wordbox",
    "Are these even words?",
    function() {return isPurchased('Yaks');}
))

upgradeData.push( new Upgrade(
    "Autogrinder",
    {a:10, e:10, i:10, o:10, u:10},
    "Unlock the autogrinder",
    "Finally something useful...",
    function() {return ( calcWordChance() >= 15 );}
))

upgradeData.push( new Upgrade(
    "Common Ground",
    {a:50, e:50, i:50, o:50, u:50},
    "Option to grind all common words",
    "Helps settle arguments.",
    function() {return ( calcWordChance() >= 25 );}
))

upgradeData.push( new Upgrade(
    "Four",
    {f:10, o:10, u:10, r:10},
    "Add four letter words to wordbox",
    "The nice ones.",
    function() {return ( calcWordChance() >= 25 );}
))

upgradeData.push( new Upgrade(
    "Five",
    {f:20, i:20, v:20, e:20},
    "Add five letter words to wordbox",
    "Words like queue!",
    function() {return isPurchased('Four');}
))

upgradeData.push( new Upgrade(
    "Six",
    {s:30, i:30, x:30},
    "Add six letter words to wordbox",
    "Longer still...",
    function() {return isPurchased('Five');}
))



upgradeIndex = {}
for (let i=0; i<upgradeData.length; i++) {
    upgradeIndex[upgradeData[i].name] = i
}
