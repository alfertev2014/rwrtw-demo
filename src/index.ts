import { el, ref, createRef, renderTo, hidable, Hidable, fr } from 'rwrtw'

let counter = 0
const hello = createRef<HTMLElement>()
const even = createRef<Hidable>()
const odd = createRef<Hidable>()

const app = renderTo(
    { parent: document.body },
    el('div')(
        el('h1')('It Works!'),
        ref(hello, el('p', { class: 'paragraph' })('Hello world!')),
        el('button', null, {
            click: () => {
                hello.current.textContent = `Hello world ${counter++} times!`
                if (counter % 2 === 0) {
                    even.current.show()
                    odd.current.hide()
                } else {
                    even.current.hide()
                    odd.current.show()
                }
            },
        })('Increment'),
        el('div')(ref(even, hidable(fr(el('p')('Even!')))), ref(odd, hidable(fr(el('p')('Odd!')))))
    )
)

app.mount()