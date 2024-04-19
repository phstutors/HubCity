import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, Button, TouchableOpacity, Modal } from 'react-native';
import TopBar from '../components/TopBar';
import axios from 'axios';

const API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/distritos?orderBy=nome';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null); // Estado para controlar a cidade selecionada
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}&page=${page}`);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
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

  const handleCityPress = (city) => {
    setSelectedCity(city); // Define a cidade selecionada
    setModalVisible(true); // Exibe o modal quando uma cidade é selecionada
  };

  const renderCity = ({ item }) => (
    // Adicionando um TouchableOpacity para lidar com o clique em uma cidade
    <TouchableOpacity onPress={() => handleCityPress(item)} style={styles.containerCityCard}>
      <View>
      <Text style={styles.containerCityCardText}>Nome: {item.nome}</Text>
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
        numColumns={2}
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
      {selectedCity && ( // Verifica se selectedCity não é nulo
        <View>
          <Text style={styles.cityName}>{selectedCity.nome}</Text>
          <Text style={styles.cityInfo}>ID: {selectedCity.id}</Text>
          <Text style={styles.cityInfo}>Nome: {selectedCity.nome}</Text>
          <Text style={styles.cityInfo}>Município: {selectedCity.municipio?.nome}</Text>
          <Text style={styles.cityInfo}>Microrregião: {selectedCity.municipio?.microrregiao?.nome}</Text>
          <Text style={styles.cityInfo}>Mesorregião: {selectedCity.municipio?.microrregiao?.mesorregiao?.nome}</Text>
          <Text style={styles.cityInfo}>UF: {selectedCity.municipio?.microrregiao?.mesorregiao?.UF?.nome}</Text>
          <Text style={styles.cityInfo}>Região: {selectedCity.municipio?.microrregiao?.mesorregiao?.UF?.regiao?.nome}</Text>
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
    padding: 20,
    backgroundColor: '#18163D',
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
  containerCityCard:{
    backgroundColor: '#2A276B',
    minWidth: '45%',
    height: 43,
    borderRadius: 14,
    margin: '2.5%',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#2A276B'
  },
  modal:{
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
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
