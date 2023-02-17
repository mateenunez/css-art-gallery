
import {deleteCard, saveCard, onListCards, getCard, editCard, uploadImg, getImg} from "../src/firebase.js"

//Traer datos
window.addEventListener('DOMContentLoaded', async () => {
    let a;
    let b;
    let id;
    let count = -1;
    let img;
    await onListCards((querySnapshot) => {
        querySnapshot.forEach(async doc => {
            const cardObj = doc.data();
            let img = await getImg(cardObj.title);
            a = cardObj.title;
            b = cardObj.description;
            id = doc.id;
            count=count+1;
            newCard(a,b,id,img,count);
            
            //Aca llamamos a los botones de clase btnedit dentro de las cards.
            let Artcard = document.getElementById(id) 
            let btnsEdit = Artcard.querySelectorAll('.editbtn')
            btnsEdit.forEach(btn => {
            // Destructuring
                btn.addEventListener('click', async () => {
                    let doc = await getCard(id);
                    let cardObj = doc.data();
                    // Edit form mismo q new
                    if (typeof document.forms[0] == 'undefined'){
                        const form = document.createElement('form');
                        form.innerHTML = `<form>
                        <h3>Editar dibujo</h2>
                        <input type="text" id="title" placeholder="${cardObj.title}">
                        <input type="text" id="desc" placeholder="${cardObj.description}">
                        <input type="submit" class="btnform" value="OK">
                        </form>`;
                        form.id='form';
                        form.className='newForm';
                        let div = document.getElementById('card');
                        div.style.margin = '13vh';
                        document.body.append(form);
                        
                        form.addEventListener('submit',(e) => {
                            const title = document.getElementById('title').value;
                            const description = document.querySelector('#desc').value;
                            if (title!=null && description!=null && title!='' && description!=''){
                                let newFields = {
                                    title: title,
                                    description: description
                                };
                                editCard(id, newFields);
                            }
                            e.preventDefault();
                        });
                    }

                    
                })
            })
        })
    })
    
    

})

//Mostrar cards
function crear(){
    //Crear form + img form
    if (typeof document.forms[0] == 'undefined'){
        const form = document.createElement('form');
        form.innerHTML = `<form>
        <input type="text" id="title" placeholder="Title">
        <input type="text" id="desc" placeholder="Description">
        <input type="file" id="file" src="img/" style="display: none;">
        <label for="file" class="filebtn">Upload</label>
        <input type="submit" class="btnform" value="OK">
        </form>`;
        form.id='form';
        form.className='newForm';
        let div = document.getElementById('card');
        div.style.margin = '15vh';
        document.body.append(form);

        form.addEventListener('submit',(e) => {
            const title = document.getElementById('title').value;
            const description = document.querySelector('#desc').value;
            if (title!=null && description!=null && title!='' && description!=''){
                saveCard(title,description);
            }
            e.preventDefault();
        });
        
        form.addEventListener('change', (e)=>{
            let file = e.target.files[0];
            uploadImg(file)
            e.preventDefault();
        })
    }
}

function newCard(title, description,id,img,count){
    let card = document.createElement('div');
    card.innerHTML = `<li class="img"></li>
    <li>Titulo: ${title}</li> 
    <li>Descripcion: ${description}</li> 
    <li class='cardId'>Card ID: ${id}</li>
    <button class="editbtn">Edit ${title}</button>  `
    card.id = id;
    card.className = 'card';
    document.body.appendChild(card);
    let cardImg = document.getElementsByClassName(`img`)[count];
    cardImg.style.backgroundImage = `url("${img}")`;
    
}

//Eliminar cards
const deleteId = () => {
    //Crear form
    if (typeof document.forms[0] == 'undefined'){
        const form = document.createElement('form');
        form.innerHTML = `<form>
        <input type="text" class='input' placeholder="Card ID to delete">
        <input type="submit" class="btnform" value="OK">
        </form>`;
        form.className = 'dltform';
        form.id = 'form';
        let div = document.getElementById('card');
        div.style.margin = '11vh';
        document.body.append(form)
        form.addEventListener('submit', (e)=>{
            const id = document.querySelector('input').value;
            console.log(id);
            if (id!=null && id!=undefined){deleteCard(id)}; 
            e.preventDefault();
        })
    } else {
        console.log('Ya existe un formulario')
    }
    
     
};

// Boton
const button = document.createElement('button');
button.innerText = 'New';
button.className = 'btnnew';
button.addEventListener("click", crear)
document.body.appendChild(button)

//Boton Delete
const button2 = document.createElement('button');
button2.innerText = 'Delete';
button2.className = 'btndlt';
button2.addEventListener('click', deleteId)
document.body.appendChild(button2);