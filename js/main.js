AOS.init();

// NOTE Função para criar card com dados do usuário
let list_user = async () => {
   $(`.content`).html('')
   $(`.user`).html('')
   let user = $(`#user`).val()
   try {
      let { data } = await axios.get(`https://api.github.com/users/${user}`)
      console.log(data)
      var { avatar_url, login, followers, name, blog } = data
      $(`.user`).html(`
         <div class="card" data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine" style="width: 18rem;">
            <img src="${avatar_url}" class="card-img-top" alt="...">
            <div class="card-body text-center">
               <h3 class="card-title">${login}</h3>
               <h5>Seguidores: ${followers}</h5>
               <h5>Nome: ${name}</h5>
               <h5>Blog: <a href="${blog}">${blog}</a></h5>
               <div class="btn btn-primary" id="repos">Repos</div>
               <div class="btn btn-primary" id="starred">Starred</div>
            </div>
         </div>
         `)

      $(`#repos`).on('click', () => {
         show_repo(login)
      })
      $(`#starred`).on('click', () => {
         show_starred(login)
      })
   }
   catch (err) {
      Swal.fire(
         'Ops, parece que o usuário não foi encontrado',
         'Experimente inserir um usuário que já conhece',
         'error'
      )
   }
}

// NOTE Função para listar os repositórios do usuário
let show_repo = async (login) => {
   let { data } = await axios.get(`https://api.github.com/users/${login}/repos`)
   $(`.content`).html('')
   data.map(item => {
      $(`.content`).append(`<div class="col-sm" data-aos="fade-left"><a href="${item.html_url}">${item.name}</a></div>`)
   })
}

// NOTE Função para listar os repositórios mais visitados pelo usuário
let show_starred = async (login) => {
   let { data } = await axios.get(`https://api.github.com/users/${login}/starred`)
   $(`.content`).html('')
   data.map(item => {
      $(`.content`).append(`<div class="col-sm" data-aos="fade-left"><a href="${item.html_url}">${item.name}</a></div>`)
   })
}


// TODO Caso o usuário aperte enter na barra de pesquisa, executará a função list_user
$(`#search`).keyup(function (event) {
   console.log(event)
   if (e.keyCode === 13) {
      list_user()
   }
})

$(`#search`).on('click', () => {
   list_user()
})