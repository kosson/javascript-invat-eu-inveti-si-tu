function getJSON(url){
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();               // inițializarea obiectului XMLHttpRequest
    request.open("GET", url);                           // [request.open]   --> inițierea unui GET pe url primit ca argument
    request.onload = function(){                        // [request.onload] --> try-catch
      try{
        if(this.status === 200){                        // [this.status] dacă this.status este 200
          resolve(JSON.parse(this.response));           // [this.response] invocă resolve cu JSON.parse(this.response), daca raspunsul este parsabil
        }else{
          reject(this.status + " " + this.statusText);  // [this.status]; [this.statusText]
        }
      }catch(e){
        reject(e.message);
      }
    };
    request.onerror = function(){                       // [request.onerror]
      reject(this.status + " " + this.statusText);      // [this.status]; [this.statusText]
    };
    request.send();
  });
};
getJSON('http://validate.jsontest.com/?json={"key":"value"}').then((inregistrari) => {console.log(inregistrari);}).catch((err) => {console.log(err);});
``
