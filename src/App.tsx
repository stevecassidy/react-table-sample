import { MyTable } from './table'
import {groceryItems} from './data'
import './App.css'

function App() {

  return (
    <>
      <div>
        <MyTable data={groceryItems}></MyTable>
      </div>
    </>
  )
}

export default App
