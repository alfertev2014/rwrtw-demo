import { ifElse, IfElse, PlaceholderComponent } from "rwrtw"
import { el, ev, createRef, ref } from "rwrtw/lib/template"

const Counter = (): PlaceholderComponent => {
  let counter = 0
  const evenOdd = createRef<IfElse>()
  const hello = createRef<HTMLElement>()

  const handleClick = () => {
    if (hello.current) {
      hello.current.textContent = `Hello world ${++counter} times!`
    }
    if (evenOdd.current) {
      evenOdd.current.condition = counter % 2 === 0
    }
  }

  return el("div")(
    el("h1")("It Works!"),
    el("p", { class: "paragraph" }, ref(hello))("Hello world!"),
    el("button", {
      click: ev(handleClick),
      focus: ev(() => console.log("focus!")),
    })("Increment"),
    el("div")(ifElse(true, el("p")("Even!"), el("span")("Odd!"), ref(evenOdd)))
  )
}

export default Counter
