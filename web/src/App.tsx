import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"

function App() {

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex space-x-5 m-5">
      <Button>Label default</Button>
      <Button disabled>Label default disabled</Button>
      <Button variant="secondary">Label secondary</Button>
      <Button variant="secondary" disabled>Label secondary disabled</Button>
    </div>
    <form action="">
    <Input placeholder="Teste" pattern="\d"/>

    </form>

    <p className="text-xl">Text xl</p>
    <p className="text-lg">Text lg</p>
    <p className="text-md">Text md</p>
    <p className="text-sm">Text sm</p>
    <p className="text-xs">Text xs</p>
    </div>
  )
}

export default App
