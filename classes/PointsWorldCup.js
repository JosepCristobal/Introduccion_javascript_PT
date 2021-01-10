import GroupStage from './GroupStage.js'
import {TEAM_A,TEAM_B} from './GroupStage.js'

export default class PointsWorldCup extends GroupStage {
    constructor(name, teams=[], config={}){
        super(name, teams, config)
    }

    setup(config){
        const defaultConfig = {
            teamsXgroup: 4,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        }
        this.config = Object.assign(defaultConfig, config)

    }

    customizeTeam(teamName){
        const customizedTeam = super.customizeTeam(teamName)

        return{
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            ...customizedTeam
        }
    }

    generateGoals(){
        // Generamos goles de forma aleatoria
        return Math.round(Math.random() * 10)
    }

    getTeamForName(name){
        //Buscamos un equipo por su nombre
        return this.teams.find(team => team.name == name)
    }

    play(match){
        const goals_A = this.generateGoals()
        const goals_B = this.generateGoals()
        return{
            a_Team: match[TEAM_A],
            goals_A,
            b_Team: match[TEAM_B],
            goals_B
        }
    }

    updateTeams(result){
        const a_Team = this.getTeamForName(result.a_Team)
        const b_Team = this.getTeamForName(result.b_Team)

        if (a_Team && b_Team){

            a_Team.goalsFor += result.goals_A
            a_Team.goalsAgainst += result.goals_B
            b_Team.goalsFor += result.goals_B
            b_Team.goalsAgainst += result.goals_A

            if (result.goals_A > result.goals_B){
                a_Team.points += this.config.pointsPerWin
                a_Team.matchesWon += 1
                b_Team.points += this.config.pointsPerLose
                b_Team.matchesLost += 1
            } else if(result.goals_A < result.goals_B){
                a_Team.points += this.config.pointsPerLose
                a_Team.matchesLost += 1
                b_Team.points += this.config.pointsPerWin
                b_Team.matchesWon += 1
            } else {
                a_Team.points += this.config.pointsPerDraw
                a_Team.matchesDrawn += 1
                b_Team.points += this.config.pointsPerDraw
                b_Team.matchesDrawn += 1
            }
        }
    }

    // searchMatch(teamA ='',teamB=''){
    //     //Buscamos el partido jugado en la fase de grupos para ver que resultado tuvieron los dos equipos cuando se enfrentaron
    //     //En caso de empate en puntos, utilizaremos como segunda opción este criterio de ordenación
    //     let order = 0
    //     let asMaster = []
    //     try{
    //         //console.log(teamA,teamB)
    //         this.summariesGroup.forEach(summaryGroup => {
    //             let j = 1
    //             summaryGroup.forEach(summary2 => {
    //                 j++
    //                 //const teamsInGroup = this.teams.filter(gr => gr.group == group).map(team => team.name)
    //                 let as = summary2.results.filter(match0 => (match0.a_Team == teamA && match0.b_Team == teamB) || (match0.a_Team == teamB && match0.b_Team == teamA) )
    //                 //console.log(as)
    //                 if (Object.entries(as).length == 0){ 
    //                     order = 0
    //                 }else{
    //                     //Si localizamos el partido, deberemos comprobar el resultado del encuentro
    //                     //Ganador el equipo A retornamos un -1. Ganador equipo B retornamos 1. Empate retornamos 0
    //                     asMaster.push(as)
    //                     //console.log(as)
    //                 }
    //             })
    //         })

    //         if(Object.entries(asMaster).length == 0){
    //             order = 0
    //             return order
    //         }else{
    //             const goalsA = asMaster[0][0].goals_A
    //             const goalsB = asMaster[0][0].goals_B
    //             //console.log(goalsA,goalsB)
    //             if (goalsA > goalsB){
    //                 order = -1
    //                 return order
    //             }else if (goalsB > goalsA){
    //                 order = 1
    //                 return order
    //             }else{
    //                 order = 0
    //                 return order
    //             }
    //         }

    //     } catch (error) {
    //         console.error('ERROR: ',error)
    //         order = 0
    //         return order
    //     }
    //  }

