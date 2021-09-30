const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')
const stateDel = false;

async function load() {
    const res = await fetch("http://localhost:19009/")
        .then(data => data.json())

    res.urls.map(url => addElement(url))
}

async function createAnRemove(name, url, del) {
    await fetch(`http://localhost:19009/?name=${name}&url=${url}${'&' + 
        (del ? 'del=1' : ' ')
    }`)
        .then(data => data.json())
}

load()

function addElement({
    name,
    url
}) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => {
        removeElement(trash)
        return createAnRemove(name, url, true)
    }

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')) {
        el.parentNode.remove()
        console.log('confirmado')
    } else {
        return console.log('não confirmado')
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let {
        value
    } = input

    if (!value)
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url)
        return alert('formate o texto da maneira correta')

    createAnRemove(name, url, false)
    console.log('deu certo create')

    addElement({
        name,
        url
    })

    input.value = ""
})