let pageNumber = 1;
const perPage = 2; 
let loading = false;

async function fetchData(page) {
  const response = await fetch(`../data.json?page=${page}&perPage=${perPage}`);
  const data = await response.json();
  return data;
}

function renderPosts(posts) {
  const container = document.getElementById('container');
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
    <div class="div1">
      <img class="image1" src="${post.logo}" alt="Random Robot Picture">
      <div class="div2">
        <h2 class="ph1">${post.username}</h2>
        <p class="ph1">${post.description}</p>
        <p class="hashtags">#${post.hashtags}</p>
      </div>  
    </div>
      <img src="${post.picture}" alt="Random px Picture"> 
    `;
    container.appendChild(postElement);
  });
}

window.addEventListener('scroll', async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading) {
    loading = true;
    pageNumber++;
    const newData = await fetchData(pageNumber);
    renderPosts(newData);
    loading = false;
  }
});

(async () => {
  const initialData = await fetchData(pageNumber);
  renderPosts(initialData);
})();