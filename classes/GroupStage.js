export const TEAM_A = 0
export const TEAM_B = 1

export default class GroupStage {
    constructor(name, teams=[], config={}) {
        this.name = name
        this.matchGroupsSchedule = []
        this.setup(config)
        this.setupTeams(teams)
        this.summaries = []
        this.summariesGroup = []
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
        //Primero verificamos que podamos hacer grupos de cuatro equipos. Si no fuera así, no dejaríamos continuar el campeonato/programa
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
            this.range.push(String.fromCharCode(start))
            start += step
        }
    }

    createRound() {
        const groupsStage = []
        this.initSchedule(groupsStage)
        this.setTeamsA(groupsStage)
        this.setTeamsB(groupsStage)
        this.fixLastTeamSchedule(groupsStage)
        return groupsStage
    }

    //Iniciamos el array con datos neutros para todos los grupos/jornadas/partidos
    initSchedule(groupsStage) {
        const numberOfMatchDays = this.config.teamsXgroup - 1
        const numberOfMatchesPerMatchDay = this.config.teamsXgroup / 2
        const numberOfGroups= this.range.length
        console.log(`numberOfMatchDays= ${this.config.teamsXgroup - 1} numberOfMatchesPerMatchDay= ${this.config.teamsXgroup / 2} numberOfGroups= ${this.range.length} Total Equipos= ${this.teams.length}`)
        
        for (let k = 0; k<numberOfGroups; k++){
            const round2=[]

            for (let i = 0; i < numberOfMatchDays; i++) {
                const matchDay = []  // jornada vacía
                for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                    const match = [`Equipo A Gr: ${this.range[k]}  dia ${i} partido ${j}`, `Equipo B Gr: ${this.range[k]}  dia ${i} partido ${j}`]  // partido
                    matchDay.push(match)
                }
                // una vez añadidos todos los partidos a la jornada
                round2.push(matchDay)  
                // añadimos la jornada a la planificación
            }
           
            groupsStage.push(round2)
        }
           
    }
    //Iniciamos al relleno del equipo A o primero en cada partido de cada jornada y esto para cada grupo
    setTeamsA(groupsStage) {
        //Tendremos que recorrer en un primer bucle, todos los eqipos por cada uno de los diferentes grupos
        let groupIndex = 0
        // Por cada grupo
        groupsStage.forEach(round =>{
            const teamNames = this.getTeamNamesGroup(this.range[groupIndex])
            groupIndex++
            const maxTeamsA = teamNames.length - 2
            let teamIndex = 0
            // Por cada jornada
            round.forEach(matchDay => { 
                // por cada partido de cada jornada
                matchDay.forEach(match => { 
                    // establecer el equipo A
                    match[TEAM_A] = teamNames[teamIndex]
                    teamIndex++
                    if (teamIndex > maxTeamsA) {
                        teamIndex = 0
                    }
                })
            })
        })
    }

    //Iniciamos el relleno del equipo B en cada partido de cada jornada de todos los grupos
    setTeamsB(groupsStage) {
        //Tendremos que recorrer en un primer bucle, todos los eqipos por cada uno de los diferentes grupos
        let groupIndex = 0
        // Por cada grupo
        groupsStage.forEach(round =>{
            const teamNames = this.getTeamNamesGroup(this.range[groupIndex])
            groupIndex++
            const maxTeamsB = teamNames.length - 2
            let teamIndex = maxTeamsB
            // Por cada jornada
            round.forEach(matchDay => {
                let firstMatchFound = false
                // por cada partido de cada jornada
                matchDay.forEach(match => {
                    // establecer el equipo B
                    if (!firstMatchFound) {
                        firstMatchFound = true
                    } else {
                        match[TEAM_B] = teamNames[teamIndex]
                        teamIndex--
                        if (teamIndex < 0) {
                            teamIndex = maxTeamsB
                        }
                    }
                })
            })
        })
    }

    fixLastTeamSchedule(groupsStage) {
        let groupIndex = 0
        groupsStage.forEach(round =>{
            let matchDayNumber = 1
            const teamNames = this.getTeamNamesGroup(this.range[groupIndex])
            groupIndex++
            const lastTeamName = teamNames[teamNames.length - 1]
            round.forEach(matchDay => {
                const firstMatch = matchDay[0]
                if (matchDayNumber % 2 == 0) { // si jornada par -> juega en A
                    firstMatch[TEAM_B] = firstMatch[TEAM_A]
                    firstMatch[TEAM_A] = lastTeamName
                } else { // jornada impar -> juega en B
                    firstMatch[TEAM_B] = lastTeamName
                }
                matchDayNumber++
            })
        })
    }
    
    scheduleMatchDays() {
            const newRound = this.createRound()
            this.matchGropusSchedule = newRound    
    }

    start(){
        console.log(' ')
        console.log("EMPEZAMOS LA FASE DE GRUPOS!!!")

        for(const round of this.matchGropusSchedule ){
            for (const matchDay of round) {
                const matchDaySummary = {
                    results: [],
                    standings: undefined
                }
                for (const match of matchDay) {
                    const result = this.play(match)
                    
                    this.updateTeams(result)  // actualizamos los equipos con el resultado de partido
                    matchDaySummary.results.push(result)
                }
                // Calcular clasificación y le pasamos como parámetro los partidos que todavía no se han incorporado al array this.summariesGroup
                // Esta información nos servirá para hacer la ordenación por partido jugado
                this.getStandings(matchDaySummary.results)
                matchDaySummary.standings = this.teams.map(team => Object.assign({}, team))
                // Guardar resumen de la jornada
                this.summaries.push(matchDaySummary)
            }
            this.summariesGroup.push(this.summaries)
            this.summaries = []
        }  
    }

    getTeamNamesGroup(group) {
        //Devolvemos los equipos filtrados por el grupo solicitado.
        const teamsInGroup = this.teams.filter(gr => gr.group == group).map(team => team.name)
        return teamsInGroup
    }

    getStandings() {
        throw new Error('getStandings not implemented')
    }

    updateTeams(result) {
        throw new Error('updateTeams method not implemented')
    }

    play(match) {
        throw new Error('play method not implented')
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