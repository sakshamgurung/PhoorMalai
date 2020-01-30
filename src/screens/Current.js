import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {currentDataLoading, currentDataReloading} from '../actions';
import Month from '../components/Month';
import BackToMapButton from '../components/BackToMapButton';

class Current extends Component {
  static navigationOptions =({navigation}) => {
    return{
      headerTitle:'Current',
      headerStyle:{backgroundColor:'#4076bd'},
      headerTintColor:'#fff',
      headerTitleStyle:{
        fontSize:25
      },
      headerLeft:() => (
        <BackToMapButton navigationProps={navigation} />
      )
    }
  };
  componentDidMount(){
    this.props.currentDataLoading(0);
    this.createDataSource(this.props);
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.props.currentDataLoading(0);
        this.createDataSource(this.props);
      }
    );
  }
  componentWillReceiveProps(nextProps){
    this.createDataSource(nextProps);
  }
  componentWillUnmount(){
    this.willFocusSubscription.remove();
  }
  monthSelected = (monthId)=>{
    this.props.currentDataLoading(monthId);
  }
  createDataSource({recycle, unrecycle, organic, other, selected}){
    this.organic = organic;
    this.recycle = recycle;
    this.unrecycle = unrecycle;
    this.other = other;
    this.selected = selected;
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:"#2196f3"}}>
        <View style={styles.scrollViewParent}>
          <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={15}
          style={styles.scrollViewStyles}
          >
            <Month month="All" onPress={() => this.monthSelected(0)}/>
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
          <View><Text style={styles.selectedStyle}>{this.selected}</Text></View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Recycle</Text>
            <Text style={styles.cardQuantityStyles}>{this.recycle}</Text>
          </View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Unrecycle</Text>
            <Text style={styles.cardQuantityStyles}>{this.unrecycle}</Text>
          </View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Organic</Text>
            <Text style={styles.cardQuantityStyles}>{this.organic}</Text>
          </View>
          <View style={styles.cardStyles}>
            <Text style={styles.cardTextStyles}>Other</Text>
            <Text style={styles.cardQuantityStyles}>{this.other}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewParent:{
    borderRadius:10,
    backgroundColor:'#64b5f6',
    opacity:0.9,
    padding:5,
    marginLeft:5,
    marginRight:5,
    marginTop:15,
    marginBottom:10,
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset:{width:0, height:5},
    elevation: 5,
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
    marginLeft:5,
    marginRight:5
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
  } = state.current;
  return{
    organic,
    recycle,
    unrecycle,
    other,
    selected
  }
}

export default connect(mapStateToProp,{
  currentDataLoading, currentDataReloading
})(Current);