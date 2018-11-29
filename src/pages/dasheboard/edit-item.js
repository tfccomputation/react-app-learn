import React from 'react'
import './dasheboard.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import axios from 'axios'

class EditItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            nome: '',
            descricao: '',
            valor: '',
            quantidade: '',
            minimo: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3100/api/itemestoque/${this.props.itemID}`).then(res => {
            let item = res.data
            this.setState({
                id: this.props.itemID,
                nome: item.produto.nome,
                descricao: item.produto.descricao,
                valor: item.produto.valor,
                quantidade: item.quantidade,
                minimo: item.minimo
            })
        }).catch(err => {
            console.error(err)
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    save() {
        let item = {
            id: this.state.id,
            produto: {
                nome: this.state.nome,
                descricao: this.state.descricao,
                valor: this.state.valor
            },
            quantidade: this.state.quantidade,
            minimo: this.state.minimo
        }

        axios.put(`http://localhost:3100/api/itemestoque`, item).then(result => {
            this.props.onClose(this)
        }).catch(err => {
            console.error(err)
        })
    }

    handleReset() {
        let keys = Object.keys(this.state)
        keys.forEach(key => {
            this.setState({
                [key]: ''
            })
        })
    }

    exit(){
        this.props.onClose(this)
    }
    
    render() {

        return (
            <div className='form'>
                <TextField
                    id="standard-name"
                    label="Name"
                    className='textField'
                    value={this.state.nome}
                    onChange={this.handleChange('nome')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="standard-name"
                    label="Descrição"
                    className='textField'
                    value={this.state.descricao}
                    onChange={this.handleChange('descricao')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    id="standard-name"
                    label="Valor"
                    type="number"
                    style={{ width: '30%', marginRight: 8 }}
                    className='textField'
                    value={this.state.valor}
                    onChange={this.handleChange('valor')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="standard-name"
                    label="Quantidade"
                    type="number"
                    style={{ width: '30%', marginRight: 8 }}
                    className='textField'
                    value={this.state.quantidade}
                    onChange={this.handleChange('quantidade')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="standard-name"
                    label="Estoque Mínimo"
                    type="number"
                    style={{ width: '30%' }}
                    value={this.state.minimo}
                    onChange={this.handleChange('minimo')}
                    margin="normal"
                    variant="outlined"
                />
                <div>
                    <Button color="inherit" onClick={() => this.exit()}>Cancelar</Button>
                    <Button color="primary" onClick={() => this.handleReset()}>Limpar</Button>
                    <Button color="inherit" onClick={() => this.save()}>Salvar</Button>
                </div>
            </div>
        )
    }
}

export default EditItem