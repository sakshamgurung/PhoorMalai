import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {currentDataLoading} from '../actions';
import Month from '../components/Month';

class Current extends Component {
  componentDidMount(){
    this.props.currentDataLoading(-1);
  }
  monthSelected = (monthId)=>{
    this.props.currentDataLoading(monthId);
  }
  
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
        <Text style={{color:"#ffffff", textAlign:"center", fontSize:25, fontWeight:"100",marginTop:30}}> 
        Current 
        </Text>
        <View style={styles.scrollViewParent}>
          <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={15}
          style={styles.scrollViewStyles}
          >
            <Month month="All" onPress={() => this.monthSelected(-1)}/>
            <Month month="Jan" onPress={() => this.monthSelected(1)}/>
            <Month month="Feb" onPress={() => this.monthSelected(2)}/>
            <Month month="Mar" onPress={() => this.monthSelected(3)}/>
            <Month month="Apr" onPress={() => this.monthSelected(4)}/>
            <Month month="May" onPress={() => this.monthSelected(5)}/>
            <Month month="June" onPress={() => this.monthSelected(6)}/>
            <Month month="July" onPress={() => this.monthSelected(7)}/>
            <Month month="Aug" onPress={() => this.monthSelected(8)}/>
            <Month month="Sept" onPress={() => this.monthSelected(9)}/>
            <Month month="Oct" onPress={() => this.monthSelected(10)}/>
            <Month month="Nov" onPress={() => this.monthSelected(11)}/>
            <Month month="Dec" onPress={() => this.monthSelected(12)}/>
         </ScrollView>
        </View>
        <ScrollView style={{}}>
          <View><Text style={styles.selectedStyle}>{this.props.selected}</Text></View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Recycle</Text>
            <Text style={styles.cardQuantityStyles}>{this.props.recycle}</Text>
          </View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Unrecycle</Text>
            <Text style={styles.cardQuantityStyles}>{this.props.unrecycle}</Text>
          </View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Organic</Text>
            <Text style={styles.cardQuantityStyles}>{this.props.organic}</Text>
          </View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Other</Text>
            <Text style={styles.cardQuantityStyles}>{this.props.other}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewParent:{
    borderTopWidth:0.5, 
    borderBottomWidth:0.5, 
    borderTopColor:"#fff", 
    borderBottomColor:"#fff",
    padding:10,
    marginTop:10,
    marginBottom:10
  },
  selectedStyle:{
    color:"#ffffff", 
    textAlign:"center", 
    fontSize:20, 
    fontWeight:"100"
  },
  scrollViewStyles:{
    
  },
  cardStyles:{
    borderRadius:10,
    backgroundColor:'#64b5f6',
    opacity:0.9,
    height:120,
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset:{width:0, height:5},
    elevation: 5,
    marginBottom:12,
    marginTop:12,
    marginLeft:12,
    marginRight:12
  },
  cardTextStyles:{
    color:"#fff",
    fontSize:15,
    marginLeft:10,
    marginTop:5
  },
  cardQuantityStyles:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:25,
    marginLeft:10,
    marginTop: 15
  }
})

const mapStateToProp = (state) => {
  const{
    organic,
    recycle,
    unrecycle,
    other,
    selected
  } = state.graph;
  return{
    organic,
    recycle,
    unrecycle,
    other,
    selected
  }
}

export default connect(mapStateToProp,{
  currentDataLoading
})(Current);