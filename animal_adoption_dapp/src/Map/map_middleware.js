import {getImage} from "./image"

var image = getImage()
console.log(image[1])
var animalInfoList = [
    {
        index:0,
        title: "marker0",
        position: { lat: 49.246292, lng: -123.116226 },
        imageBase64: image[0]
        

      },
      {
        index:1,
        title: "marker1",
        position: { lat: 49.166592, lng: -123.133568 },
        imageBase64: image[1]
      }
      // {
      //   index:2,
      //   name: "marker3",
      //   position: { lat: 49.267132, lng: -122.968941 },
      //   imageBase64: 
      // }
]

export function getAllAnimalsInfo(){
    return animalInfoList;
}

export function postAnAnimalInfo(name, url){
    var position = {lat: getRandomInRange(49.1232, 49.3363, 6), lng: getRandomInRange(-122.781113, -123.1755, 6)};
    var element = {name, position, url};
    animalInfoList.push(element);
}

export function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}