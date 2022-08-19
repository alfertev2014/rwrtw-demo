import { el, ref, createRef, hidable, Hidable, createRootPlaceholder } from 'rwrtw'

let counter = 0
const hello = createRef<HTMLElement>()
const even = createRef<Hidable>()
const odd = createRef<Hidable>()

const root = createRootPlaceholder(document.body)

root.setContent(
    el('div')(
        el('h1')('It Works!'),
        ref(hello, el('p', { class: 'paragraph' })('Hello world!')),
        el('button', null, {
            click: () => {
                hello.current.textContent = `Hello world ${++counter} times!`
                if (counter % 2 === 0) {
                    even.current.show()
                    odd.current.hide()
                } else {
                    even.current.hide()
                    odd.current.show()
                }
            },
        })('Increment'),
        el('div')(ref(even, hidable(el('p')('Even!'))), ref(odd, hidable(el('p')('Odd!'))))
    )
)
