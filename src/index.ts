import { createRef, createRootPlaceholder } from 'rwrtw'
import { button, div, h1, p } from 'rwrtw/lib/abbrev'
import { Hidable, hidable } from 'rwrtw/lib/components'

let counter = 0
const hello = createRef<HTMLElement>()
const even = createRef<Hidable>()
const odd = createRef<Hidable>()

const root = createRootPlaceholder(document.body)

root.setContent(
    div()(
        h1()('It Works!'),
        hello.as(p({ class: 'paragraph' })('Hello world!')),
        button(null, {
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
        div()(even.as(hidable(p()('Even!'))), odd.as(hidable(p()('Odd!'))))
    )
)
