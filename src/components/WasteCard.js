import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const WasteCard = ({children, onPress, src}) => {
  return (
    <View onPress={onPress} style={styles.cardWrapperStyle}>
      <View style={styles.imageContainerStyles}>
        <Image source={src} style={styles.imageStyles}/>
      </View>
      <View style={styles.cardStyles}>
        <Text style={styles.infoTextStyles}>{children}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapperStyle:{
  },
  cardStyles:{
    borderRadius:10,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    backgroundColor:'#64b5f6',
    opacity:0.9,
    width:100,
    height:40,
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset:{width:0, height:5},
    elevation: 0,
    marginBottom:12,
    marginLeft:12
  },
  infoTextStyles:{
    color:'#fff',
    fontSize:15,
    textAlign:"center"
  },
  imageContainerStyles:{
    backgroundColor:"rgba(143, 205, 255, 0.7 )",
    height:120,
    width:100,
    marginTop:12,
    marginRight:12,
    marginLeft:12,
    borderRadius:10,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
  },
  imageStyles:{
    flex:1,
    width:null,
    height:null,
    resizeMode:'contain'
  }
})

export default WasteCard;