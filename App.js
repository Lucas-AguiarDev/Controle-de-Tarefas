import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button } from 'react-native'
import { Styles1, Styles2 } from './src/Styles/Index';
import TarefaDatabase from './src/Database/TarefaDatabase';
import Tarefa from './src/Models/Tarefa';
import TarefaComponent from './src/Components/TarefaComponent';

//-----------------------------------------------//

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      descricao: '',
      validade: '',
      prioridade: '',
      status: 'Pendente',
      lista: []
    }

    this.Listar()
  }

  //Operações tipo o CONTROLLER mas sem o MVC
  Listar = () => {
    const banco = new TarefaDatabase();
    banco.Listar().then(
      listaCompleta => {
        this.setState({ lista: listaCompleta })
      }
    )
  }

  Cadastrar = (descricao, validade, prioridade, status) => {
    const tarefaNova = new Tarefa(descricao, validade, prioridade, status);
    const banco = new TarefaDatabase();
    banco.Inserir(tarefaNova)
    this.Listar()
  }

  Atualizar = (id) => {
    const banco = new TarefaDatabase();
    banco.Atualizar(id)
    this.Listar()
  }

  Remover = (id) => {
    const banco = new TarefaDatabase();
    banco.Remover(id)
    this.Listar()
  }

  render() {
    return (
      <ScrollView style={[Styles1.view1]}>

        {/*Cadastro de tarefas*/}
        <View style={[Styles1.view2]}>
          <Text style={[Styles2.titulo]}>CADASTRAR NOVA TAREFA</Text>

          <TextInput onChangeText={(valorDigitado) => { this.setState({ descricao: valorDigitado }) }} style={[Styles2.input]} placeholder='Digite a nova tarefa'></TextInput>
          <TextInput onChangeText={(valorDigitado) => { this.setState({ validade: valorDigitado }) }} style={[Styles2.input]} placeholder='Digite a data limite de execução'></TextInput>
          <TextInput onChangeText={(valorDigitado) => { this.setState({ prioridade: valorDigitado }) }} style={[Styles2.input]} placeholder='Digite o nível de prioridade (Baixa, Média ou Alta)'></TextInput>

          <TouchableOpacity onPress={() => this.Cadastrar(this.state.descricao, this.state.validade, this.state.prioridade, this.state.status)} style={[Styles2.botao]}>
            <Text style={[Styles2.botaoText]}>SALVAR</Text>
          </TouchableOpacity>
        </View>

        {/*Listagem das tarefas*/}
        <View style={[Styles1.view2]}>

          <Text style={[Styles2.titulo]}>LISTA DE TAREFAS</Text>
          {
            this.state.lista.map(
              tarefa => (
                <TarefaComponent
                  key={tarefa.id}
                  id={tarefa.id}
                  tarefa={tarefa}
                  descricao={tarefa.descricao}
                  validade={tarefa.validade}
                  prioridade={tarefa.prioridade}
                  status={tarefa.status}
                  atualizar={this.Atualizar}
                  deletar={this.Remover}
                />
              )
            )
          }

        </View>

      </ScrollView>
    )
  }
}


