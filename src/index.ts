import { cmpnt, createRootPlaceholder, on } from 'rwrtw'
import { button, div, h1, p } from 'rwrtw/lib/abbrev'
import { ifElse, IfElse } from 'rwrtw/lib/mvvm'

let counter = 0
let hello: HTMLElement
let evenOdd: IfElse

const handleClick = () => {
    hello.textContent = `Hello world ${++counter} times!`
    evenOdd.condition = counter % 2 === 0
}

const app = cmpnt(() =>
    div()(
        h1()('It Works!'),
        p({ class: 'paragraph' }, (_) => {
            hello = _
        })('Hello world!'),
        button(
            null,
            on({
                click: handleClick,
            })
        )('Increment'),
        div()(
            ifElse(
                true,
                () => p()('Even!'),
                () => p()('Odd!'),
                (_) => (evenOdd = _)
            ),
        )
    )
)

const root = createRootPlaceholder(document.body)

root.setContent(app())
