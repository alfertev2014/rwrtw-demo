import { PlaceholderComponent } from "rwrtw"
import { createDynamicList } from "rwrtw/lib/reactive/listModel"
import { Source, computed, effect, source } from "rwrtw/lib/reactive/observable"
import { createRef, el, ev, fr, ref } from "rwrtw/lib/template"
import { reAttr, reContent, reEv, reList } from "rwrtw/lib/template/reactive"

const Input = (value: Source<string>): PlaceholderComponent => {
  const input = createRef<HTMLElement>()

  effect(value, (v) => {
    if (input.current) {
      ;(input.current as HTMLInputElement).value = v
    }
  })

  return el(
    "input",
    {
      type: "text",
      change: ev((e) => {
        value.change((e.target as HTMLInputElement).value ?? "")
      }),
    },
    ref(input),
  )()
}

type Item = {
  id: number
  text: string
}

let idGenerator = 0

const createItem = (text: string): Item => ({
  id: ++idGenerator,
  text,
})

const List = (): PlaceholderComponent => {
  const items = createDynamicList<Item>([
    createItem("fuck!"),
    createItem("shit!"),
  ])
  const newValue = source("")
  return fr(
    el("ol")(
      reList(items, (item) => {
        const id = computed(() => item.current().id)
        return el("li")(
          reContent(item, (value) => fr(`[${value.id}] ${value.text} `)),

          el("button", {
            click: reEv(item, (value) => () => {
              const index = items.data.findIndex(
                (item) => item.current().id === value.id,
              )
              if (index >= 0) {
                items.moveItem(index, 0, item.current())
              }
            }),
            "data-id": reAttr(id),
          })("Move to the top"),
          " ",

          el("button", {
            click: reEv(item, (value) => () => {
              const index = items.data.findIndex(
                (item) => item.current().id === value.id,
              )
              if (index >= 0) {
                items.moveItem(index, items.data.length - 1, item.current())
              }
            }),
            "data-id": reAttr(id),
          })("Move to the bottom"),
          " ",

          el("button", {
            click: reEv(item, (value) => () => {
              const index = items.data.findIndex(
                (item) => item.current().id === value.id,
              )
              if (index >= 0) {
                items.removeItem(index)
              }
            }),
            "data-id": reAttr(id),
          })("Remove"),
        )
      })
    ),
    el("div")(
      Input(newValue),
      el("button", {
        click: ev(() => {
          items.insertItem(items.data.length, createItem(newValue.current()))
          newValue.change("")
        }),
      })("Add"),
    ),
  )
}

export default List
