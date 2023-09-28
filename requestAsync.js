// requestAsync.js
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";
import { XMLHttpRequest } from "xmlhttprequest";

function requestCallback(url, callback) {
    // write code to request url asynchronously
    const start = Date.now();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
        if (xhr.status !== 200) {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
        let response = JSON.parse(xhr.responseText);
        callback(response.data * 1000 - start);
    }
    xhr.send();
}

function requestPromise(url) {
    // write code to request url asynchronously with Promise
    const start = Date.now();
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                resolve(response.data * 1000 - start);
            } else {
                reject(xhr.statusText);
            }
        }
        xhr.onerror = () => reject("A network error occurred");
        xhr.send();
    });
}

async function requestAsyncAwait(url) {
    // write code to request url asynchronously
    // you should call requestPromise here and get the result using async/await.
    let response;
    try {
        response = await requestPromise(url);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log).catch(console.error);
requestAsyncAwait(url);