//pre vytvorenie novehho objektu v jquery
init()

async function init() {
    var urlWrld = "https://api.covid19api.com/summary"
    // citanie dat z api a vypisanie dat z jquery do html kodu 
    $.get(urlWrld, function (data) {
        data = `
                <div class="col-md-6 offset-md-3">
                    <h1>Vo svete</h1>
                    <p>Pribudlo nových: ${data.Global.NewConfirmed}</p>
                    <p>Celkovo: ${data.Global.TotalConfirmed}</p>
                    <p>Celkovo obetí: ${data.Global.TotalDeaths}</p>
                </div>
                    `
        $("#data").html(data)
    })
}

//premene pre citanie api z url
var urlSrb = "https://api.covid19api.com/total/dayone/country/serbia"
var urlSk = "https://api.covid19api.com/total/dayone/country/slovakia"

//pridal som aj moju domovu krajinu pre vypisanie udajov z api viazane na covid info
//pouzivane je fetch pre manipulaciu z api a vypisanie poziadaviek, je to asynchronicke ziskavanie zdrojov cez siet
fetch(urlSrb)
    .then((res) => res.json())
    .then((res) => {
        //zhromazdenie vsetkych udajov do jedneho a vypisanie ich na html stranku(innerhtml)
        var length = res.length
        var index = length - 1
        var confirmedSrb = document.getElementById('confirmedSrb')
        var activeSrb = document.getElementById('activeSrb')
        var deathsSrb = document.getElementById('deathsSrb')

        confirmedSrb.innerHtml = ` `
        activeSrb.innerHtml = ` `
        deathsSrb.innerHtml = ` `

        confirmedSrb.append(res[index].Confirmed)
        activeSrb.append(res[index].Active)
        deathsSrb.append(res[index].Deaths)
    })

//rovnake ako pri vypisiani udajov v Srbsku, iba zmenena url(premena urlSk)
fetch(urlSk)
    .then((res) => res.json())
    .then((res) => {
        var length = res.length
        var index = length - 1
        var confirmedSk = document.getElementById('confirmedSk')
        var activeSk = document.getElementById('activeSk')
        var deathsSk = document.getElementById('deathsSk')

        confirmedSk.innerHtml = ``
        activeSk.innerHtml = ``
        deathsSk.innerHtml = ``
        datum.innerHtml = ` `

        confirmedSk.append(res[index].Confirmed)
        activeSk.append(res[index].Active)
        deathsSk.append(res[index].Deaths)
        datum.append(res[index].Date)
    })



