import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Image, FlatList, Button, TouchableOpacity, Modal } from 'react-native';
import TopBar from '../components/TopBar';
import axios from 'axios';

const API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/distritos?orderBy=nome';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [cityImage, setCityImage] = useState(null);
  const [mayorName, setMayorName] = useState('');
  const [historyCity, setHistoryCity] = useState('');
  const [gentilico, setGentilico] = useState('')

  useEffect(() => {
    if (selectedCity) {
      fetchCityImage(selectedCity.municipio.id);
      fetchCityInfo(selectedCity.municipio.id);
      fetchCityHistory(selectedCity.municipio.id);
    }
  }, [selectedCity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}&page=${page}`);
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const filtered = cities.filter(city => city.nome.toLowerCase().includes(search.toLowerCase()));
    setFilteredCities(filtered);
  }, [cities, search]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
  };
  
  
  const handleCityPress = async  (city) => {
    await setSelectedCity(city);
    setModalVisible(true); 

    }
  const fetchCityImage = async (cityId) => {
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/biblioteca?codmun=${cityId}&aspas=3&fotografias=1`);
      const result = response.data;
      const firstObject = Object.values(result)[0];
      const image = `https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/${firstObject.LINK}`
      setCityImage(image)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCityHistory = async (cityId) => {
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/biblioteca?aspas=3&codmun=${cityId}`);
      const fullHistory = response.data[cityId].HISTORICO; 
      const gentilico =  response.data[cityId].GENTILICO;
      const startIndex = fullHistory.indexOf("Histórico") + "Histórico".length + 1; 
      const endIndex = fullHistory.indexOf("Formação Administrativa"); 
      const history = fullHistory.substring(startIndex, endIndex); 
      setHistoryCity(history);
      setGentilico(gentilico)
    } catch (error) {
      console.error(error);
    }
  };
  


  const fetchCityInfo = async (cityId) => {
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/29170%7C97907%7C97911/resultados/${cityId}`);
      const data = response.data;
      let mayorName = '';
  
      data.forEach((item) => {
        item.res.forEach((resItem) => {
          if (resItem.res['2021']) {
            mayorName = resItem.res['2021'];
          }
        });
      });
      setMayorName(mayorName);
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderCity = ({ item }) => (
 
    <TouchableOpacity onPress={() => handleCityPress(item)} style={styles.containerCityCard}>
      <View style={styles.cards}>
      <Text style={styles.containerCityCardText}>Nome: {item.municipio.nome} UF: {item.municipio.microrregiao.mesorregiao.UF.sigla}</Text>
      <Text style={styles.containerCityCardText}>Região: {item.municipio.microrregiao.mesorregiao.UF.regiao.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

        <TopBar/>

      <TextInput
        placeholder="Digite a cidade..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
        placeholderTextColor="#fff"
        
      />

      <FlatList 
        data={filteredCities.slice((page - 1) * 10, page * 10)}
        renderItem={renderCity}
        keyExtractor={(item, index) => index.toString()}
       
      />
      <View style={styles.pagination}>
        <Button title="Anterior" disabled={page === 1} onPress={handlePrevPage} />
        <Text style={styles.pageNumber}>{page}</Text>
        <Button title="Próximo" onPress={handleNextPage} />
      </View>

      <Modal
    visible={modalVisible}
    animationType="slide"
    onRequestClose={() => setModalVisible(false)}
    style={styles.modal}
  >
    <View style={styles.modalContainer}>
      {selectedCity && ( 
        <View>

          <View style={styles.modalTop}>
      
              <Text style={styles.topText}>DETALHES</Text>
          </View>
          

          <View style={styles.modalMiddle}>
                {cityImage !== null ? (
                  <Image source={{ uri: cityImage }} style={{ width: 300, height: 300 }} />
                ) : (
                  <Text style={{ color: '#fff' }}>Imagem não disponível</Text>
                )}
              <Text style={styles.cityInfo}>Prefeito: {mayorName}</Text>
              <Text style={styles.cityInfo}>Cidade: {selectedCity.municipio.nome} Região: {selectedCity.municipio?.microrregiao?.mesorregiao?.UF?.regiao?.nome} Gentilico: {gentilico}</Text>
          </View>
                  
          <View style={styles.modalBottom}>
                  <Text style={styles.bottomTitle}>Histórico</Text>

                  <Text style={styles.cityInfo}>{historyCity}</Text>
          </View>  


          <Button title="Fechar" onPress={() => {
  setModalVisible(false);
  setCityImage(null);
  setHistoryCity(null);
  setMayorName(null)
}} />
   </View>
      )}
    </View>
  </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#18163D',
  },

  modalMiddle:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchInput: {
    height: 40,
    backgroundColor: '#2A276B',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    color: '#fff'

  },
  modalTop:{
    textAlign: 'center'
  },
  bottomTitle:{
    color: '#F4A460',
    fontWeight: 'bold',
    fontFamily: 'Segoe UI',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: '32px',
    marginTop: '8px'
  },
  topText:{
    color: '#F4A460',
    fontWeight: 'bold',
    fontFamily: 'Segoe UI',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: '32px',
    marginTop: '8px'
  },
  containerCityCard:{
    backgroundColor: '#2A276B',
    maxWidth: '100%',
    height: 36,
    borderRadius: 14,
    margin: '2.5%',
    display: 'flex',
    flexDirection: 'column'
  },
  cityInfo:{
    textAlign: 'justify',
    color: '#fff'
  },
  cityName:{
    textAlign: 'justify',
    color: '#fff',
    fontSize: 22
  },
  containerCityCardText:{
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },
  modalContainer:{
    flex:1,
    backgroundColor: '#2A276B',
    display: 'flex',
  },
  modal:{

  } ,
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pageNumber: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#fff'
  },
});

export default Home;