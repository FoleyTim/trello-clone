import './App.css';
import { useEffect } from 'react';
import Header from './components/Header';
import List from './components/List';
import { connect } from 'react-redux'
import AddButton from './components/AddButton';
import { DragDropContext } from 'react-beautiful-dnd'
import { reloadLists } from './actions'


function App(props) {

  useEffect(() => {
    fetchLists()
  }, [])

  const { lists } = props

  const fetchLists = async () => {
    const { dispatch } = props
    try {
      const listsInJson = await fetch(`http://localhost:8000/trello/list`)
      const lists = await listsInJson.json()
      if (lists.length > 0) {
        dispatch(reloadLists(lists))
      }
    } catch (e) {
      console.log(`error ${e}`)
    }
  }


  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    const body = {
      sourceList: source.droppableId,
      sourceposition: source.index,
      targetList: destination.droppableId,
      targetPosition: destination.index
    }
    try {
      await fetch(`http://localhost:8000/trello/card`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      fetchLists()
    } catch (e) {
      console.log(`error ${e}`)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Header />
        <div style={styles.listsContainer}>
          {lists.map(list => <List listId={list.listId} key={list.listId} title={list.title} cards={list.cards}></List>)}
          <div style={styles.addListContainer}>
            <AddButton list={true} lists={lists} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

const styles = {
  listsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  addListContainer: {
    width: 200,
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
