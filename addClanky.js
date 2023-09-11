
//3 premene pre otvorenie,zobrazenie a zatvorenie modelu pre pridanie clanku
const modalBtn = document.querySelector('.modal-btn')
const modal = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn')

//otvorenie modalu
modalBtn.addEventListener('click', function() {
    modal.classList.add('open-modal');
})

//zatvorenie modalu
closeBtn.addEventListener('click', function() {
    modal.classList.remove('open-modal');
})

//trieda clanok
class Clanok{
    constructor(nazov, autor, textClanku){
        this.nazov = nazov
        this.autor = autor
        this.textClanku = textClanku
    }

    static vypisClanok(){
        let clanky
        
        //vytvorenie listu pre clanky
        if(localStorage.getItem('clanky') === null){
            clanky = []
        }else{
            clanky = JSON.parse(localStorage.getItem('clanky'))
        }
        return clanky
    }
    
    //pridanie clanku do listu(push)
    static pridajClanok(clanok){
        const clanky = Clanok.vypisClanok()
        clanky.push(clanok)
        localStorage.setItem('clanky', JSON.stringify(clanky))
    }

    //vymazanie clanku z listu
    static vymazClanok(textClanku){
        const clanky = Clanok.vypisClanok()

        clanky.forEach((clanok, index) =>{
            if(clanok.textClanku === textClanku){
                clanky.splice(index, 1)
            }
        })

        localStorage.setItem('clanky', JSON.stringify(clanky))
    }
}

//prikaz clankov na stranke kde su zavolane funkcie z triedy clanok
class prikazClankov{
    static prikazNaStranke(){
        const clanky = Clanok.vypisClanok()
        clanky.forEach((clanok) => prikazClankov.pridajClanokToList(clanok))
    }
    
    //pridanie clanku na stranku kde su zavolane funkcie z triedy clanok
    static pridajClanokToList(clanok){
        const list = document.getElementById('clanok-list')
        const novyClanok = document.createElement('div')

        novyClanok.className = 'col-md-8 offset-md-2 bg-gray my-3  rounded-left shadow p-3 mb-5 bg-white rounded'
        novyClanok.innerHTML = `        
                    <h1 class="mx-2">${clanok.nazov}</h1>
                    <p class=" mx-3">${clanok.textClanku}</p>
                    <p>
                        <a href="#" class="btn bg-transparent btn-sm delete pb-4" style="float:right;">X</a>
                    </p>
                    <h6 class="text-start mx-3">Autor: ${clanok.autor}</h6>
            `
            list.appendChild(novyClanok)
    }

    //vymazanie udajov z modalu po uspesnom pridani clanku
    static clearFields(){
        document.getElementById("nazov").value = ''
        document.getElementById("autor").value = ''
        document.getElementById("textClanku").value = ''
    }

    //zobrazenie upozornenia sprava a zobrazenie btn
    static showAlert(message, className){
        const modal = document.createElement('form-group')
        //vytvorena premena modal  
        modal.className = `alert alert-${className}`
        modal.appendChild(document.createTextNode(message))
        //vytvorene dve premenne pre zobrazenie upozornenia
        const col = document.querySelector('.col-md-4')
        const form = document.getElementById("#clanok-form")
        //zobrazit upozornenie pred * *
        col.insertBefore(modal, form)
        //timer ked sa spravne upozornenie zjavi, o 1 sekundu zmizmne
        setTimeout(()=>{
            document.querySelector('.alert').remove()
        }, 1000);
    }
    //vymazanie clanku 
    static vymazClanok(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove()
            prikazClankov.showAlert("Vitrieta","success")
        }
    }
}

//domcontent sa spusti po uplnom nacitani dokumentu html bez cakania na dokoncenie nacitania
document.addEventListener('DOMContentLoaded', prikazClankov.prikazNaStranke())

//vymazanie clankov z localstorage
document.querySelector('#clanok-list').addEventListener('click', function(e){
    prikazClankov.vymazClanok(e.target)    
    Clanok.vymazClanok(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
})

//eventlistneer alebo primac udalosti je vytovoreni tu pri butone submit z funkciov volanie ostatny funkcii
document.addEventListener('submit', function(e){
    e.preventDefault()

    //3 premenne ktore najdu prvy element ze sa zhoduje s tym co je napisane v zatvorke 
    const nazov = document.querySelector('#nazov').value
    const autor = document.querySelector('#autor').value
    const textClanku = document.querySelector('#textClanku').value

    //pre modal ak je polia prazdne vypise sa upozornenine
    if(nazov == "" || autor == "" || textClanku==""){
        prikazClankov.showAlert("Zadajte všetky údaje ", "warning")
    }else{
        //ak je vsetko v poriadku vytvory sa novy objekt, zavola sa funkcia pridajclanok, prida sa clanok do listu, vypise sa upozornenie ze je clanok pridany a zavola sa funkcie na vymazanie udajov z modalu pri uspesnom pridavani noveho clanku
        const clanok = new Clanok(nazov, autor, textClanku)
        prikazClankov.pridajClanokToList(clanok)
        Clanok.pridajClanok(clanok)
        prikazClankov.showAlert("Článok je pridaný", "success")
        prikazClankov.clearFields()
    }
})
