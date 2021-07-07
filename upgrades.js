// All upgrade info goes here

function Upgrade(name, cost, description, flavor_text) {
    this.name = name
    this.cost = cost
    this.description = description
    this.flavor_text = flavor_text
}

upgradeData = []

upgradeData.push( new Upgrade(
    "Ants",
    {a:1, n:1, t:1, s:1},
    "Ants give 5% more words/click",
    "The ants go marching..."
))

upgradeData.push( new Upgrade(
    "Bees",
    {b:1, e:2, s:1}
    "Bees give 5% more words/click",
    "The bees go flying..."
))


