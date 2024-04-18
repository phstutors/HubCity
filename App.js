import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

    <View style={styles.containerItens}>

        <Text style={styles.textStyle}>Olá Pedro Henrique, Seja Bem Vindo!</Text>
          <Image
        source={require('./assets/avatar.png')}
        style={{ width: 100, height: 100 }}/>
    </View>


    <View style={styles.containerForms}>

      <TextInput
          placeholder="Type something..."
          style={styles.containerFormItens}
        />

    </View>

    <View style={styles.containerCity}>  

    <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Palmares</Text>
      </View>
      <View style={styles.containerCityCard}>
      <Text style={styles.containerCityCardText}>Agua Preta</Text>
    
      </View>

      <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Joaquim Nabuco</Text>
      </View>
      <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Recife</Text>
      </View>

      <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Palmares</Text>
      </View>
      <View style={styles.containerCityCard}>
      <Text style={styles.containerCityCardText}>Agua Preta</Text>
    
      </View>

      <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Joaquim Nabuco</Text>
      </View>
      <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Recife</Text>
      </View>

      <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Joaquim Nabuco</Text>
      </View>
      <View style={styles.containerCityCard}>
        <Text style={styles.containerCityCardText}>Recife</Text>
      </View>

    </View>



    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#18163D',
    justifyContent: 'top',
    color: '#fff'
     // Adiciona espaço horizontal para afastar os itens das bordas
  },
  containerItens:{
    display: 'flex',
    padding: 30,
    flexDirection: 'row', // Altera a direção para "row" para os itens ficarem lado a lado
    alignItems: 'center', // Alinha os itens verticalmente
    justifyContent: 'flex-start', // Alinha os itens horizontalmente
    paddingHorizontal: 20,
  },
  textStyle: {
    color: '#fff',
    marginRight: 50, 
    width: 140,
    textAlign: 'justify' // Adiciona espaço entre a imagem e o texto
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Deixa a imagem redonda
  },
  containerForms:{
    display: 'flex',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerFormItens:{
    color: '#fff',
    backgroundColor: '#2A276B',
    paddingLeft: 120,
    paddingRight: 120,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 12,
      },
      containerCity:{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
      },
      containerCityCard:{
        backgroundColor: '#2A276B',
        minWidth: 150,
        height: 43,
        borderRadius: 14,
        margin: 20
      },
      containerCityCardText:{
        textAlign: 'center',
        color: '#fff'
      }

});