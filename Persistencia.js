import { Alert, AsyncStorage } from 'react-native';

export class Persistencia{

    constructor() {
        this.salvar = this.salvar.bind(this);
        this.obter = this.obter.bind(this);
    }
    salvar = async (oJsonDados) => {
        try {
          await AsyncStorage.setItem(oJsonDados.nome, JSON.stringify(oJsonDados));
        } catch (error) {
          Alert.alert('Erro ao salvar dados', error);
        }
    };

    obter = async (oJsonDados) => {
        try {
          const value = await AsyncStorage.getItem(oJsonDados.nome);
          
          return value;
        } catch (error) {
            Alert.alert('Erro ao obter dados salvos', error);
        }
    };
}