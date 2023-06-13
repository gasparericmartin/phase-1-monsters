addEventListener('DOMContentLoaded', () => {
   createMonsterForm()
   let page = 1
   getMonsters(page)
   
   document.getElementById('forward').addEventListener('click', () => {
    page++ 
    document.getElementById('monster-container').innerHTML = ''
    getMonsters(page)
   })
   
   document.getElementById('back').addEventListener('click', () => {
    if (page > 1) {
        page--
        document.getElementById('monster-container').innerHTML = ''
        getMonsters(page)
    }
    else {
        alert('Ain\'t no monsters here!')
    }
   })
   
})

function createMonsterForm() {
    const form = document.createElement('form')
    const nameBox = document.createElement('input')
    const ageBox = document.createElement('input')
    const descBox = document.createElement('input')
    const button = document.createElement('button') 

    nameBox.placeholder = 'name...'
    ageBox.placeholder = 'age...'
    descBox.placeholder = 'description...'
    button.textContent = 'submit'
    form.id = 'monster-form'
    nameBox.id = 'name'
    ageBox.id = 'age'
    descBox.id = 'description'
    button.addEventListener('click', handleCreateMonster)

    form.appendChild(nameBox)
    form.appendChild(ageBox)
    form.appendChild(descBox)
    form.appendChild(button)
    document.getElementById('create-monster').appendChild(form)
    
}

function getMonsters(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(data => data.forEach(e => createMonsterCard(e)))
}

function createMonsterCard(e) {
    const container = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('h4')
    const description = document.createElement('p')

    name.textContent = e.name
    age.textContent = `Age: ${e.age}`
    description.textContent = `Bio: ${e.description}`

    container.appendChild(name)
    container.appendChild(age)
    container.appendChild(description)

    document.getElementById('monster-container').appendChild(container)

}

function handleCreateMonster(e) {
    e.preventDefault()
    const submitterObj = {}
    submitterObj.name = document.getElementById('name').value
    submitterObj.age = document.getElementById('age').value
    submitterObj.description = document.getElementById('description').value

    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(submitterObj)
    })
    .then(response => response.json())
    .then(document.getElementById('monster-form').reset())
}