import { PlaceholderComponent } from "rwrtw"
import { computed, source } from "rwrtw/lib/reactive/observable"
import { el, ev } from "rwrtw/lib/template"
import { reContent, reIf } from "rwrtw/lib/template/reactive"

const Counter = (): PlaceholderComponent => {
  const counter = source(0)

  return el("div")(
    el("h1")("It Works!"),
    el("p", { class: "paragraph" })(reContent(counter, () => `Hello world ${counter.current()} times!`)),
    el("button", {
      click: ev(() => {
        counter.change(counter.current() + 1)
      }),
      focus: ev(() => console.log("fuck")),
    })("Increment"),
    el("div")(reIf(computed(() => counter.current() % 2 === 0), el("p")("Even!"), el("span")("Odd!")))
  )
}

export default Counter
