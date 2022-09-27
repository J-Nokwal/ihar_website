// const searchWrapper = document.querySelector(".searchContainer");
// const inputBox = searchWrapper.querySelector("input");
// const suggBox = searchWrapper.querySelector(".searchSuggestions");
// const icon = searchWrapper.querySelector(".SearchIcon");
// let linkTag = searchWrapper.querySelector("a");
// let webLink;
// // if user press any key and release
// inputBox.onkeyup = (e)=>{
//     console.log(e);
    // let suggestions=[   
    //     "sfsd",
    //     "asfdasfsd",
    //     "bdsfsd",
    //     "fdsddbdfsd",
    //     "dfgsfsd",
    //     "sdsfgsfsd",
    //     "qeaefsfsd",
    //     "behsfsd"
    // ];
//     let userData = e.target.value; //user enetered data
//     let emptyArray = [];
//     if(userData){
//         icon.onclick = ()=>{
//             webLink = `https://www.google.com/search?q=${userData}`;
//             linkTag.setAttribute("href", webLink);
//             linkTag.click();
//         }
//         emptyArray = suggestions.filter((data)=>{
//             //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
//             return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
//         });
//         emptyArray = emptyArray.map((data)=>{
//             // passing return data inside li tag
//             return data = `<li>${data}</li>`;
//         });
//         // searchWrapper.classList.add("active"); //show autocomplete box
//         showSuggestions(emptyArray);
//         let allList = suggBox.querySelectorAll("li");
//         for (let i = 0; i < allList.length; i++) {
//             //adding onclick attribute in all li tag
//             allList[i].setAttribute("onclick", "select(this)");
//         }
//     }else{
//         searchWrapper.classList.remove("active"); //hide autocomplete box
//     }
// }
// function select(element){
//     let selectData = element.textContent;
//     inputBox.value = selectData;
//     icon.onclick = ()=>{
//         webLink = `https://www.google.com/search?q=${selectData}`;
//         linkTag.setAttribute("href", webLink);
//         linkTag.click();
//     }
//     searchWrapper.classList.remove("active");
// }
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

import { useState, useEffect } from 'react'

export const SearchScript = (url, name) => {

  const [suggestion, setSuggestions] = useState([   
    "sfsd",
    "asfdasfsd",
    "bdsfsd",
    "fdsddbdfsd",
    "dfgsfsd",
    "sdsfgsfsd",
    "qeaefsfsd",
    "behsfsd",
    ]);


  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true
    script.onload = () => setLib({ [name]: window[name] })

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])

  return ()=>{
    let listData;
    if(!suggestion.length){
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    return listData;
  }

}