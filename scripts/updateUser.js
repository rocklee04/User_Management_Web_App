document.addEventListener('DOMContentLoaded', function () {
    const updateUserForm = document.getElementById('updateUserForm');
  
    updateUserForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const userId = getUserIdFromQueryString();
      const formData = {
        id: userId,
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        address: {
          street: document.getElementById('street').value,
          suite: document.getElementById('suite').value,
          city: document.getElementById('city').value,
          zipcode: document.getElementById('zipcode').value,
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
  
    // to update the details of the existing user
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
            Swal.fire({
              icon: 'success',
              title: 'User Updated Successfully!',
              text: `User ID: ${updatedUser.id}`,
            }).then(() => {
              window.location.href = '../index.html';
            });
          })
          .catch(error => {
            console.error('Error updating user:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error Updating User',
              text: 'Please try again.',
            });
          });
    }
      
  });
  