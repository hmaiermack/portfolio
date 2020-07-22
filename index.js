let loading = true
let filtered;

async function fetchData(){
    let response = await fetch('https://api.github.com/users/hmaiermack/events')

    let data = await response.json();
    filtered = data.filter(item => item.type === "PushEvent").slice(0, 5)

    loading = false;
}

function populateDiv() {
    loading ? $("#github-activity").append("loading...")
    : filtered.forEach(item => {
        $("#github-div").append(`
        <div style="display:flex; align-items:flex-start">
            <h3 style="margin: 0;">${item.created_at.substr(0, 10)}</h3>
            <h4 style="margin: 0 0 0.5em 0; flex-direction: row; color: #689dca;">${item.actor.display_login} |&nbsp;
            <a  href="https://github.com/${item.repo.name}/commit/${item.payload.head}">commit url</a> &nbsp;|&nbsp;
            <a  href="https://github.com/${item.repo.name}">repo url</a></h4>
            <p style="margin-top: 0; text-align: left;">${item.payload.commits[0].message}</p>
        </div>
        `)
    })
}

async function makeGithubDiv(){
    await fetchData()
    populateDiv()
}

makeGithubDiv()