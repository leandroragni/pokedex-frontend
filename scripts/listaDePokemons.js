let request = new XMLHttpRequest()

request.open('GET', 'https://ciag-leandroragni.c9users.io/api/pokemon/listar/capturados', true)

const listaDeMovimentos = (movimentos) => {
    let movimentosParsed = JSON.parse(movimentos)
    
    let nomeDosMovimentos = [] 
    movimentosParsed.forEach((movimento) => {
        return nomeDosMovimentos.push(movimento.move.name)
    })
    
    console.log(nomeDosMovimentos)
    
    return nomeDosMovimentos.toString()
}

request.onload = function () {
    
    var data = null

    if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(this.response)
        data.forEach((pokemon) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `<td><img src="${ pokemon.imagem }"></td><td>${ pokemon.nome }</td><td>${ listaDeMovimentos(pokemon.movimentos) }</td><td>${pokemon.created_at}</td>`
            
            const tbody = document.getElementById('lista-de-pokemons')
            tbody.appendChild(tr)
        })
    } else {
        console.log('error')
    }
}

request.send()

