//consts
const form = document.getElementById('form')
const input = document.getElementById('input')
const name = document.querySelector('h1')
const bio = document.querySelector('h2')
const followers = document.getElementById('followers')
const following = document.getElementById('following')
const repos = document.getElementById('repos')
const anchor = document.querySelectorAll('a')
const image = document.getElementById('image')

focus()
//form event
form.addEventListener('submit', function(e){
    e.preventDefault()
    const value = input.value
    const api = `https://api.github.com/users/${value}`
    fetch(api).then(function(data){
        return data.json()
    }).then(getResult)

    const repo = `https://api.github.com/users/${value}/repos?sort=created`
    fetch(repo).then(function(data){
        return data.json()
    }).then(reposResult)
})


//get result function
function getResult(newData){
    const div = document.querySelector('.wrapper')
    div.classList.remove('hidden')
    name.textContent = `${newData.name}`
    bio.textContent = `${newData.bio}`
    followers.textContent = `${newData.followers}`
    following.textContent = `${newData.following}`
    repos.textContent = `${newData.public_repos}`
    image.setAttribute('src', `${newData.avatar_url}`)
}

// reposResult function
function reposResult(repos){
    for(let i=0; i<6; i++){
        anchor[i].setAttribute('href', repos[i].html_url)
        anchor[i].textContent = repos[i].name
    }
}
