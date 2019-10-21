// https://github.com/mastermoo/rn-emoji-feedback
// codigo obtenido el 17-10-2019


import React, { Component } from 'react';
import { PixelRatio, StyleSheet, Text, View, PanResponder, Animated, TouchableOpacity } from 'react-native';

const REACTIONS = [
  { label: "Worried", src: require('../assets/Rating/worried.png'), bigSrc: require('../assets/Rating/worried_big.png'), value: 1 },
  { label: "Sad", src: require('../assets/Rating/sad.png'), bigSrc: require('../assets/Rating/sad_big.png'), value: 2 },
  { label: "Strong", src: require('../assets/Rating/ambitious.png'), bigSrc: require('../assets/Rating/ambitious_big.png'), value: 3 },
  { label: "Happy", src: require('../assets/Rating/smile.png'), bigSrc: require('../assets/Rating/smile_big.png'), value: 4 },
  { label: "Surprised", src: require('../assets/Rating/surprised.png'), bigSrc: require('../assets/Rating/surprised_big.png'), value: 5 },
];
//const WIDTH = 320;
//const DISTANCE =  WIDTH / REACTIONS.length;
//const END = WIDTH - DISTANCE;
//const size = 30;

class CustomRating extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      WIDTH: this.props.width,
      DISTANCE: 0,
      END: 0,
      SIZE: 0
    }

    this._pan = new Animated.Value(2 * this.state.DISTANCE);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: this._pan}]),
      onPanResponderRelease: () => {
        this._pan.flattenOffset();
        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) return this._pan.setValue(0);
        if (offset > this.state.END) return this._pan.setValue(END);
        const modulo = offset % this.state.DISTANCE;
        offset = (modulo >= this.state.DISTANCE/2) ? (offset+(this.state.DISTANCE-modulo)) : (offset-modulo);
        this.updatePan(offset);
      }
    })
  }

  componentDidMount(){
    console.log(this.props.width)
    dist= this.state.WIDTH / REACTIONS.length
    size= Math.floor(this.state.WIDTH/8)
    
    this.setState({
      DISTANCE: dist,
      END: this.state.WIDTH - dist,
      SIZE: size
    })

    console.log("width: "+this.state.WIDTH, "dist: "+this.state.DISTANCE, "end: "+this.state.END,"size: "+ this.state.SIZE)

;

  }

  SendData = (toValue) => {
    this.props.onChange(toValue)
    
  }



  updatePan(toValue) {
    Animated.spring(this._pan, { toValue, friction: 7 }).start();
    console.log(toValue)
    if(0 <= toValue && toValue < 64){
      console.log("Valor"+1)
      this.setState({value: 1})
      this.SendData(1)
    }
    else if (64 <= toValue && toValue<128){
      console.log("Valor"+2)
      this.setState({value: 2})
      this.SendData(2)
    }
    else if (128 <= toValue && toValue <192){
      console.log("Valor"+3)
      this.setState({value: 3})
      this.SendData(3)
    }
    else if (192 <= toValue && toValue <256){
      console.log("Valor"+4)
      this.setState({value: 4})
      this.SendData(4)
    }
    else if (256 <= toValue && toValue <320){
      console.log("Valor"+5)
      this.setState({value: 5})
      this.SendData(5)
    }
  }



  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
        <View style={{ width: this.state.WIDTH, marginBottom: 50}}>
          <View style={{height: 4 / PixelRatio.get(), backgroundColor: '#eee', width: this.state.WIDTH-(this.state.DISTANCE-this.state.SIZE), left: (this.state.DISTANCE - this.state.SIZE) / 2, top: this.state.DISTANCE /2 + (2 / PixelRatio.get())}}/>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
            {REACTIONS.map((reaction, idx) => {
              const u = idx * this.state.DISTANCE;
              let inputRange = [u-20, u, u+20];
              let scaleOutputRange = [1, 0.25, 1];
              let topOutputRange = [0, 10, 0];
              let colorOutputRange = ['#999', '#222', '#999'];
              if (u-20 < 0) {
                inputRange = [u, u+20];
                scaleOutputRange = [0.25, 1];
                topOutputRange = [10, 0];
                colorOutputRange = ['#222', '#999'];
              }

              if (u+20 > this.state.END) {
                inputRange = [u-20, u];
                scaleOutputRange = [1, 0.25];
                topOutputRange = [0, 10];
                colorOutputRange = ['#999', '#222'];
              }


              return (
                <TouchableOpacity onPress={() => this.updatePan(u)} activeOpacity={0.9} key={idx}>
                  <View style={{width: this.state.DISTANCE, height: this.state.DISTANCE, justifyContent: 'center'}}>
                    <Animated.Image
                      source={reaction.src}
                      style={[{
                        width: this.state.SIZE,
                        height: this.state.SIZE,
                        borderRadius: this.state.SIZE/2,
                        backgroundColor: '#c7ced3',

                      }, {
                        transform: [{
                          scale: this._pan.interpolate({
                            inputRange,
                            outputRange: scaleOutputRange,
                            extrapolate: 'clamp',
                          })
                        }]
                      }]}
                    />
                  </View>

                  <Animated.Text style={[{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#999',
                    fontWeight: '400',
                    fontFamily: 'Roboto',
                    marginTop: 5,
                    }, {
                    top: this._pan.interpolate({
                      inputRange,
                      outputRange: topOutputRange,
                      extrapolate: 'clamp',
                    }),
                    color: this._pan.interpolate({
                      inputRange,
                      outputRange: colorOutputRange,
                      extrapolate: 'clamp',
                    })
                  }]}>
                    {reaction.label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View {...this._panResponder.panHandlers} style={[{
              width: this.state.DISTANCE,
              height: this.state.DISTANCE,
              borderRadius: this.state.DISTANCE/2,
              backgroundColor: '#ffb18d',
              position: 'absolute',
              top: 0,
              left: 0,
              }, {
              transform: [{
                translateX: this._pan.interpolate({
                  inputRange: [0, this.state.END],
                  outputRange: [0, this.state.END],
                  extrapolate: 'clamp',
                })
              }]
            }]}>
              {REACTIONS.map((reaction, idx) => {
                let inputRange = [(idx-1)*this.state.DISTANCE, idx*this.state.DISTANCE, (idx+1)*this.state.DISTANCE];
                let outputRange = [0, 1, 0];

                if (idx == 0) {
                  inputRange = [idx*this.state.DISTANCE, (idx+1)*this.state.DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx == REACTIONS.length - 1) {
                  inputRange = [(idx-1)*this.state.DISTANCE, idx*this.state.DISTANCE];
                  outputRange = [0, 1];
                }
                return (
                  <Animated.Image
                    key={idx}
                    source={reaction.bigSrc}
                    style={[{
                      width: this.state.DISTANCE,
                      height: this.state.DISTANCE,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }, {
                      opacity: this._pan.interpolate({
                        inputRange,
                        outputRange,
                        extrapolate: 'clamp',
                      })
                    }]}
                  />
                );
                
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}export default CustomRating


