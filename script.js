const matchesDiv = document.getElementById('matches')
const weekSelector = document.getElementById('weekSelector')
const yearSelector = document.getElementById('yearSelector')
const seasonSelector = document.getElementById('seasonSelector')
const selectorsDiv = document.getElementById('seasonSelect')

const API_KEY = 'af43c658afc645f29c4d40ad7cd52bd6'
const BASE_URL = 'https://api.sportsdata.io/v3/nfl/scores/json/'
const WEEKLY_URL = 'TeamGameStats/'

// Full link for Weekly matches API call:
// https://api.sportsdata.io/v3/nfl/scores/json/TeamGameStats/{season}/{week}?key=a4ce21f14e3c4c94a410e5c8def9b9b3
// Example link for 2022 Regular season, Week 1:
// https://api.sportsdata.io/v3/nfl/scores/json/TeamGameStats/2022REG/1?key=a4ce21f14e3c4c94a410e5c8def9b9b3


/* TODO for later: Change default week value based on dates. */

selectorsDiv.addEventListener('change', () => {
    clearUI()
    loadData(yearSelector.value, seasonSelector.value, weekSelector.value)
})

seasonSelector.addEventListener('change', () => {
    optionChanger()
})

// Load data to the UI from the API
// Code have to be cleaned after successfull testing

/* API response notes
* Response JSON from the NFL API.
* Cleared all the data I will not use in this project.
* Keep in mind that the returned scores are not correct scores due to a free subscription to the NFL API
*
* [{"Date":"2022-09-08T20:20:00","Season":2022,"Week":1,"AwayTeam":"BUF","HomeTeam":"LAR","AwayScore":48,
* "HomeScore":16}},... 
*/

const loadData = (year, season, week) => {
    fetch(`${BASE_URL}${WEEKLY_URL}${year}${season}/${week}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let readGameKeys = []
        for(let match of data) {
            console.log(match)
            if(match.Week == weekSelector.value && !readGameKeys.includes(match.GameKey)){
                // ROW FOR THE MATCH
                readGameKeys.push(match.GameKey)
                let rowDiv = document.createElement('div')
                rowDiv.classList.add('row')
                
                // MATCH CURRENT SCORE FROM HERE:
                // Making an outer div around home team and away team to handle onclick as selection
                // instead of radio buttons
                let matchDetailsDiv = document.createElement('div')
                matchDetailsDiv.classList.add('matchCurrentScore')
                rowDiv.appendChild(matchDetailsDiv)


                let homeTeamElements = document.createElement('div')
                homeTeamElements.classList.add('matchCurrentScore')
                homeTeamElements.classList.add('homeTeamDiv')
                homeTeamElements.addEventListener('click', () => {
                    homeTeamElements.style = "border: 3px solid yellow;"
                    awayTeamElements.style = "border: none;"
                    console.log(`User predicted ${match.HomeTeam} to win`)
                })
                matchDetailsDiv.appendChild(homeTeamElements)


                /* let matchDiv = document.createElement('div')
                matchDiv.classList.add('matchCurrentScore')
                homeTeamElements.appendChild(matchDiv) */

                let homeImage = document.createElement('img')
                homeImage.src = `/images/logo-${match.Team}.png`
                homeImage.classList.add('teamLogo')
                homeTeamElements.appendChild(homeImage)
            
                let homeTeam = document.createElement('p')
                homeTeam.innerText = `${match.Team}`
                homeTeam.classList.add('homeTeam')
                homeTeamElements.appendChild(homeTeam)
            
                let homeScore = document.createElement('p')
                homeScore.innerText = `${match.Score}`
                homeScore.classList.add('homeScore')
                homeTeamElements.appendChild(homeScore)
            
                let placeIndicator = document.createElement('p')
                placeIndicator.innerText = `@`
                placeIndicator.classList.add('matchCurrentScore')
                placeIndicator.classList.add('locationIndicator')
                matchDetailsDiv.appendChild(placeIndicator)

                // AWAY TEAM

                let awayTeamElements = document.createElement('div')
                awayTeamElements.classList.add('matchCurrentScore')
                awayTeamElements.classList.add('awayTeamDiv')
                awayTeamElements.addEventListener('click', () => {
                    awayTeamElements.style = "border: 3px solid yellow;"
                    homeTeamElements.style = "border: none;"
                    console.log(`User predicted ${match.Opponent} to win`)
                })
                matchDetailsDiv.appendChild(awayTeamElements)
            
                let awayScore = document.createElement('p')
                awayScore.innerText = `${match.OpponentScore}`
                awayScore.classList.add('awayScore')
                awayTeamElements.appendChild(awayScore)
            
                let awayTeam = document.createElement('p')
                awayTeam.innerText = `${match.Opponent}`
                awayTeam.classList.add('awayTeam')
                awayTeamElements.appendChild(awayTeam)

                let awayImage = document.createElement('img')
                awayImage.src = `/images/logo-${match.Opponent}.png`
                awayImage.classList.add('teamLogo')
                awayTeamElements.appendChild(awayImage)

                // MATCH CURRENT SCORE ENDS HERE
        
            
                matchesDiv.appendChild(rowDiv)
    
            }
        }
    })
}

const loadFirstWeek = () => {
    loadData(2022,'REG',1)
}

function clearUI() {
    while(matchesDiv.firstChild){
        matchesDiv.removeChild(matchesDiv.lastChild)
    }
}

const optionChanger = () => {
    if(seasonSelector.value == 'PRE'){
        
        removeOptionElements()
        
        for(let i=1 ; i < 5; i++){
            optionElementMaker(i)
        }
    } else if (seasonSelector.value == 'REG'){
        removeOptionElements()

        for(let i=1 ; i < 19; i++){
            optionElementMaker(i)
        }
    } else {
        removeOptionElements()

        for(let i=1 ; i < 5; i++){
            let opt = document.createElement('option')
            opt.value = i
            
            if(i == 1) {
                opt.innerText = 'Wildcard Weekend'
                weekSelector.appendChild(opt)
            } else if(i == 2){
                opt.innerText = 'Divisional Playoffs'
                weekSelector.appendChild(opt)
            } else if(i == 3){
                opt.innerText = 'Conference Championships'
                weekSelector.appendChild(opt)
            } else {
                opt.innerText = 'SuperBowl'
                weekSelector.appendChild(opt)
            }
        }
    }
}

const removeOptionElements = () => {
    while(weekSelector.options.length > 0){
        weekSelector.remove(weekSelector.options.lastChild)
    }
}

const optionElementMaker = (i) => {
    let opt = document.createElement('option')
            opt.value = i
            opt.innerText = `Week ${i}`
            weekSelector.appendChild(opt)
}

loadFirstWeek()