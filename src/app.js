let formData = {
  name: "",
  email: "",
  status: "Active",
  gender: "Male",
};

let myForm = document.getElementById("myForm");

let nameEl = document.getElementById("name");
let nameErrorMsg = document.getElementById("nameErrorMsg");

let email = document.getElementById("email");
let emailErrorMsg = document.getElementById("emailErrorMsg");

let statusEl = document.getElementById("status");
let genderMale = document.getElementById("genderMale");
let genderFemale = document.getElementById("genderFemale");
let requestFailed = document.getElementById("requestFailed");

let responseStatus=0;

statusEl.addEventListener("change", function (event) {
  formData.status = event.target.value;
  // console.log(formData.status);
});

genderMale.addEventListener("change", function (event) {
  formData.gender = event.target.value;
  // console.log(formData.gender);
});

genderFemale.addEventListener("change", function (event) {
  formData.gender = event.target.value;
  // console.log(formData.gender);
});

function validateName(event) {
  if (event.target.value === "") {
    nameErrorMsg.textContent = "Required*";
    nameErrorMsg.style.color = "red";
  } else {
    nameErrorMsg.textContent = "";
    formData.name = event.target.value;
    // console.log(formData);
  }
}
nameEl.addEventListener("blur", validateName);

function validateEmail(event) {
  if (event.target.value === "") {
    emailErrorMsg.textContent = "Required*";
    emailErrorMsg.style.color = "red";
  } else {
    emailErrorMsg.textContent = "";
    formData.email = event.target.value;
    // console.log(formData);
  }
}
email.addEventListener("blur", validateEmail);

function validateInformation(event) {
  if (nameEl.value === "" || email.value === "") {
    nameErrorMsg.textContent = "Required*";
    nameErrorMsg.style.color = "red";
    emailErrorMsg.textContent = "Required*";
    emailErrorMsg.style.color = "red";
  } else {
    nameErrorMsg.textContent = "";
    emailErrorMsg.textContent = "";

    let url = "https://gorest.co.in/public/v2/users/";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer 68656333df41a34449caa3b1fb985b5a7599905b6f81d261eb66a745cc4728e8",
      },
      body:JSON.stringify(formData)
    };

    fetch(url, options)
      

      .then(function(response) {
      
          //console.log(response.status);
        responseStatus = response.status; 
        return response.json();
      })

      .then(function(jsonData) {
        //let data = JSON.stringify(jsonData);
         
       

        console.log(jsonData);
        
          //console.log(data.field, " ", data.message);
          //[{"field":"email","message":"has already been taken"}]
          
        if(responseStatus===402 || responseStatus===422){
               let data = jsonData[0]; 
                console.log(data);
               requestFailed.classList.remove("d-none");
               requestFailed.textContent= data.field + "-> "+ data.message;
               requestFailed.style.color="red";
           }else if(responseStatus===200 || responseStatus===201){
              requestFailed.classList.remove("d-none"); 
               requestFailed.textContent= "User added successfully..."; 
               requestFailed.style.color="green";
           } 
           else{
               requestFailed.classList.remove("d-none"); 
               requestFailed.textContent= "Error occurred, data not saved"; 
               requestFailed.style.color="yellow";
           }
      })
      


      
  }
}

myForm.addEventListener("submit", function (event) {
  requestFailed.classList.add("d-none"); 
  event.preventDefault();
  validateInformation(event);
});

//console.log(formData);
