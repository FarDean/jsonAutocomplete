const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

const searchStates = async searchText => {
    const res = await fetch("./state_capitals.json");
    console.log(res)
    const states = await res.json();
    console.log(states)
    let matches = states.filter(state => {
        const regEx = new RegExp(`^${searchText}`,"gi");
        return state.name.match(regEx) || state.abbr.match(regEx);
    })
    console.log(matches)
    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = "";
    }
    showContent(matches);
}
function showContent(matches){
        const html=matches.map(match=>{
           return `
            <div class="card card-body mb-2">
            <h4>Name:${match.name}   <span class="text-primary">Abbreviation:${match.abbr}</span></h4>
            <h5>Lat:${match.lat}    <small>Long:${match.long}</small></h5>
            </div>
            
            `
        }).join("");
        console.log(html)
    
    matchList.innerHTML = html;
    
}
search.addEventListener("input",()=> searchStates(search.value));

