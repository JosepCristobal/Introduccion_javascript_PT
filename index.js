//Inicio de nuestra práctica de introducción a Javascript

import { worldTeams } from './teams.js'
import PointsWorldCup from './classes/PointsWorldCup.js'
import KnockoutStage from './classes/KnockoutStage.js'

try {
    console.log(worldTeams)
    const config = { rounds: 1 }
    const worldCup = new PointsWorldCup('Group Stage', worldTeams, config)

    const teamNames = worldCup.teams.map(team => team.name)

    // teamNames.forEach((equipo) =>{
    //     console.log(equipo)
    // })

    worldCup.generateGroups()
    //Verificamos que se han asignado los grupos de forma correcta
    console.table(worldCup.teams)

    //Invocamos la creación del cruce de equipos por grupos para jugar los diferentes partidos
    worldCup.scheduleMatchDays()

    // Mostramos por pantala las jornadas y sus partidos
    let groupIndex = 0
    console.log(" ")
    console.log("Empieza la fase de eliminatorias del mundial de fútbol")
    console.log("-------------------------------------------------------")
    
    worldCup.matchGropusSchedule.forEach(round =>{
        const groupName = worldCup.range[groupIndex]
        groupIndex++
        console.log(" ")
        console.log(`GRUPO ${groupName}`)
        console.log("----------------------")
        //console.log(" ")

        let i = 1
        round.forEach(matchDay => {
            console.log(" ")
            console.log(`JORNADA ${i}`)
            matchDay.forEach(match => {
                const home = match[0] != null ? match[0] : 'DESCANSA'
                const away = match[1] != null ? match[1] : 'DESCANSA'
                console.log(`${home} vs ${away}`)
            })
            i++
        })
    })

    // Comenzamos La Eliminatoria del Mundial
    worldCup.start()

    // mostrar por pantalla los resultados de cada grupo, jornada y la clasificación
    
    let i = 1
    const teamGroup = []
    const worldCupElements = worldCup.summariesGroup.length
    worldCup.summariesGroup.forEach(summaryGroup => {
        console.log(' ')
        console.log(`RESUMEN GRUPO ${worldCup.range[i-1]}`)
        console.log('----------------------------')
        let j = 1
        summaryGroup.forEach(summary => {
            console.log(`Jornada ${j} del grupo ${worldCup.range[i-1]}` )
            j++
            summary.results.forEach(result =>{
                console.log(`${result.a_Team} ${result.goals_A} - ${result.goals_B} ${result.b_Team}`)
            
            })
            const tableGroup = summary.standings.filter((gr => gr.group == worldCup.range[i-1])).map(team => {
            return {
                Group: team.group,
                Team: team.name,
                Points: team.points,
                PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
                Won: team.matchesWon,
                Drawn: team.matchesDrawn,
                Lost: team.matchesLost,
                GoalsFor: team.goalsFor,
                GoalsAgainst: team.goalsAgainst,
                GoalsDiff: team.goalsFor - team.goalsAgainst
            }
        })

        // 

        // 
        //console.log(`Valor de J ${j}, valor de i ${i}`)
        console.table(tableGroup)
        
        //tableGroup.forEach(element => {console.log(element.Group,element.Team) })
        if (worldCupElements/worldCup.range.length == j-3){
            for (let x = 0; x < 2; x++){
                console.log(`${x+1}ª posición para el grupo ${tableGroup[x].Group} es ${tableGroup[x].Team}`)
                const match = [tableGroup[x].Group,tableGroup[x].Team]
                teamGroup.push(match)
            }
        }
        
        })
        i++
        
    })
    
    console.log('')
    console.log('Equipos que pasan a la final')
    console.table(teamGroup)
    
    const worldFinal = new KnockoutStage('Finales',teamGroup)
    worldFinal.generateRounds( worldFinal.fTeamsA)
    this.quarter=[]
    //console.table(worldFinal.matches)
    
        console.log(' ')
        console.log('=============================================')
        console.log('======COMIENZA LA FASE DE ELIMINATORIAS======')
        console.log('=============================================')
        console.log(' ')
        console.log('======OCTAVOS DE FINAL======')
        console.log(' ')

    worldFinal.matches.forEach(teamResult01 => {
        console.log(`${teamResult01.a_Team[1]} ${teamResult01.goals_A} - ${teamResult01.goals_B} ${teamResult01.b_Team[1]} => ${teamResult01.winner[1]}`)
        this.quarter.push([teamResult01.winner[0],teamResult01.winner[1]])
    })


} catch (error) {
    console.error('ERROR: ',error)
}