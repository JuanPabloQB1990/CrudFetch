// CRUD API con FECH

const d = document, 
$table=d.querySelector(".crud-table"),
$form=d.querySelector(".crud-form"),
$title=d.querySelector(".crud-title"),
$template=d.getElementById("crud-template").content,
$fragment=d.createDocumentFragment();

const getAll = async () => {
try{
    let res=await fetch('http://localhost:3000/personas'),
    json=await res.json();
    console.log(json)
    if(!res.ok) throw {status:res.status, statusText: res.statusText};
    

    json.forEach(el => {
        $template.querySelector(".nombre").textContent=el.nombre;
        $template.querySelector(".apellido").textContent=el.apellido;
        $template.querySelector(".edad").textContent=el.edad;
        $template.querySelector(".edit").dataset.id=el.id;
        $template.querySelector(".edit").dataset.nombre=el.nombre;
        $template.querySelector(".edit").dataset.apellido=el.apellido;
        $template.querySelector(".edit").dataset.edad=el.edad;
        $template.querySelector(".delete").dataset.id=el.id;

        let $clone=d.importNode($template,true);
        $fragment.appendChild($clone);
    });
        $table.querySelector("tbody").appendChild($fragment);
}catch(error){
        let message=error.statusText || "ocurrio un error"
        $table.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}:${message}</b></p>`);
}
}
getAll()
//d.addEventListener("DOMContentLoaded",getAll);

d.addEventListener("submit",async e =>{
if (e.target === $form){
    e.preventDefault();

if (!e.target.id.value){
            //create POST
    try { 
        let options = {
            method:"POST",
            headers:{"Content-type":"application/json; charset=utf-8"},
            body:JSON.stringify({
                nombre:e.target.nombre.value,
                apellido:e.target.apellido.value,
                edad:e.target.edad.value,
            }),
        }
            res=await fetch('http://localhost:3000/personas', options),
            json = await res.json();

            if(!res.ok) throw {status: res.status,statusText:res.statusText};

            location.reload();
    } catch (error) {
            let message = error.statusText || "Ocurrio un error";
            $table.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}:${message}</b></p>`);
    }
} else {
        //update - PUT
    try {
        let options={
                method:"PUT",
                headers:{"Content-type":"application/json; charset=utf-8"},
                body:JSON.stringify({
                    nombre:e.target.nombre.value,
                    apellido:e.target.apellido.value,
                    edad:e.target.edad.value,
                })
        },
                res=await fetch(`http://localhost:3000/personas/${e.target.id.value}`,options),
                json = await res.json();
                if(!res.ok) throw {status:res.status, statusText: res.statusText};
                location.reload();
    }catch(error) {
                let message = err.statusText || "Ocurrio un error";
                $table.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}:${message}</b></p>`);
    }
}

}
})

d.addEventListener("click",async e =>{
if(e.target.matches(".edit")){
    $title.textContent="Editar Santo";
    $form.nombre.value=e.target.dataset.nombre;
    $form.apellido.value=e.target.dataset.apellido;
    $form.edad.value=e.target.dataset.edad;
    $form.id.value=e.target.dataset.id;
}

//DELETE - ELIMINAR

if(e.target.matches(".delete")){
    let isDelete=confirm(`¿estas seguro de eliminar el ${e.target.dataset.id}?`)
    
    if(isDelete){
        try {
            let options={
                method:"DELETE",
                headers:{"Content-type":"application/json; charset=utf-8"},
            },
                res=await fetch(`http://localhost:3000/personas/${e.target.dataset.id}`,options),
                json = await res.json();
                if(!res.ok) throw {status:res.status, statusText: res.statusText};
                location.reload();
        }catch(error) {
                let message = err.statusText || "Ocurrio un error";
                $table.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}:${message}</b></p>`);
            }
    }
}
})