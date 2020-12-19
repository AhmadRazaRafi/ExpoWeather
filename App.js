import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions  } from 'react-native';

const Dev_Width = Dimensions.get('window').width;
const Dev_Height = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/AntDesign'

export default class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      city:"",
      data:[],
      icon:"",
      city_display:"",
      desc:"",
      main:"",
      humidity:"",
      pressure:"",
      visibility:""
    }
    this.fetch_weather()
  }

  fetch_weather=()=>{
    fetch("https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02")
    .then((responce)=>response.json())
    .then((json=>{
      this.setState({data:json})
      this.setState({ temp : (json.main.temp-273.15).toFixed(2)+" c"})
      this.setState({city_display : json.name})
      this.setState({icon: json.weather[0].icon})
      this.setState({main: json.weather[0].main})
      this.setState({humidity: json.main.humidity+" %"})
      this.setState({pressure: json.main.pressure+" hPa"})
      this.setState({visibility: (json.main.visibility/100).toFixed(2)+" Km"})
    })).catch((error)=> console.error(error))
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.image_background_style} source={require('./assets/bg1.png')} > 
        <View style={styles.Search_Box_View}>
          <TextInput
            placeholder="search"
            placeholderTextColor="#fff"
            style={styles.Search_Box}
            onChangeText={(text)=> this.setState({city:text})}/>

        <TouchableOpacity style={styles.button_touch}>
          <Icon name="search1" size={24} color="#FFF" />
        </TouchableOpacity>
        </View>
        
        <View style={styles.Weather_Box_Main}>
          <View style={styles.Weather_Holder_view}>
            <Image source={{uri:"http://openweathermap.org/img/wm"+this.state.icon+"@2x.png"}} style={styles.weather_Image} />
            <View>
              <Text style={styles.temperature_text }>{this.state.temp}</Text>
              <Text style={styles.city_text}>{this.state.city_display} </Text>
            </View>
          </View>
        </View>

        <View style={styles.Info_Box_View}>
          <View style={styles.Info_Holder_View}>
          <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
          <Text style={styles.description_text}>{this.state.desc}</Text>
          <Text style={styles.humidity_text}>{this.state.humidity}</Text>
          <Text style={styles.other_text}>{this.state.pressure}</Text>
          <Text style={styles.other_text}>{this.state.visibility}</Text>
          </View>
        </View>

        </ImageBackground>
      </SafeAreaView>
    )
  }
} 


const styles = StyleSheet.create({
  container:{
    height: Dev_Height,
    width: Dev_Width
  },
  image_background_style:{
    height: "100%",
    width: "100%"
  },
  Search_Box_View:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  Search_Box:{
    height: "35%",
    width: "80%",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 15,
    color: "#FFF",
    paddingHorizontal: 15
  },
  button_touch:{
    marginLeft:"5%",
    height:"35%",
    width:"8%",
    justifyContent:"center",
    alignItems:"center"
  },
  Weather_Box_Main:{
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  Weather_Holder_view:{
    height: "80%",
    width: "90%", 
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row"
  },
  weather_Image:{
    height: "80%",
    width: "50%"
  },
  temperature_text:{
    fontSize:30,
    color: "#FFF",
    marginLeft:"5%"
  },
  city_text:{
    fontSize: 20,
    color: "#FFF",
    marginLeft: "5%",
    marginTop: "3%"
  }
})
