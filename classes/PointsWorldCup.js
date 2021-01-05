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

    getStandings(){
        this.teams.sort(function(teamA, teamB){
            if (teamA.points > teamB.points){
                return -1
            } else if (teamA.points < teamB.points){
                return 1
            } else{
                const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst
                const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst
                if (goalsDiffA > goalsDiffB) {
                    return -1
                } else if (goalsDiffA < goalsDiffB) {
                    return 1
                } else {
                    return 0
                }

            }
        })
    }
    getStandings2(){
        this.teams.sort(function(teamA, teamB){         
               if (teamA.group === teamB.group) {
                  // La Clasificación es solo importante cuando los equipos son de mismo grupo
                  if (teamA.points > teamB.points){
                    return -1
                } else if (teamA.points < teamB.points){
                    return 1
                } else{
                    const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst
                    const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst
                    if (goalsDiffA > goalsDiffB) {
                        return -1
                    } else if (goalsDiffA < goalsDiffB) {
                        return 1
                    } else {
                        return 0
                    }
    
                }
               }
               return teamA.group > teamB.group ? 1 : -1;
            });
    }

}