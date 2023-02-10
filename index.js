
import {deleteCard, saveCard, onListCards, getCard, editCard} from "../src/firebase.js"

//Traer datos
window.addEventListener('DOMContentLoaded', async () => {
    let a;
    let b;
    await onListCards((querySnapshot) => {
        querySnapshot.forEach(doc => {
            const cardObj = doc.data();
            a = cardObj.title;
            b = cardObj.description;
            let id = doc.id;
            newCard(a,b,id);

            //Aca llamamos a los botones de clase btnedit dentro de las cards.
            let card = document.getElementById(id) 
            let btnsEdit = card.querySelectorAll('.editbtn')
            btnsEdit.forEach(btn => {
            // Destructuring
                btn.addEventListener('click', async () => {
                    let doc = await getCard(id);
                    let cardObj = doc.data();
                    let title = prompt('Editar titulo', cardObj.title);
                    let description = prompt('Editar descripcion', cardObj.description);
                    let newFields = {
                        title: title,
                        description: description
                    };
                    editCard(id, newFields);
                })
            })
        })
    })
    
    

})

//Mostrar cards

function crear(){
    let a = prompt('Nuevo titulo', 'Titulo');
    let b = prompt('Nueva descripcion', 'Descripcion');
    saveCard(a,b);
}

function newCard(title, description,id){
    const card = document.createElement('div');
    card.innerHTML = `<li>Titulo: ${title}</li> 
    <li>Descripcion: ${description}</li> 
    <li class='cardId'>Identificacion: ${id}</li>
    <button class="editbtn">Edit ${title}</button>  `
    card.id = id;
    card.className = 'card';
    document.body.appendChild(card);
    
}

//Eliminar cards
const deleteId = () => {
    let id = prompt('Ingrese el ID de la carta a eliminar', 'String ID');
    if (id!=null && id!='String ID'){deleteCard(id)};  
};

// Boton
const button = document.createElement('button');
button.innerText = 'New';
button.className = 'btnedit';
button.addEventListener("click", crear)
document.body.appendChild(button)

//Boton Delete
const button2 = document.createElement('button');
button2.innerText = 'Delete';
button2.className = 'btndlt';
button2.addEventListener('click', deleteId)
document.body.appendChild(button2);
