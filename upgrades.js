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
    {a:1, p:1, e:1, s:1},
    "Gain 5% more words/click",
    "The apes go apeing (?)...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Asps",
    {a:1, s:2, p:1},
    "Gain 5% more words/click",
    "The asps go slithering...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Bats",
    {b:1, a:1, t:1, s:1},
    "Gain 5% more words/click",
    "The bats go sonaring...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Bees",
    {b:1, e:2, s:1},
    "Gain 5% more words/click",
    "The bees go flying...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Boas",
    {b:1, o:1, a:1, s:1},
    "Gain 5% more words/click",
    "The boas go constricting...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Cats",
    {c:1, a:1, t:1, s:1},
    "Gain 5% more words/click",
    "The cats go sneaking...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Cows",
    {c:1, o:1, w:1, s:1},
    "Gain 5% more words/click",
    "The cows go mooing...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Dogs",
    {d:1, o:1, g:1, s:1},
    "Gain 5% more words/click",
    "The dogs go barking...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Eels",
    {e:2, l:1, s:1},
    "Gain 5% more words/click",
    "The eels go swimming...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Emus",
    {e:1, m:1, u:1, s:1},
    "Gain 5% more words/click",
    "The emus go running...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Ewes",
    {e:2, w:1, s:1},
    "Gain 5% more words/click",
    "The ewes go bahing...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Foxes",
    {f:1, o:1, x:1, e:1, s:1},
    "Gain 5% more words/click",
    "The foxes go hunting...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Koi",
    {k:1, o:1, i:1},
    "Gain 5% more words/click",
    "The koi go ponding...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Owls",
    {o:1, w:1, l:1, s:1},
    "Gain 5% more words/click",
    "The owls go hooting...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Pigs",
    {p:1, i:1, g:1, s:1},
    "Gain 5% more words/click",
    "The pigs go snorting...",
    function() {return true;}
))

upgradeData.push( new Upgrade(
    "Autogrinder",
    {a:10, e:10, i:10, o:10, u:10},
    "Unlock the autogrinder",
    "Finally something useful...",
    function() {return ( calcWordChance() >= 25 );}
))

upgradeData.push( new Upgrade(
    "Common Ground",
    {a:50, e:50, i:50, o:50, u:50},
    "Option to grind all common words",
    "Helps settle arguments.",
    function() {return ( calcWordChance() >= 50 );}
))



upgradeIndex = {}
for (let i=0; i<upgradeData.length; i++) {
    upgradeIndex[upgradeData[i].name] = i
}
