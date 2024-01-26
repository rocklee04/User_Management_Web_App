document.addEventListener('DOMContentLoaded', function () {
    const userRegistrationForm = document.getElementById('userRegistrationForm');
  
    userRegistrationForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        address: {
          street: document.getElementById('street').value.trim,
          suite: document.getElementById('suite').value,
          city: document.getElementById('city').value,
          zipcode: document.getElementById('zipcode').value,
        },
      };
  
      if (validateFormData(formData)) {
        addUser(formData);
      }
    });
  
    // user validation 
    function validateFormData(formData) {
        const nameRegex = /^[a-zA-Z\s]{5,}$/; // At least 5 characters
        const emailRegex = /^[^\s@]+@gmail\.com$/; // Gmail address
        const pincodeRegex = /^\d{6}$/; // 6 digits
      
        if (!nameRegex.test(formData.name)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Name',
            text: 'Please enter a name with at least 5 characters.',
          });
          return false;
        }
      
        if (!emailRegex.test(formData.email)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid Gmail address.',
          });
          return false;
        }
      
        if (!pincodeRegex.test(formData.address.zipcode)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Pin Code',
            text: 'Please enter a 6-digit pin code.',
          });
          return false;
        }
      
        return true;
    }
      
    // to add new user
    function addUser(userData) {
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';
      
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(response => response.json())
          .then(user => {
            Swal.fire({
              icon: 'success',
              title: 'User Added Successfully!',
              text: `User ID: ${user.id}`,
            }).then(() => {
              window.location.href = '../index.html';
            });
          })
          .catch(error => {
            console.error('Error adding user:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error Adding User',
              text: 'Please try again.',
            });
          });
    }
      
  });
  