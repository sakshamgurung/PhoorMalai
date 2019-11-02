import React,{Component} from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';
import {VictoryLine,VictoryScatter} from 'victory-native';
import ChartWrap from './ChartWrap';
import {connect} from 'react-redux';
import {historyDataLoading} from '../actions';
import ColorIndex from '../components/ColorIndex';

class History extends Component {

  componentDidMount(){
    this.props.historyDataLoading();
  }

  renderLine(dataArr, color){
    //if(dataArr.length >= 2){
    if(dataArr.length != 0){
      return(
        <VictoryLine
          data= {dataArr}
          x='x'
          y='y'
          // bubbleProperty='value'
          // maxBubbleSize={7}
          // minBubbleSize={4}
          // interpolation= 'natural'
          labels={null}
          style={{data: { 
            stroke:color,
            strokeWidth: 3
          }}}
          // style={{data: { 
          //   fill: 'white'
          // }}}
        />
      );
    }else return <View><Text>Hello</Text></View>;
  }
  render() {
    let organic = null;
    let recycle = null;
    let unrecycle = null;
    let other = null;
    let lineGraph = null;
    let noGraph = null;
    let body = null;
    if (this.props.organic.length >= 2){
      organic = this.renderLine(this.props.organic,'#ff0544');
    }
    if (this.props.recycle.length >= 2){
      recycle = this.renderLine(this.props.recycle,'#05ffa3');
    }
    if (this.props.unrecycle.length >= 2){
      unrecycle = this.renderLine(this.props.unrecycle,'#ff0a71');
    }
    if (this.props.other.length >= 2){
      other = this.renderLine(this.props.other,'#ff7e47');
    }
    if(this.props.renderGraph){
      lineGraph = (
      <View style={styles.viewStyle}>
        <Text style={styles.headingStyle}>Quantity vs Time (month)</Text>
        <View style={styles.indexContainer}>
          <ColorIndex indexName='Organic' color='#ff0544'/>
          <ColorIndex indexName='Other' color='#ff7e47'/>
        </View>
        <ChartWrap>
          {organic}
          {other}
        </ChartWrap>
        <View  style={styles.indexContainer}>
          <ColorIndex indexName='Recycle' color='#05ffa3'/>
          <ColorIndex indexName='Unrecycle' color='#ff7e47'/>
        </View>
        <ChartWrap>
          {recycle}
          {unrecycle}
        </ChartWrap>
      </View>
      )         
    }else{
      noGraph = (
        <Text style={styles.noDataHeadingStyle}>No History Data Available</Text>
      )
    }
    if(this.props.spinner){
      body =(
        <View  style={styles.activityIndicatorContainerStyles}>
          <ActivityIndicator size="large" color="#05ffa3" style={styles.activityIndicatorStyles}/>
          <Text style={styles.activityIndicatorTextStyles}>History Activity Loading</Text>
        </View>
      )
    }else{
      body = this.props.renderGraph ? lineGraph : noGraph
    }
    return (
      <ScrollView style={styles.scrollViewStyle}>
        {body}
      </ScrollView>
      
    );
  }
}
//
const styles = StyleSheet.create({
  scrollViewStyle:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#2c2c2e',
    paddingBottom:12
  },
  activityIndicatorContainerStyles:{
    paddingTop:250
  },
  activityIndicatorTextStyles:{
    alignSelf:'center',
    paddingTop: 25,
    color:'#05ffa3',
    fontWeight:'100',
    fontSize:20
  },
  viewStyle:{
    flexDirection:'column',
    backgroundColor:'#2c2c2e',
    paddingLeft:12,
    paddingRight:12
  },
  headingStyle:{
    fontSize:20,
    fontWeight:'100',
    color:'#ffffff',
    alignSelf:'center',
    paddingLeft:20,
    paddingTop:20,
    paddingBottom:20
  },
  noDataHeadingStyle:{
    fontSize:20,
    fontWeight:'100',
    color:'#ffffff',
    alignSelf:'center',
    paddingLeft:10,
    paddingTop:20,
    paddingBottom:20
  },
  indexContainer:{
    flexDirection:'row',
    paddingLeft:50
  }
});

const mapStateToProp = (state) => {
  const{
    organic,
    recycle,
    unrecycle,
    other
  } = state.historyGraph;
  return{
    organic,
    recycle,
    unrecycle,
    other
  }
}

export default connect(mapStateToProp,{
  historyDataLoading
})(History);