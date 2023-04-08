const campoDePesquisa = document.querySelector('.formulario-pesquisa')
const inputPesquisa = document.querySelector('.pesquisa-filme')
const containerFilme = document.querySelector('.container-filme')
const mensagemDeErro = document.querySelector('.mensagem-de-erro')

async function conectaAPI (filme) {
    const conexao = await fetch(`https://www.omdbapi.com/?t=${filme}&apikey=79dd6611`)
    const conexaoConvertida = await conexao.json()

    if (conexaoConvertida['Response'] != 'False') {
        return conexaoConvertida
    } else {
        containerFilme.innerHTML = `<h1 class="mensagem-de-erro">Sorry, we couldn't find the movie you've searched for <i class="fa-regular fa-face-sad-cry"></i> Would you mind trying again?</h1>`
    }

    console.log(conexaoConvertida)

}

campoDePesquisa.addEventListener('submit', (evento) => {
    evento.preventDefault()

    buscaFilme()
    
    inputPesquisa.value =''

})

async function buscaFilme () {
    let busca = await conectaAPI(inputPesquisa.value.replace(' ', '-'))
    
    mostraFilme(busca)

}

async function mostraFilme (filme) {
    containerFilme.innerHTML = `
    <h1 class="titulo-filme">${filme.Title} (${filme.Year})</h1>
    <p class="diretor-filme">${filme.Director}</p>
    <img src="${filme.Poster}" class="imagem-filme">
    <p class="classificacao-filme">${filme.Rated}</p>
    <h3 class="elenco-filme">${filme.Actors}</h3>
    <p class="descricao-filme">${filme.Plot}</p>
    `
}