function camelCase(str) {
  return str
      .replace(/\s(.)/g, function(a) {
          return a.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function(b) {
          return b.toLowerCase();
      });
}
function getallcredential(){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://backend.stacked.itdg.io/api/holder/get-all-credential/"+sessionStorage.getItem("user_id"), requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(JSON.stringify(result));
      sessionStorage.setItem("all_credential",JSON.stringify(result));
      window.location.assign("credential.html");
    })
    .catch(error => console.log('error', error));
}

function create_credential(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+sessionStorage.getItem("access_token"));
    myHeaders.append("Content-Type", "application/json");
    let selected_schema = ["First Name","Last Name","Institution","Expiration Date","Student Id"];
    var credentialdata={};
    for (x of selected_schema){
      if (x==="Institution") credentialdata[camelCase(x)] = "THEi"; //check if must be THEi
      else credentialdata[camelCase(x)] = document.getElementById(x + 2).value;
    }
    console.log(JSON.stringify(credentialdata));
    var raw = JSON.stringify({
      "holderId": sessionStorage.getItem("user_id"),
      "email": sessionStorage.getItem("user_email"),
      "secret": document.getElementById("Seed2").value,
      "credentialType": "StudentIDCredential",
      "issuerName": "THEi",
      "credentialData": JSON.stringify(credentialdata),
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/holder/create-credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status===true){
          create_credential();
        }
      })
      .catch(error => console.log('error', error));
}
