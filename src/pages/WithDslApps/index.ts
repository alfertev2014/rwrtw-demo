import { Dynamic, PlaceholderComponent, dyn } from "rwrtw"
import Counter from "./Counter"
import { createRef, el, ev, ref } from "rwrtw/lib/template"
import { createSyncSignal } from "rwrtw/lib/reactive/syncSignal"

const WithDslApps = (): PlaceholderComponent => {
  let selectedApp = "Counter"
  const selectedAppChanged = createSyncSignal<string>()
  const switchRef = createRef<Dynamic>()

  const handleClick = (selectedValue: string) => () => {
    selectedApp = selectedValue
    selectedAppChanged.emit(selectedApp)
  }

  selectedAppChanged.subscribe(() => {
    switchRef?.current?.refresh()
  })

  const tabButton = (app: string) => {
    const b = createRef<HTMLElement>()
    selectedAppChanged.subscribe(() => {
      if (b.current != null) {
        b.current.className = selectedApp === app ? 'app-selected' : ''
      }
    })
    return el("button", {
      click: ev(handleClick(app))
    }, ref(b))
  }

  return el("div", { class: "apps-container" })(
    el("div", { class: "apps-selector" })(
      tabButton("Counter")("Counter"),
      tabButton("TemperatureConverter")("Temperature converter")
    ),
    el("div", { class: "app-container" })(
      dyn(() => {
        switch (selectedApp) {
          case "Counter":
            return Counter()
          default:
            return null
        }
      }, ref(switchRef))
    )
  )
}

export default WithDslApps
