import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

const OptionalCard = ({children, title, onPress, src}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapperStyle}>
      <View style={styles.cardStyles}>
          <Text style={styles.cardTextStyles}>{title}</Text>
          <Text style={styles.infoTextStyles}>{children}</Text>
      </View>
      <View style={styles.imageContainerStyles}>
        <Image source={src} style={styles.imageStyles}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardWrapperStyle:{
    flexDirection:'row',
    flex:1
  },
  cardStyles:{
    flex:1,
    borderRadius:10,
    borderTopRightRadius:0,
    borderBottomEndRadius:0,
    backgroundColor:'#64b5f6',
    opacity:0.9,
    height:120,
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset:{width:0, height:5},
    elevation: 0,
    marginBottom:12,
    marginTop:12,
    marginLeft:12
  },
  cardTextStyles:{
    color:"#fff",
    fontSize:20,
    fontWeight:"300",
    marginTop:10,
    marginLeft:15
  },
  infoTextStyles:{
    color:'#fff',
    fontSize:15,
    marginLeft:15,
    marginTop:5
  },
  imageContainerStyles:{
    backgroundColor:"rgba(143, 205, 255, 0.7 )",
    height:120,
    width:100,
    padding:10,
    marginTop:12,
    marginRight:12,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
  },
  imageStyles:{
    flex:1,
    width:null,
    height:null,
    resizeMode:'contain'
  }
})

export default OptionalCard;