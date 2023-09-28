// requestSync.js
import { XMLHttpRequest } from "xmlhttprequest";
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestSync(url) {
    // write code to request url synchronously
    const start = Date.now();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status !== 200) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    }
    let response = JSON.parse(xhr.responseText);
    console.log(response.data * 1000 - start);
}

requestSync(url); // would print out the execution time
requestSync(url);
requestSync(url);