import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
 //Login local apenas como demonstração ;)
    if (username === 'admin' && password === 'admin') {
      navigation.navigate('Home');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>

<Image
                        source={require("../assets/HubCity.png")}
                        style={{
                            height: 300,
                            width: 300,
                            borderRadius: 20,
                            position: "relative",
                            top:45,
                            
                        }}
                    />
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.dados}>Insira seus dados para entrar.</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#fff"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
      />
        <Button
                        title="Entrar"
                        onPress={handleLogin}
                        style={{
                            marginTop: 22,
                            width: "80%"
                        }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#18163D'
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff'
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  dados:{
    color: '#fff',
    marginBottom: 25,
    fontSize: 16,
  }
});

export default Login;
