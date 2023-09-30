/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import  iso3166 from 'iso-3166-1';


import {Picker} from '@react-native-picker/picker';
const Formulario = ({lugar, setLugar, setConsultar, consultar}) => {
  const [animacion] = useState(new Animated.Value(1));

  const {pais, ciudad} = lugar;
  const coutitries = iso3166.all();
  const animacionEntrada = () => {
    Animated.spring(animacion, {
      toValue: 0.9,
      useNativeDriver: false,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacion, {
      toValue: 1,
      friction: 1,
      tension: 78,
      useNativeDriver: false,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacion}],
  };

  const validarInformacion = () => {
    if (pais === '' || ciudad === '') {
      alerta();
      return;
    }
    setConsultar(true);
  };
  const alerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios');
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={ciudad}
            // eslint-disable-next-line no-shadow
            onChangeText={ciudad => setLugar({...lugar, ciudad})}
            style={styles.input}
            placeholder="ciudad"
            placeholderTextColor="#000"
          />
        </View>
      </View>
      <View>
        <Picker
          style={styles.picker}
          selectedValue={pais}
          // eslint-disable-next-line no-shadow
          onValueChange={ pais => setLugar({...lugar, pais})}>
          <Picker.Item label="--seleccionar pais--" value="" />
          {coutitries.map(country => (
              <Picker.Item key={country.alpha3} label={country.country} value={country.alpha2} />
          ))}
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}
        onPress={() => validarInformacion()}>
        <Animated.View style={[styles.boton, estiloAnimacion]}>
          <Text style={styles.botonTexto}>Buscar clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  picker: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
  },
  boton: {
    backgroundColor: '#5e49e2',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Formulario;
