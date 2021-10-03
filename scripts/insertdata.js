import { db } from './firebase_config.js'
// import { display } from './display.js'
import {registervalid} from './validations.js'

document.getElementById('submit').onclick = insert;

function insert() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobileno").value;
  var address = document.getElementById("address").value;
  var pass = document.getElementById("pass").value;
  var confirmpass = document.getElementById("confirmpass").value;

  if (document.getElementById("flexRadioDefault1").checked == true) {
    var type = "Seller";
  } else if (document.getElementById("flexRadioDefault2").checked == true) {
    var type = "Buyer";
  } else if (document.getElementById("flexRadioDefault3").checked == true) {
    var type = "Advertiser";
  } else if (document.getElementById("flexRadioDefault4").checked == true) {
    var type = "Distributer";
  }
  console.log("Name ", name);
  console.log("Email ", email);
  console.log("Mobile ", mobile);
  console.log("Address ", address);
  console.log("Type ", type);
  console.log("Password", pass);
  console.log("Confirm Password", confirmpass);

  const user_data = {
    Name: name,
    Email: email,
    MobileNo: mobile,
    Address: address,
    Type: type,
  };

  const auth = {
    Name: name,
    Email: email,
    Password: pass,
  };

  // display(name, email, mobile, address, type);

  var x = registervalid(name, email, mobile, address, pass, confirmpass);
  console.log(x);
  if (x == true) {
    console.log("Inside if");
    const insert =  db
      .collection("users")
      .doc(email)
      .set(user_data)
      .then(function () {
        console.log("Added to the database");
      });
     db.collection("auth")
       .doc(email)
       .set(auth)
       .then(function () {
         console.log("Added to the database");
       });
    insert.then(
      () => {
        
        Swal.fire(
          'Congratulations!',
          'You have been succesfully registered..!',
          'success'
        ).then(
          () => {
            location.reload();
          }
        )
        
        
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    );
  }
}