    getStandings(resultsNew){
        let winnerGroup = 0
        let summariesGroupGS = this.summariesGroup
        this.teams.sort(function(teamA, teamB){         
               if (teamA.group === teamB.group) {
                  // La Clasificación es solo importante cuando los equipos son de mismo grupo
                  if (teamA.points > teamB.points){
                      console.log(`Clasificacion por puntos ${teamA.name} ${teamA.points} contra ${teamB.name} ${teamB.points} gana A`)
                    return -1
                } else if (teamA.points < teamB.points){
                    console.log(`Clasificacion por puntos ${teamA.name} ${teamA.points} contra ${teamB.name} ${teamB.points} gana B`)
                    return 1
                } else{
                    console.log(`Clasificacion por puntos ${teamA.name} ${teamA.points} contra ${teamB.name} ${teamB.points} Empatan a puntos`)
                    //Si estan empatados deberemos utilizar los criterios de ordenación siguientes.
                    //1º El equipo que haya ganado al otro en el enfrentamiento entre ambos.
                    //2º Si hay empate en el punto uno, será por la diferencia de goles.
                    //3º En tercer lugar, será primero el equipo por orden alfabético.
                    //winnerGroup = this.searchMatch(teamA.name,teamB.name)
                    winnerGroup = resultado(teamA.name, teamB.name, summariesGroupGS,resultsNew)
                    
                    if (winnerGroup == -1){
                        //console.log(`Ordenado -1 ${winnerGroup} ${teamA.name} ${teamB.name}`)
                        console.log(`Clasificacion por partido ganado ${teamA.name} contra ${teamB.name} gana A `)
                        return -1
                    }else if (winnerGroup == 1){
                        //console.log(`Ordenado 1 ${winnerGroup} ${teamA.name} ${teamB.name}`)
                        console.log(`Clasificacion por partido ganado ${teamA.name} contra ${teamB.name} gana B `)
                        return 1
                    }else {
                        //console.log(`Clasificacion por partido ganado ${teamA.name} contra ${teamB.name} Empatan o partido no jugado `)

                        const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst
                        const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst 
                        if (goalsDiffA > goalsDiffB) {
                            console.log(`Clasificacion por diferencia de goles ${teamA.name} dif goles ${goalsDiffA} contra ${teamB.name}  dif goles ${goalsDiffB} Gana A`)
                            return -1
                        } else if (goalsDiffA < goalsDiffB) {
                            console.log(`Clasificacion por diferencia de goles ${teamA.name} dif goles ${goalsDiffA} contra ${teamB.name}  dif goles ${goalsDiffB} Gana B`)
                            return 1
                        } else {
                            console.log(`Clasificacion por diferencia de goles ${teamA.name} dif goles ${goalsDiffA} contra ${teamB.name}  dif goles ${goalsDiffB} Empatan`)
                            const nameorderA = teamA.name.toUpperCase()
                            const nameorderB = teamB.name.toUpperCase()
                            if(nameorderA > nameorderB){
                                console.log(`Clasificacion por orden alfabético ${teamA.name}  ${nameorderA} contra ${teamB.name}  dif goles ${nameorderB} Gana A menor`)
                                return 1
                            }else if(nameorderA < nameorderB){
                                console.log(`Clasificacion por orden alfabético ${teamA.name}  ${nameorderA} contra ${teamB.name}  dif goles ${nameorderB} Gana B menor`)
                                return -1
                            }else{
                                return 0
                            }                           
                        }
                    }
                }
               }else{
                return teamA.group > teamB.group ? 1 : -1;
               }
               
            });
        }

}

let resultado = (teamA,teamB,summariesGroup,resultsNew) => {
    //Buscamos el partido jugado en la fase de grupos para ver que resultado tuvieron los dos equipos cuando se enfrentaron
    //En caso de empate en puntos, utilizaremos como segunda opción este criterio de ordenación
    let order = 0
    let asMaster = []
    try{
        //console.log(teamA,teamB)
        summariesGroup.forEach(summaryGroup => {
            let j = 1
            summaryGroup.forEach(summary2 => {
                j++
                //const asF = summary2.results.find(match00 => (match00.a_Team == teamA && match00.b_Team == teamB) || (match00.a_Team == teamB && match00.b_Team == teamA) )
                const as = summary2.results.filter(match0 => (match0.a_Team == teamA && match0.b_Team == teamB) || (match0.a_Team == teamB && match0.b_Team == teamA) )
                //console.log(as)
                if (Object.entries(as).length == 0){ 
                    
                    const asNew = resultsNew.filter(match01 => (match01.a_Team == teamA && match01.b_Team == teamB) || (match01.a_Team == teamB && match01.b_Team == teamA) )
                    if (Object.entries(asNew).length == 0){
                        order = 0
                     }else{
                        asMaster.push(asNew)
                     }

                }else{
                    //Si localizamos el partido, deberemos comprobar el resultado del encuentro
                    //Ganador el equipo A retornamos un -1. Ganador equipo B retornamos 1. Empate retornamos 0
                    asMaster.push(as)
                    //console.log(as)
                }


            })
        })


        if(Object.entries(asMaster).length == 0){
            console.log(`Clasificacion por partido equipos ${teamA} vs ${teamB} Partido todavía no jugado `)
            console.log(asMaster)
            //console.log(asMasterBis)
            order = 0
            return order
        }else{

            //Debemos verificar cual de los dos equipos es el A y el B
            const goalsA = asMaster[0][0].goals_A
            const goalsB = asMaster[0][0].goals_B
            //Si hay empate, devolvemos 0
            if(goalsA == goalsB){
                console.log(`Clasificacion por partido equipos ${teamA} vs ${teamB} resultado ${asMaster[0][0].a_Team} ${goalsA} - ${goalsB} ${asMaster[0][0].b_Team} empate`)
                order = 0
                return order
            }else{
                if (asMaster[0][0].a_Team == teamA){
                    if (goalsA > goalsB){
                        console.log(`Clasificacion por partido equipos ${teamA} vs ${teamB} resultado ${asMaster[0][0].a_Team} ${goalsA} - ${goalsB} ${asMaster[0][0].b_Team} Gana A`)
                        order = -1
                        return order
                    }else if (goalsA < goalsB){
                        console.log(`Clasificacion por partido equipos ${teamA} vs ${teamB} resultado ${asMaster[0][0].a_Team} ${goalsA} - ${goalsB} ${asMaster[0][0].b_Team} Gana B`)
                        order = 1
                        return order
                    }
                }else{
                    if (goalsA > goalsB){
                        console.log(`Clasificacion por partido equipos ${teamA} vs ${teamB} resultado ${asMaster[0][0].a_Team} ${goalsA} - ${goalsB} ${asMaster[0][0].b_Team} Gana B`)
                        order = 1
                        return order
                    }else if (goalsA < goalsB){
                        console.log(`Clasificacion por partido equipos ${teamA} vs ${teamB} resultado ${asMaster[0][0].a_Team} ${goalsA} - ${goalsB} ${asMaster[0][0].b_Team} Gana A`)
                        order = -1
                        return order
                    }

                }
            }
            //console.log(goalsA,goalsB)
            
        }

    } catch (error) {
        console.error('ERROR: ',error)
        return 0
    }
 }