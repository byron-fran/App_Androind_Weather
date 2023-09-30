/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Clima from './src/components/Clima';

const App = () => {
  const [consultar, setConsultar] = useState(false);

  const [lugar, setLugar] = useState({
    pais: '',
    ciudad: '',
  });

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    const getData = async () => {
      if (consultar) {
        try {
          const key = '00285f86e38eb2bb0077f3b294e6e0ac';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${lugar.ciudad},${lugar.pais}&appid=${key}`;
          const res = await fetch(url);
          const data = await res.json();
          setLugar(data);
          setConsultar(false);
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    getData();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Ciudad no válida o inexistente. Intenta con otra');
  };
  //jsx
  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <>
        <View style={styles.app}>
          <Clima lugar={lugar} />
          <View style={styles.contenido}>
            <Formulario
              lugar={lugar}
              setLugar={setLugar}
              consultar={consultar}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};
//Estilos
const styles = StyleSheet.create({
  app: {
    backgroundColor: 'rgb(71, 149, 212)',
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '3%',
  },
});
export default App;
