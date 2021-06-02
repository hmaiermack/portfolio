let filtered;

async function fetchData(){
    let response = await fetch('https://api.github.com/users/hmaiermack/events')

    let data = await response.json();
    filtered = data.filter(item => item.type === "PushEvent").slice(0, 5)
}

function populateDiv() {
    $("#github-div").empty()
    $("#github-div").append(`<h2 style="align-self: center;">Recent Github Activity</h2>`)
    filtered.forEach(item => {
        $("#github-div").append(`
        <div style="display:flex; align-items:flex-start; padding-bottom: 1rem;">
            <h3 style="margin: 0; flex-direction: row"><strong>${item.created_at.substr(0, 10)}</strong></h3>
            <h3 style="margin: 0; text-decoration: none;"><a href="https://github.com/${item.repo.name}">${item.repo.name}</a></h3>
            <h4 style="margin: 0; flex-direction: row; color: #689dca;">${item.actor.display_login} |&nbsp;
            <a  href="https://github.com/${item.repo.name}/commit/${item.payload.head}">commit url</a></h4>
            <p style="margin-top: 0; text-align: left; font-size: large;">${item.payload.commits[0].message}</p>
        </div>
        `)
    })
}

async function makeGithubDiv(){
    await fetchData()
    populateDiv()
}

makeGithubDiv()