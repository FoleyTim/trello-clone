import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { TextField } from '@mui/material'
import { connect } from 'react-redux'
import { addList, addCard } from '../actions'
import { v4 as uuid } from 'uuid'

class AddButton extends React.Component {
    state = {
        openForm: false,
        title: '',
        description: ''
    }

    renderAddButton = () => {
        const { list } = this.props
        const buttonText = list ? 'Add list' : 'Add Card'
        return (
            <Button onClick={this.openForm} variant="outlined" size="small">{buttonText}</Button>
        )
    }

    openForm = () => {
        this.setState({ openForm: true })
    }

    closeForm = () => {
        this.setState({ openForm: false })
    }

    addList = async () => {
        const { dispatch, lists } = this.props
        const { title } = this.state
        if (title) {
            dispatch(addList({ title, listId: lists.length }))
        } else {
            alert('add list failed - title missing')
        }
        // API call
        const body = {
            title
        }
        try {
            await fetch(`http://localhost:8000/trello/list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
        } catch (e) {
            console.log(`error ${e}`)

        }
        this.closeForm()
        this.setState({ title: '' })
        return
    }

    addCard = async () => {
        const { dispatch, listId } = this.props
        const { title, description } = this.state
        const cardId = uuid()
        if (title && description) {
            dispatch(addCard(listId, title, description, cardId))
        } else {
            alert('add card failed - title or desc missing')
        }
        //Api call
        const listIdNum = new RegExp('([0-9]+)').exec(listId)

        const body = {
            title,
            description,
            listId: listIdNum[0],
            cardId
        }
        try {
            await fetch(`http://localhost:8000/trello/card`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
        } catch (e) {
            console.log(`error ${e}`)

        }
        this.closeForm()
        this.setState({ title: '', description: '' })
        return
    }

    handleTitleChange = e => {
        this.setState({ title: e.target.value })
    }

    handleDescChange = e => {
        this.setState({ description: e.target.value })
    }

    renderForm = () => {
        const { list } = this.props
        const placeHolder = list ? 'List Title' : 'Card Title'
        const buttonTitle = list ? 'Add List' : 'Add Card'
        return <Card>
            <TextField style={styles.input} autoFocus value={this.state.title} onChange={this.handleTitleChange} id="standard-basic" label={placeHolder} variant="standard" />
            {this.renderDescriptionInput(list)}
            <Button onClick={list ? this.addList : this.addCard}>{buttonTitle}</Button>
            <Button onClick={this.closeForm}>Cancel</Button>
        </Card>
    }

    renderDescriptionInput = (list) => {
        if (!list) {
            return (<TextField style={styles.input} value={this.state.description} onChange={this.handleDescChange} multiline={true} id="outlined-basic" label="Description" variant="outlined" />)
        }
    }

    render() {
        return <div style={styles.buttonContainer}>
            {this.state.openForm ? this.renderForm() : this.renderAddButton()}
        </div>
    }
}

const styles = {
    buttonContainer: {
        marginTop: 10
    },
    input: {
        width: '80%',
        marginTop: 7,
        padding: 3
    }
}



export default connect()(AddButton)