export const BASE_URL = 'http://localhost:3001/';
const url = (base: string, path: string) => `${base}${path}`;

type ListType = {id: number, title: string}
type ListsType = ListType[]  

//export const getListss = () => {
//  import axios from 'axios'
//  const getListsUrl = url(BASE_URL, "/lists")
//  axios.get(getListsUrl)
//    .then(function (response) {
//      // handle success
//      const results:ListsType = []
//      response.data.forEach((data: ListType) => {
//        results.push(data)
//      })
//      return results
//      //setLists(tmpLists)
//    })
//    .catch(function (error) {
//      // handle error
//      console.log(error);
//    })
//    .then(function () {
//      // always executed
//    });
//};