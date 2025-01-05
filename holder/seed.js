function createAuthenticationDID(){
  if (document.getElementById("floatingSeed").value!=document.getElementById("floatingConfirmSeed").value){
    alert('error');
    return;
  }
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "holderId": sessionStorage.getItem("user_id"),
    "email": sessionStorage.getItem("user_email"),
    "secret": document.getElementById("floatingSeed").value,
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://backend.stacked.itdg.io/api/holder/create-authentication-did", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(JSON.stringify(result));
      if (result.code === 200){
          window.location.assign("firstid.html");
      }else{
          alert('error');
      }
  })
    .catch(error => console.log('error', error));
  
  window.location.assign("credential.html");
  document.getElementById("signBtn").onclick = function (){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ sessionStorage.getItem("access_token"));
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "holderId": sessionStorage.getItem("user_id"),
      "email": sessionStorage.getItem("user_email"),
      "secret": document.getElementById("floatingSeed").value,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://backend.stacked.itdg.io/api/holder/create-authentication-did", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(JSON.stringify(result));
        if (result.code === 200){
            window.location.assign("credential.html");
        }else{
            alert('error');
        }
    })
      .catch(error => console.log('error', error));
  }
}
