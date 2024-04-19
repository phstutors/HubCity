
import { StyleSheet, Text, View, Image} from 'react-native';


export default function TopBar() {
  return (

    <View style={styles.container}>

    <View style={styles.containerItens}>

        <Text style={styles.textStyle}>Olá Caro Usuario, Seja Bem Vindo ao HubCity!</Text>
          <Image
        source={require('../components/avatar.png')}
        style={{ width: 100, height: 100 }}/>
    </View>

    </View>
  );
}
const styles = StyleSheet.create({

  containerItens:{
    display: 'flex',
    padding: 30,
    flexDirection: 'row', // Altera a direção para "row" para os itens ficarem lado a lado
    alignItems: 'center', // Alinha os itens verticalmente
    justifyContent: 'center', // Alinha os itens horizontalmente
    paddingHorizontal: 20,
    marginTop: 2
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


});