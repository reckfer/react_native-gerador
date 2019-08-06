import { Alert } from 'react-native';

export default class Regra {
    constructor(codigo, fator, entrada) {
        this.resultado = '';
        this.codigo = codigo;
        this.fator = fator;
        this.entrada = entrada;                
        this.executar = this.executar.bind(this);
        this.validarCodigo = this.validarCodigo.bind(this);
        this.parametroEntrada = [15, 01, 10, 04, 97, 00, 11, 14];
    }

    executar() {
        let i, d, t;
        let tam = this.entrada.length;
        this.resultado = [];
        d = this.fator;

        if (this.validarCodigo()) {
            t = d % tam;

            if (t == 0) {
                d = 0;
                i = tam - 1;
            }
            else {
                i = tam - t;
                d = i;
            }
            //Forma os numeros
            for (t = 0; t < 2; t++) {
                if (t == 0) {
                    this.resultado.push(this.entrada[d].toUpperCase().charCodeAt(0).toString().substring(0, 2));
                }
                else {
                    this.resultado.push(this.entrada[i].charCodeAt(0).toString().substring(0, 2));
                }
                i--;
            }

            this.resultado.push('.');

            for (let g = 0; g < this.entrada.length; g++) {
                if (g === d) {
                    this.resultado.push(this.entrada[g].toUpperCase());
                }
                else {
                    this.resultado.push(this.entrada[g]);
                }
            }
        }
        return this.resultado.join('');
    }

    validarCodigo() {

        if (this.codigo.length > 0) {
            for (let i = 0; i < this.codigo.length; i++) {
                if (this.codigo.charCodeAt(i) !== this.parametroEntrada[i]) {
                    Alert.alert("Codigo incompatível.");
                    return false;
                }
            }
            return true;
        }
        else {
            Alert.alert("Codigo incompatível.");
            return false;
        }
    }
}