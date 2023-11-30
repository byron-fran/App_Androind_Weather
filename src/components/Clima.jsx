/* eslint-disable eol-last */
/* eslint-disable curly */
/* eslint-disable radix */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { Text, View, StyleSheet, Image } from 'react-native';


const Clima = ({lugar}) => {
    const {name, main} = lugar;
    const kelvin = 273.15;
    if (name === undefined) return null;
  return (
    <View>
        <Text style={styles.textoClima} > {parseInt(main.temp - kelvin)}
            <Text>&#x2103;</Text>
            <Image style={{ width : 66, height : 50}} source={{uri : `http://api.openweathermap.org/img/w/${lugar.weather[0].icon}.png`}}/>
        </Text>
        <View style={styles.climas}>
            <View >
                <Text style={styles.texto}>min {parseInt(main.temp_min - kelvin)}
                <Text>&#x2103;</Text>
                </Text>
            </View>
            <View>
                 <Text   style={styles.texto}>max {parseInt(main.temp_max - kelvin)}
                <Text>&#x2103;</Text>
                </Text>
            </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    textoClima :{
        color : '#fff',
        fontSize : 70,
        textAlign : 'center',
        marginLeft : 0,
        fontWeight : 'bold',
    },
    climas :{
        justifyContent : 'center',
        flexDirection : 'row',
        gap : 15,
        marginBottom : 10,
    },
    texto :{
        color : '#fff',
        textAlign : 'center',
    },
});

export default Clima