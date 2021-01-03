

export const TEAM_A = 0
export const TEAM_B = 1

export default class GroupStage {
    constructor(name, teams=[], config={}) {
        this.name = name
        this.matchGroupsSchedule = []
        this.setup(config)
        this.setupTeams(teams)
        //this.summaries = []
    }

    setup(config) {
        const defaultConfig = { teamsXgroup: 4 }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames) {
        this.teams = []
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName)
            this.teams.push(team)
        }
        this.teams.shuffle()
    }

    customizeTeam(teamName) {
        return {
            name: teamName,
            group: 0,
            matchesWon: 0,
            matchesDrawn: 0,
            matchesLost: 0
        }
    }

    generateGroups(){
        console.log(this.teams.length)
        console.log(this.config.teamsXgroup)
        if (this.teams.length % this.config.teamsXgroup != 0){
            console.log(`Los equipos son ${this.teams.length} y no es posible hecer grupos de ${this.config.teamsXgroup}`)
            throw TypeError(`Los equipos son ${this.teams.length} y no es posible hecer grupos de ${this.config.teamsXgroup}`);
        } else{
            this.groupsName()
            let i = 0
            let x = 0
            this.teams.forEach(team => {
                if (i % this.config.teamsXgroup == 0){
                    console.log(' ')
                    console.log('--------------------')
                    console.log(`Grupo ${this.range[x]}`)
                    console.log('--------------------')
                    x++
                }
                i++
                team.group = this.range[x-1]
                console.log(team.name, team.group)
            });
            
        }
    }

    //Función para generar las letras de los grupos
    groupsName () {
        this.range=[]
        let start = 65
        let end = (this.teams.length/this.config.teamsXgroup) + start -1
        let step = 1

        while (step > 0 ? end >= start : end <= start) {
            this.range.push(String.fromCharCode(start));
            start += step;
        }
    }

    createRound() {
        // https://es.wikipedia.org/wiki/Sistema_de_todos_contra_todos
        const groupsStage = []
        this.initSchedule(groupsStage)
        this.setTeamsA(groupsStage)
        //this.setAwayTeams(newRound)
        //this.fixLastTeamSchedule(newRound)
        //return newRound
        console.table(groupsStage[0,0])
        //console.table(groupsStage[0,1])
        //console.table(groupsStage[0,2])
        console.table(groupsStage[1,5][0,0][0,0])
        console.table(groupsStage)
    }

    //Iniciamos el array con datos neutros para todos los grupos/jornadas/partidos
    initSchedule(groupsStage) {
        const numberOfMatchDays = this.config.teamsXgroup - 1
        const numberOfMatchesPerMatchDay = this.config.teamsXgroup / 2
        const numberOfGroups= this.range.length
        console.log(`numberOfMatchDays= ${this.config.teamsXgroup - 1} numberOfMatchesPerMatchDay= ${this.config.teamsXgroup / 2} numberOfGroups=  ${this.range.length}`)
        //const groupsStage=[]
         for (let k = 0; k<numberOfGroups; k++){
            const groupA = this.range[k]
            const round2=[]
            console.log(groupA)
            for (let i = 0; i < numberOfMatchDays; i++) {
                const matchDay = []  // jornada vacía
                for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                    const match = [`Equipo A Gr: ${this.range[k]}  dia ${i} partido ${j}`, `Equipo B Gr: ${this.range[k]}  dia ${i} partido ${j}`]  // partido
                    matchDay.push(match)
                }
                // una vez añadidos todos los partidos a la jornada
                round2.push(matchDay)  // añadimos la jornada a la planificación
            }
           
            groupsStage.push(round2)
            console.log(round2)
         }
           
    }
    //Iniciamos al relleno del equipo A en cada partido de cada jornada de cada grupo
    setTeamsA(groupsStage) {
        //Tendremos que recorrer en un primer bucle, todos los eqipos por cada uno de los diferentes grupos
        const numberOfGroups = this.range.length
        let groupIndex = 0
        groupsStage.forEach(round =>{
            const teamNames = this.getTeamNamesGroup(this.range[groupIndex])
            groupIndex++
            const maxHomeTeams = teamNames.length - 2
            let teamIndex = 0
            round.forEach(matchDay => { // por cada jornada
                matchDay.forEach(match => { // por cada partido de cada jornada
                    // establecer el equipo A
                    match[TEAM_A] = teamNames[teamIndex]
                    teamIndex++
                    if (teamIndex > maxHomeTeams) {
                        teamIndex = 0
                    }
                })
            })
        })
    }

    getTeamNamesGroup(group) {
        const teamsInGroup = this.teams.filter(gr => gr.group == group).map(team => team.name)
        console.log(teamsInGroup)
        return teamsInGroup

        //return this.teams.map(team => team.name)
    }

}



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