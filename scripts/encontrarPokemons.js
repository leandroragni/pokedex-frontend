let request = new XMLHttpRequest()

request.open('GET', 'https://ciag-leandroragni.c9users.io/api/pokemon/encontrar', true)

const listaDeMovimentos = (movimentos) => {
    let movimentosParsed = JSON.parse(movimentos)
    
    let nomeDosMovimentos = [] 
    movimentosParsed.forEach((movimento) => {
        return nomeDosMovimentos.push(movimento.move.name)
    })
    
    console.log(nomeDosMovimentos)
    
    return nomeDosMovimentos.toString()
}

const divImagem = document.getElementById("pokemon-imagem")

request.onload = function () {
    
    var data = null

    if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(this.response)
        
        const divImagem = document.getElementById("pokemon-imagem")
        divImagem.innerHTML = `<img src="${ data.imagem }">`
        
        const divNome = document.getElementById('pokemon-nome')
        divNome.innerHTML = `<p>Um ${ data.nome } selvagem apareceu!</p><input type="hidden" id="nome-oculto" value="${ data.nome }" />`
    } else {
        console.log('Não há pokemons aqui!')
    }
}

request.send()

function lancarPokebola() {
    let pokemonNome = document.getElementById('nome-oculto').value
    
    let requestCapturar = new XMLHttpRequest()

    requestCapturar.open('GET', 'https://ciag-leandroragni.c9users.io/api/pokemon/capturar/' + pokemonNome, true)
    
    requestCapturar.onload = function () {
        
        if (requestCapturar.status >= 200 && requestCapturar.status < 400) {
            var dataCapturado = JSON.parse(requestCapturar.response)
            
            const divCapturado = document.getElementById('pokemon-capturado')
            
            const divCapturar = document.getElementById('pokemon-capturar')
            
            if (dataCapturado.data == 'capturado') {
                divCapturado.innerHTML = 'Parabéns o pokemon foi capturado! Acesse os dados na pokedex!'
                divImagem.innerHTML = '<img hieght=100 width=100 src="../imagens/pokebola.png">'
                divCapturar.innerHTML = '<a class="btn btn-primary my-2" href="/pokemon/encontrarPokemon.html">Procurar mais pokemons</a>'
                return
            }
            
            divCapturado.innerHTML = 'O pokemon fugiu!'
            divImagem.innerHTML = '<img hieght=100 width=100 src="../imagens/troll.png">'
            divCapturar.innerHTML = '<a class="btn btn-primary my-2" href="/pokemon/encontrarPokemon.html">Procurar mais pokemons</a>'
            return
        }
        
    }
    
    requestCapturar.send()
}