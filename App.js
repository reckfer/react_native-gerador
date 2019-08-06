/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Regra from './Regra';
import { Alert, StyleSheet, Text, TextInput, View, Button} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {codigo: '', fator: '', entrada: '', texto: ''};
    this.gerarSenha = this.gerarSenha.bind(this);
  }

  gerarSenha() {
    let s = this.state;
    let regra = new Regra(s.codigo, s.fator, s.entrada);
    s.texto = regra.executar();
    //Alert.alert(s.texto);
    this.setState(s);
    //this.salvar();
  }

  salvar() {
    AsyncStorage.getItem('entradas').then((lista) => { 
      if(lista && lista.trim()) {
        this.entradas = JSON.parse(lista); 
      }
      this.salvarUnico();
    });
  }

  salvarUnico(){
    let s = this.state;
    let oDadosEntrada = { entrada: s.entrada };
    if (this.entradas && this.entradas.length > 0) {
      let existe = false;
      
      for (entrada of this.entradas) {
        if(entrada.nome.toUpperCase() === s.entrada.toUpperCase()) {
          existe = true;
          break;
        }
        if(!existe){
          this.entradas.push(oDadosEntrada);
        }
      }

    } else {      
      this.entradas = [];
      this.entradas.push(oDadosEntrada);
    }

    AsyncStorage.setItem('entradas', JSON.stringify(this.entradas));
  }

  // listar() {
  //   let s = this.state;

    
  // }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={ styles.input } placeholder="Código" secureTextEntry={true} onChangeText={(codigo) => this.setState({codigo})}></TextInput>
        <TextInput style={ styles.input }  placeholder="Fator" secureTextEntry={true} onChangeText={(fator) => this.setState({fator})}></TextInput>
        <TextInput style={ styles.input } placeholder="Entrada" onChangeText={(entrada) => this.setState({entrada})}></TextInput>
        <Button title="Gerar" onPress={this.gerarSenha}></Button>
        <Text style={styles.texto}>{this.state.texto}</Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 10,
    padding: 10,
  },
  container: {
    paddingTop:30,
  },
  texto: {
    textAlign: "center"
  }
});