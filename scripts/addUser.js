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
  
    function validateFormData(formData) {
        const nameRegex = /^[a-zA-Z\s]{5,}$/; // At least 5 characters
        const emailRegex = /^[^\s@]+@gmail\.com$/; // Gmail address
        const pincodeRegex = /^\d{6}$/; // 6 digits
    
        if (!nameRegex.test(formData.name)) {
          alert('Invalid name. Please enter a name with at least 5 characters.');
          return false;
        }
    
        if (!emailRegex.test(formData.email)) {
          alert('Invalid email address. Please enter a Gmail address.');
          return false;
        }
    
        if (!pincodeRegex.test(formData.address.zipcode)) {
          alert('Invalid pin code. Please enter a 6-digit pin code.');
          return false;
        }
    
        return true;
    }
  
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
          alert(`User added successfully!\nUser ID: ${user.id}`);
          window.location.href = '../index.html';
        })
        .catch(error => {
          console.error('Error adding user:', error);
          alert('Error adding user. Please try again.');
        });
    }
  });
  