//Función para generar las letras de los grupos
const groupsName = (groupsNumber) => {
    const range=[]
    let start = 65
    let end = groupsNumber + start -1
    let step = 1

    while (step > 0 ? end >= start : end <= start) {
        range.push(String.fromCharCode(start));
        start += step;
    }
    return range
}
//console.log(groupsName(8))

//Desordenamos el array
Array.prototype.shuffle = function()
{
	var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}

const teams =[
    'Brazil','Croatia','Mexico','Cameroon',
    'Spain','Netherlands','Chile','Australia',
    'Colombia','Greece','Ivory Coast','Japan',
    'Uruguay','Costa Rica','England','Italy',
    'Switzerland','Ecuador','France','Honduras',
    'Argentina','Bosnia','Iran','Nigeria',
    'Germany','Portugal','Ghana','USA',
    'Belgium','Algeria','Russia','So. Korea'
]

//const teams = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
const teamsDesordenado = teams.shuffle()


//console.log(teams.shuffle())
//console.log(teams)

const generateGroups = (teams,tXgroup,groupsName=[]) => {
//Primero verificamos que podamos hacer los grupos
    if (teams.length % tXgroup != 0){
        console.log(`Los equipos son ${teams.length} y no es posible hecer grupos de ${tXgroup}`)
        throw TypeError(`Los equipos son ${teams.length} y no es posible hecer grupos de ${tXgroup}`);
    } else{
        let i = 0
        let x = 0
        teams.forEach(team => {
            if (i % tXgroup == 0){
                console.log(' ')
                console.log('--------------------')
                console.log(`Grupo ${groupsName[x]}`)
                console.log('--------------------')
                
                x++
            }
            i++
            console.log(team)
        });
    }
    return true
}



const equipos = groupsName(8)
console.log(generateGroups(teamsDesordenado,4,equipos))

