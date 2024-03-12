import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Stack,
  Linking,
  ToastAndroid,
  NavigationContainer,
} from 'react-native';

const RegistrationScreen = ({ navigation, onRegistration }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    
    onRegistration(email, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.creatorName}>Creator: Nurai</Text>
        <Image source={require('/nurai-logo.svg')} style={styles.nuraiLogo} />
      </View>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholder="Password"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const FlowerCard = ({ flower, onAddToCart, flowersInCart, onRemoveFromCart }) => {
  const isFlowerInCart = flowersInCart.some((f) => f.name === flower.name);

  return (
    <View style={styles.flowerCard}>
      <Image source={{ uri: flower.image }} style={styles.flowerImage} />
      <View style={styles.flowerDetails}>
        <Text style={styles.flowerTitle}>{flower.name}</Text>
        <Text style={styles.flowerPrice}>${flower.price.toFixed(2)}</Text>
      </View>
      {isFlowerInCart ? (
        <TouchableOpacity
          style={styles.removeFromCartButton}
          onPress={() => onRemoveFromCart(flower)}
        >
          <Text style={styles.removeFromCartText}>Remove from Cart</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const Cart = ({ flowersInCart, onRemoveFromCart }) => {
  return (
    <View style={styles.cartContainer}>
      <Text style={styles.cartTitle}>Cart</Text>
      <View style={styles.cartItems}>
        {flowersInCart.map((flower, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.cartItemName}>{flower.name}</Text>
            <Text style={styles.cartItemPrice}>
              ${(flower.price || 0).toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.removeFromCartButton}
              onPress={() => onRemoveFromCart(flower)}
            >
              <Text style={styles.removeFromCartText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Text style={styles.cartTotal}>
        Total: ${flowersInCart.reduce((total, flower) => total + (flower.price || 0), 0).toFixed(2)}
      </Text>
    </View>
  );
};
const FlowerList = ({ flowers, onAddToCart, flowersInCart, onRemoveFromCart }) => {
  return (
    <View style={styles.flowerListContainer}>
      {flowers.map((flower) => (
        <FlowerCard
          key={flower.name}
          flower={flower}
          onAddToCart={() => onAddToCart(flower)}
          flowersInCart={flowersInCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
    </View>
  );
};
const HomeScreen = ({ navigation, userName, flowers, onAddToCart, flowersInCart, onRemoveFromCart,removeFlowerFromCart,onProceed}) => {
  const goToExternalSite = (url) => {
    Linking.openURL(url);
  };

  const handleCheck = () => {
    alert('Thank you for using Sunset Flowers!Your order has been confirmed!');
  };

  const onRemoveAllFromCart = () => {
    setFlowersInCart([]);
    setShowProceedButton(false);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Welcome, {userName}!</Text>
      </View>
      <ScrollView style={styles.imageContainer}>
      <FlowerList
        flowers={flowers}
        onAddToCart={onAddToCart}
        flowersInCart={flowersInCart}
        onRemoveFromCart={onRemoveFromCart}
      />
      </ScrollView>
      <View style={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => goToExternalSite(button.url)}>
          <Text style={styles.buttonText}>{button.text}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleCheck}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
      <Cart flowersInCart={flowersInCart} onRemoveFromCart={onRemoveFromCart} onProceed={onProceed} />
    </View>
  );
};
const buttons = [
  { text: 'Insta', url: 'https://www.instagram.com/perneshbai_nuray?igsh=cHozdXp5YnowaTQz' },
 
  { text: 'Telegram', url: 'https://t.me/shopartflowers1' },
 
];



const MealDetailsScreen = ({ route }) => {
  const { mealType } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mealType} Details</Text>
      <Text>This is the information about the selected meal ({mealType}).</Text>
    </View>
  );
};

const App = () => {
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState('Start');
  const [flowersInCart, setFlowersInCart] = useState([]);

  const handleNameChange = (text) => {
    setUserName(text);
  };
 
  const handleStart = () => {
    setCurrentPage('Registration');
  };
 
  const handleRegistration = (email, password) => {
    setCurrentPage('Home');
  };
  const onAddToCart = (flower) => {
  setFlowersInCart((prevFlowersInCart) => [...prevFlowersInCart, { ...flower, price: flower.price || 0 }]);
  
};
const addFlowerToCart = (flower) => {
  onAddToCart(flower);
};

 const removeFlowerFromCart = (flowerToRemove) => {
  setFlowersInCart((prevFlowersInCart) => prevFlowersInCart.filter((flower) => flower.name !== flowerToRemove.name));
};
 const flowers = [
  {
    name: 'lily',
    image: 'https://w.forfun.com/fetch/ff/fffc27e3aff4529172c9897d7abf673c.jpeg',
    price: 10.99,
  },
  {
    name: 'Flower 2',
    image: 'https://i.pinimg.com/736x/fe/01/4a/fe014a202ad43e787fde9604e34987e9.jpg',
    price: 15.99,
  },
  {
    name: 'Flower 3',
    image: 'https://avatars.mds.yandex.net/i?id=bae9e37c117b9291a2b3c09cc7f8c6c4-5746546-images-thumbs&n=13',
    price: 12.99,
  }
];
  const buttons = [
    { text: 'Lily', url: 'https://www.britannica.com/plant/lily' },
    { text: 'Rose', url: 'https://example.com/rose' },
    { text: 'Pionees', url: 'https://example.com/pionees' },
  ];
  

  return (
    <View style={styles.container}>
      {currentPage === 'Start' && (
        <View>
          <Text style={styles.title}>Welcome to the Sunset Flowers!</Text>
          <Image source={require('/logo.jpg')} style={styles.logo} />
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={handleNameChange}
            placeholder="Your Name"
          />
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      )}
      {currentPage === 'Registration' && (
        <RegistrationScreen
          navigation={{ navigate: setCurrentPage }}
          onRegistration={handleRegistration}
        />
      )}
      {currentPage === 'Check' && (
        <View>
          <Text>Checkout Screen</Text>
          {flowersInCart.map((flower, index) => (
            <View key={index}>
              <Text>{flower.name} - ${flower.price.toFixed(2)}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={onProceed}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      )}
       {currentPage === 'Home' && (
        <HomeScreen
          navigation={{ navigate: setCurrentPage }}
          userName={userName}
          
          flowers={flowers}
          onAddToCart={addFlowerToCart}
          flowersInCart={flowersInCart}
          onRemoveFromCart={removeFlowerFromCart}
        
        />
      )}
      {currentPage === 'MealDetails' && (
        <MealDetailsScreen route={{ params: {} }} />
      )}
    
    </View>
    
  );
  
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
    marginTop:80,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  nuraiLogo: {
    width: 40,
    height: 40,
  },
   logo: {
    width: 350,
    height: 300,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
 flowerCard: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flowerListContainer: {
    marginTop: 20,
  },
  flowerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  flowerDetails: {
    flex: 1,
  },
  flowerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 5,
  },
  flowerPrice: {
    fontSize: 14,
    color: 'gray',
  },
  addToCartButton: {
    backgroundColor: 'purple',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartContainer: {
    marginTop: 20,
  },
  cartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 10,
  },
  cartItems: {
    width: '100%',
  },
  cartItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemPrice: {
    fontSize: 14,
    color: 'gray',
  },
  removeFromCartButton: {
    backgroundColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  removeFromCartText: {
    color: '#FFF',
    fontSize: 14,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    marginTop: 10,
  },
 proceedButton: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default App;
