import { Button, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { Styles1, Styles2 } from '../Styles/Index';

export default class TarefaComponent extends Component {

    getEstilo() {
        if(this.props.status === 'Pendente') {
            return {color: 'red', fontWeight: 'bold'}
        }
        else if (this.props.status === 'Concluido') {
            return {color: 'green', fontWeight: 'bold'}
        }
        else {
            return {color: 'black'}
        }
    }

    render() {
        return (
            <View style={[Styles1.view3]}>
                <Text>Descrição: <Text>{this.props.descricao}</Text></Text>
                <Text>Validade: <Text>{this.props.validade}</Text></Text>
                <Text>Prioridade: <Text>{this.props.prioridade}</Text></Text>
                <Text>Status: <Text style={this.getEstilo()}>{this.props.status}</Text></Text>

                <View style={[Styles1.view4]}>
                    <TouchableOpacity style={[Styles2.botao2]} onPress={() => this.props.atualizar(this.props.id)}>
                        <Text style={[Styles2.botaoText2]}>CONCLUIR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[Styles2.botao3]} onPress={() => this.props.deletar(this.props.id)}>
                        <Text style={[Styles2.botaoText2]}>EXCLUIR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
