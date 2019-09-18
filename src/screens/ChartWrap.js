//@ts-ignore
import React,{Component} from 'react';
import {View, Dimensions} from 'react-native';
import {VictoryChart, VictoryAxis} from 'victory-native';

const padding = {
  portrait: { left: 55, top: 40, right: 45, bottom: 50 },
  landscape: { left: 100, top: 40, right: 70, bottom: 50 }
};

class ChartWrap extends Component{
  state = { orientation: 'portrait', ...Dimensions.get('window')};
  updateDimensions = this.updateDimensions.bind(this);

  componentDidMount() {
    this.updateDimensions();
  }
  updateDimensions() {
    const windowSize = Dimensions.get('window');
    const orientation = windowSize.width < windowSize.height ? 'portrait' : 'landscape';
    this.setState({ orientation, ...windowSize });
  }

  render(){
    return(
      <View>
        <VictoryChart
          style={victoryChartStyles}
          width={this.state.width}
          minDomain={{y:0, x:0}}
          maxDomain={{x:12}}
          padding={padding[this.state.orientation]}
          domainPadding={{x: 60, y: 60}}
        >

          {this.props.children}
          
          {!this.props.hideAxis &&
            <VictoryAxis tickCount={12}
            label='Month'
            style = {axisStyles}/>
          }
          {!this.props.hideAxis &&
            <VictoryAxis dependentAxis style={axisStyles}/>
          }
        </VictoryChart>
      </View>
    );
  }
}

const victoryChartStyles = {
  parent: {
    borderRadius:15,
    backgroundColor:'#3d3d3d',
    opacity:0.9,
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset:{width:0, height:5},
    elevation: 5,
    marginBottom:12,
    marginTop:12,
  }
}
const axisStyles = {
  tickLabels:{fill:'#ff0a71'},
  axis:{stroke:'#ff0a71'}
}


export default ChartWrap;