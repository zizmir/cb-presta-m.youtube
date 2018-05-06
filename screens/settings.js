import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet , AsyncStorage } from 'react-native'
import { CONFIG } from '../constants'

export  class Settings extends Component {
  constructor() {
    super();
    this.state = {
      countries : [],
      regions: []
    }
  }


   _setData(itemValue){
        this.setState({region :itemValue})

  }

  render() {
      return <View>
          <Text>Selected language</Text>
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
     const regions = []
     const qp = "&part=snippet&hl=es_MX";
     //   https://www.googleapis.com/youtube/v3/i18nRegions?key=AIzaSyDvBPETOLswxTHIHPChChWtQgmeDYCcwpc&part=snippet&hl=es_MX
     fetch(
       `${BASE_URL}/i18nRegions?key=${API_KEY}${qp}`
     )
     .then(res => res.json())
     .then(res => {
       console.log(res)

       res.items.forEach(v => {
       regions.push(v)
     })
      this.setState({ regions })
     })
     const str = JSON.stringify(regions);


       try {
         AsyncStorage.setItem(CONFIG.STORAGE.AVAILABLE_REGIONS, str)

           console.log('result', countries)
         

       } catch (error) {
         console.log( error);
       }

   }
   componentWillMount(){
     try {
       const result = AsyncStorage.getItem(CONFIG.STORAGE.AVAILABLE_REGIONS).then(
        result => {
          if (result) {

            countries = JSON.parse(result);
            this.setState({ countries });

          }
        }
       );

      }catch(e){
        console.log(e)
      }
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
