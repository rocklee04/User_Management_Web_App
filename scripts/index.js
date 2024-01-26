document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const userContainer = document.getElementById('userContainer');
    const addUserBtn = document.getElementById('addUserBtn');
    const searchInput = document.getElementById('searchInput');
    const sortOptions = document.getElementById('sortOptions');
  
    addUserBtn.addEventListener('click', redirectToAddUserPage);
    searchInput.addEventListener('input', searchUsers);
    sortOptions.addEventListener('click', sortUsers);
    
    let currentPage = 1;
    const itemsPerPage = 5;
    
    // to fetch all users data
    function fetchUsers(queryParamString = null) {
  
      fetch(`${apiUrl}${queryParamString ? queryParamString : ""}`)
        .then((res) => {
          // Assuming totalCount is the total number of users
          const totalCount = +res.headers.get('X-Total-Count');
          const totalPages = Math.ceil(totalCount / itemsPerPage);
          renderPagination(totalPages);
          return res.json();
        })
        .then((data) => {
          displayUsers(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  
    // to render pagination
    function renderPagination(totalPages) {
        const paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = '';
    
        for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement('button');
          button.innerText = i;
          button.addEventListener('click', () => {
            currentPage = i;
            fetchUsers(`?_page=${currentPage}&_limit=${itemsPerPage}`);
          });
          paginationContainer.appendChild(button);
        }
    }
    
    // to display all users 
    function displayUsers(users) {
      userContainer.innerHTML = '';
      users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
          <button class="edit-btn" data-user-id="${user.id}">Update</button>
          <button class="delete-btn" data-user-id="${user.id}">Delete</button>
        `;
        userContainer.appendChild(userCard);
  
        const editBtn = userCard.querySelector('.edit-btn');
        const deleteBtn = userCard.querySelector('.delete-btn');
  
        editBtn.addEventListener('click', () => redirectToUpdatePage(user.id));
        deleteBtn.addEventListener('click', () => deleteUser(user.id));
      });
    }
    
  
    function redirectToUpdatePage(userId) {
        window.location.href = `./views/updateUser.html?id=${userId}`;
    }
  
    // to delete the user
    function deleteUser(userId) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this user!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${apiUrl}/${userId}`, { method: 'DELETE' })
              .then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Delete Successful',
                  text: `${userId} has been successfully deleted.`,
                }).then(() => {
                  window.location.href = "../index.html";
                });
                fetchUsers();
              })
              .catch(error => console.error('Error deleting user:', error));
          }
        });
    }
      
  
    function redirectToAddUserPage() {
      window.location.href = '../views/addUser.html'; 
    }

    // to search any user
    function searchUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        currentSearchParams = `?q=${searchTerm}`;
        fetchUsers(currentSearchParams);
    }
      
    // to sort user by their name
    function sortUsers() {
        const selectedOption = sortOptions.value;
        currentSearchParams = `?_sort=name&_order=${selectedOption}`;
        fetchUsers(currentSearchParams);
    }

    // Initial fetch
    fetchUsers(`?_page=${currentPage}&_limit=${itemsPerPage}`);    
  });
  