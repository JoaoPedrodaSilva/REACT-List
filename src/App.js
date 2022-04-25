import React, {useState, useEffect} from "react"
import Alert from './Alert'
import Item from './Item'

//declaring the local storage
const getLocalStorage = () => {
  const list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  // declaring the states
  const [typedItem, setTypedItem] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editedId, setEditedId] = useState(null)
  const [alert, setAlert] = useState({show:false, message:'', color:''})
 
  //declaring the functions
  const clearItem = (id) => {
    setAlert({show:true, message:'The item has been cleared.', color:'red'})
    setList(list.filter(item => item.id !== id))
  }
  const editItem = (id) => {
    const selectedItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditedId(selectedItem.id)
    setTypedItem(selectedItem.name)
  }

  //hiding the alert after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({show:false, message:'', color:''})
    }, 3000)
    return () => clearTimeout(timer)
  }, [alert])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  //submitting the typed value
  const handleSubmit = (event) => {
    event.preventDefault()
    //nothing was typed, then show red alert message
    if(!typedItem) {     
      setAlert({show:true, message:'please, type an item.', color:'red'})
    }
    //list limited to 7 items, would like to know how to limit the height of the wrapper element and add a scroll, so i could scroll over unlimited items
    else if(list.length >= 7 && !isEditing) {
      setAlert({show:true, message:'list is full', color:'red'})
    }
    //item edited, then show blue alert message
    else if (typedItem && isEditing) { 
      setList(list.map(item => {
        if(item.id === editedId) {
          return {...item, name: typedItem}
        }
        return item
      }))
      setTypedItem('')
      setEditedId(null)
      setIsEditing(false)
      setAlert({show:true, message:'item edited successfully', color:'blue'})
    }
    
    //item added, then show blue alert message
    else { 
      setAlert({show:true, message:'item added successfully', color:'blue'})
      setList([...list, {id: new Date().getTime().toString(), name: typedItem}])
      setTypedItem('')
    }        
  }

  //rendering components
  return (
    <main className="app">     

      {/* alert message component*/}
      {alert.show ? <Alert {...alert} /> : <p className="alert-hidden" />}

      {/* header */}
      <section className="header">
        <h1 className="title">Grocery List</h1>
        <div className="underline" />
      </section>

      {/* form */}
      <form onSubmit={handleSubmit}>
        <input
            type='text'
            name='item'
            id='item'
            placeholder='e.g. 2 bottles of milk'
            maxLength={25}
            value={typedItem}
            onChange={(event) => setTypedItem(event.target.value)}
        />
        <button type='submit'>
          {isEditing ? 'Edit' : 'Add'}
        </button>
      </form>
      
      {/* list items components */}
      <section className="items">
        {list.map((item, index) => {
          return (
            <Item
              key={index}
              {...item}
              setTypedItem={setTypedItem}
              clearItem={clearItem}
              editItem={editItem}
            />          
          )
        })}        
      </section>

      {/* clear-all button */}
      {list.length > 0 && (
        <button
          className="clear-all"
          onClick={() => {
            {
            setAlert({show:true, message:'All items have been cleared.', color:'red'})
            setList([])
            setTypedItem('')}
          }}
        >
          Clear All
        </button>
      )}

    </main>
  )
}

export default App