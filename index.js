//Inicio de nuestra práctica de introducción a Javascript

import { worldTeams } from './teams.js'
import GroupStage from './classes/GroupStage.js'

try {
    console.log(worldTeams)
    const config = { rounds: 1 }
    const worldCup = new GroupStage('Group Stage', worldTeams, config)

    const teamNames = worldCup.teams.map(team => team.name)

    teamNames.forEach(function(equipo) {
        console.log(equipo)
    })

    worldCup.generateGroups()
    //Verificamos que se han asignado los grupos de forma correcta
    console.table(worldCup.teams)

} catch (error) {
    console.error('ERROR: ',error)
}

