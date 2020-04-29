const DOG_URL = `http://localhost:3000/dogs`
const main = document.querySelector('main')
const newDogForm = document.getElementById('new-dog')

document.addEventListener('DOMContentLoaded', () => {

fetchDogs(); //initalize method chain
addDog(); //creates new dog

})

function addDog() {
    newDogForm.addEventListener('submit', handleNewDog)
}

//  creates elements for dog card
function makeDogCard(dog) {
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const dogName = document.createElement('p')
    const img = document.createElement('img')
    const like_count = document.createElement('p')
    const likeBtn = document.createElement('button')
    const SuprlikeBtn = document.createElement('button')
    const ul = document.createElement('ul')
    const form = document.createElement('form')
    const deleteBtn = document.createElement('button')

    div.id = dog.id
    h2.innerText = dog.breed
    dogName.innerText = dog.name
    img.src = dog.image
    like_count.innerText = `Likes: ${dog.likes}`
    likeBtn.innerText = '<3'
    SuprlikeBtn.innerText = 'XD'
    ul.id = 'comments_list'
    ul.innerText = 'Comments:'
    form.innerHTML = `
        <form>
        <label>Add Comment:</label>
        <input placeholder='text here' type='text' name='comment'></input>
        <input type='submit'></input>
        </form>
        `
    deleteBtn.innerText = "Hate this dog.."
    // function add comments to dog
    addComments(dog, ul)

    // event listen for submit comment
    form.addEventListener('submit', () => handleComment(dog))
    likeBtn.addEventListener('click', () => handleLike(dog, like_count, 1))
    SuprlikeBtn.addEventListener('click', () => handleLike(dog, like_count, 10))
    deleteBtn.addEventListener('click', () => handleDelete(dog, div))

    // stacks all elements
    div.append(h2, dogName, img, like_count, likeBtn, SuprlikeBtn, ul, form, deleteBtn)
    main.appendChild(div)
}

// addes comments to dog card
function addComments(dog, ul) {
    dog.comments.forEach(comment => {
        const li = document.createElement('li')
        li.innerText = comment
        ul.appendChild(li)
    })
}

// event handlers
function handleLike(dog, like_count, amount) {
    like_count.innerText = `Likes: ${dog.likes += amount}`
    patchLikes(dog);
}

function handleComment(dog) {
    event.preventDefault();
    dog.comments.push(event.target.comment.value)
    patchComment(dog)
}

function handleNewDog() {
    event.preventDefault();
    dog = {
        likes: 0, 
        name: event.target.name.value, 
        breed: event.target.breed.value, 
        image: event.target.image.value,
        comments: []
    }
    postDog(dog);
}

function handleDelete(dog, div) {
    deleteDog(dog)
    alert('WOW! rude...')
    div.remove()
}

// fetches
function postDog(dog) {
    fetch(DOG_URL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(resp=>resp.json())
    .then(dog=>makeDogCard(dog))
}

function fetchDogs() {
    fetch(DOG_URL)
    .then(resp=>resp.json())
    .then(dogs => {
        dogs.forEach(dog=>makeDogCard(dog))
    })
}

function patchComment(dog) {
    event.preventDefault()
    fetch(`${DOG_URL}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(resp=>resp.json())
    .then(dog=> {
        const div = document.getElementById(dog.id)
        const ul = div.querySelector('#comments_list')
        const li = document.createElement('li')
        let last = dog.comments.length-1
        li.innerText = dog.comments[last]
        // li.innerText = dog.comments.all.last Look up JS array selector
        ul.appendChild(li)
    })
}

function patchLikes(dog, amount) {
    fetch(`${DOG_URL}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            Accepts: 'application/json'
        },
        body: JSON.stringify(dog)
    })
}

function deleteDog(dog) {
    fetch(`${DOG_URL}/${dog.id}`, {method: 'DELETE'})
}
