const deleteBtn = document.querySelectorAll('.del')
const notesItem = document.querySelectorAll('span.not')
const notesComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(notesItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(notesComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteNotes(){
    const notesId = this.parentNode.dataset.id
    try{
        const response = await fetch('notes/deleteNotes', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'notesIdFromJSFile': notesId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const notesId = this.parentNode.dataset.id
    try{
        const response = await fetch('notes/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'notesIdFromJSFile': notesId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const notesId = this.parentNode.dataset.id
    try{
        const response = await fetch('notes/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'notesIdFromJSFile': notesId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}