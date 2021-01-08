

export default class KnockoutStage {
    constructor(name, teams=[], config={}) {
        this.name = name
        // this.matchGroupsSchedule = []
        // this.setup(config)
        this.setupTeamsA(teams)
        //this.summaries = []
        //this.summariesGroup = []
    }

    setupTeamsA(teamNames) {
        this.fTeamsA = []
        let numTeams = teamNames.length/2
        //console.log(numTeams)
        for (let i = 0; i < numTeams ; i +=2 ) {
            let team =[] 
            team = teamNames[i]
            team[i,0] = 'A'
            this.fTeamsA.push(team)
            //console.log(team)
            team = teamNames[i + numTeams]
            team[i,0] = 'A'
            this.fTeamsA.push(team)
            //console.log(team)   
        }
        for (let i = 1; i < numTeams + 1 ; i +=2 ) {
            let team =[] 
            team = teamNames[i]
            team[i,0] = 'B'
            this.fTeamsA.push(team)
            //console.log(team)
            team = teamNames[i + numTeams]
            team[i,0] = 'B'
            this.fTeamsA.push(team)
            //console.log(team)   
        }
        console.log(this.fTeamsA)

        //Faltará el filter
       


    }

    play(match){
        let goals_A = 0
        let goals_B = 0

        while (goals_A == goals_B) {
            goals_A = this.generateGoals()
            goals_B = this.generateGoals()
        }
        let winner = ''
        let loser = ''
        
        if(goals_A > goals_B){
            winner = match[0]
            loser = match[1]
        } else {
            winner = match[1]
            loser = match[0]
        }
        return{
            a_Team: match[0],
            goals_A,
            b_Team: match[1],
            goals_B,
            winner,
            loser
        }
    }
    
    generateGoals(){
        // Generamos goles de forma aleatoria
        return Math.round(Math.random() * 10)
    }

    generateRounds(teamsG = []){
        this.matches = []
        let match = []
        let matchResult = []
        for (let i = 0; i < teamsG.length ; i +=2 ) {
            matchResult = []
            match = []
            match = [teamsG[i],teamsG[i+1]]
            matchResult = this.play(match)
            this.matches.push(matchResult)
        }
        //console.table(this.matches)
    }
    cup(winner){
        const textWinner = this.centerText(winner,'_',14)
        // let wd = winner.length
        // let etq = ''
        // if (wd>=14){
        //     etq = winner.substring(0,14)
        // } else {
        //     etq = winner
        // }

        // const caracter = 16 - wd
        // const margen = Math.floor(caracter/2)
        // const margenDer = (caracter % 2) + margen
        // const textWinner = '_'.repeat(margen)+etq+'_'.repeat(margenDer)

        console.log('________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('¶¶¶¶______¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶______¶¶¶¶')
        console.log('¶¶¶_______¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_______¶¶¶')
        console.log('¶¶________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶________¶¶')
        console.log('¶¶¶_____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_____¶¶¶')
        console.log('¶¶¶____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶____¶¶¶')
        console.log('_¶¶¶___¶¶¶_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_¶¶¶___¶¶¶')
        console.log('_¶¶¶¶___¶¶¶_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_¶¶¶___¶¶¶¶')
        console.log('___¶¶¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶__¶¶¶¶')
        console.log('____¶¶¶¶¶¶¶¶_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_¶¶¶¶¶¶¶¶')
        console.log('______¶¶¶¶¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶__¶¶¶¶¶¶')
        console.log('_______________¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('_________________¶¶¶¶¶¶¶¶')
        console.log('___________________¶¶¶¶')
        console.log('___________________¶¶¶¶')
        console.log('___________________¶¶¶¶')
        console.log('___________________¶¶¶¶')
        console.log('_______________¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('____________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('____________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('____________¶¶¶____________¶¶¶')
        console.log(`____________¶${textWinner}¶`)
        console.log('____________¶¶¶____________¶¶¶')
        console.log('____________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶ ')
        console.log('____________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('__________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        console.log('_________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶')
        
    }

    centerText(textCenter,myChar,maxLength){
        let wd = textCenter.length
        let etq = ''
        if (wd>=maxLength){
            etq = textCenter.substring(0,maxLength)
        } else {
            etq = textCenter
        }

        const caracter = maxLength + 2 - wd
        const margen = Math.floor(caracter/2)
        const margenDer = (caracter % 2) + margen
        const textWinner = myChar.repeat(margen)+etq+myChar.repeat(margenDer)
        return textWinner
    }

}