document.addEventListener('DOMContentLoaded', function () {
    const updateUserForm = document.getElementById('updateUserForm');
  
    updateUserForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const userId = getUserIdFromQueryString();
      const formData = {
        id: userId,
        name: document.getElementById('name').value.trim(),
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        address: {
          street: document.getElementById('street').value.trim(),
          suite: document.getElementById('suite').value.trim(),
          city: document.getElementById('city').value.trim(),
          zipcode: document.getElementById('zipcode').value.trim(),
        },
      };
  
      if (validateFormData(formData)) {
        updateUser(formData);
      }
    });
  
    function getUserIdFromQueryString() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('id');
    }
  
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
  
    function updateUser(userData) {
      const apiUrl = `https://jsonplaceholder.typicode.com/users/${userData.id}`;
  
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(updatedUser => {
          alert(`User updated successfully!\nUser ID: ${updatedUser.id}`);
          window.location.href = 'index.html';
        })
        .catch(error => {
          console.error('Error updating user:', error);
          alert('Error updating user. Please try again.');
        });
    }
  });
  