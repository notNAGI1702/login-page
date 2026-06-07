const token = localStorage.getItem('sessionToken');

if (!token) {
    window.location.href = '/login';
}

const lougoutBtn = document.getElementById('logout-btn');

lougoutBtn.addEventListener('click', () => {
    localStorage.removeItem('sessionToken');
    window.location.href = '/login';
});