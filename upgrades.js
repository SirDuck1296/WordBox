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
    "Bees",
    {b:1, e:2, s:1},
    "Gain 5% more words/click",
    "The bees go flying...",
    function() {return true;}
))


upgradeIndex = {}
for (let i=0; i<upgradeData.length; i++) {
    upgradeIndex[upgradeData[i].name] = i
}
