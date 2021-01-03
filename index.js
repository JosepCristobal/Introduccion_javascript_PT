//Inicio de nuestra práctica de introducción a Javascript

import { worldTeams } from './teams.js'
import GroupStage from './classes/GroupStage.js'

try {
    console.log(worldTeams)
    const config = { rounds: 1 }
    const worldCup = new GroupStage('Group Stage', worldTeams, config)

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

} catch (error) {
    console.error('ERROR: ',error)
}