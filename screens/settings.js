import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native'
import { CONFIG } from '../constants'

export  class Settings extends Component {
  constructor() {
    super();
    this.state = {
      regions: []
    }
  }


   _setData(itemValue){
        this.setState({region :itemValue})

  }

  render() {
      return <View>
          <Picker selectedValue={this.state.region} onValueChange={itemValue => this._setData(itemValue)}>
            {this.state.regions.map(
              (region, index) => (
                <Picker.Item
                  key={index}
                  label={region.snippet.name}
                  value={region.snippet.name}
                />
              )
            )}
          </Picker>
        </View>;
   }
   componentDidMount(){
     const { BASE_URL , API_KEY } = CONFIG.YOUTUBE
     const qp = "&part=snippet&hl=es_MX";
     //   https://www.googleapis.com/youtube/v3/i18nRegions?key=AIzaSyDvBPETOLswxTHIHPChChWtQgmeDYCcwpc&part=snippet&hl=es_MX
     fetch(
       `${BASE_URL}/i18nRegions?key=${API_KEY}${qp}`
     )
     .then(res => res.json())
     .then(res => {
       console.log(res)
       const regions = []
       res.items.forEach(v => {
       regions.push(v)
     })
      this.setState({ regions })
     })
     .catch(error => {
       console.error(error);
     })
   }
}
// export default Settings

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})
