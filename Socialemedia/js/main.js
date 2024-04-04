let pageNumber = 1;
const perPage = 4;
let loading = false;

async function fetchData(page) {
  const response = await fetch(`../data.json?page=${page}&perPage=${perPage}`);
  let data = await response.json();
  
  data = shuffleArray(data);
  return data;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

const observer = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting && !loading) {
    loading = true;
    pageNumber++;
    const newData = await fetchData(pageNumber);
    if (newData.length > 0) {
      renderPosts(newData);
    } else {
      observer.disconnect();
    }
    loading = false;
  }
}, {
  threshold: 0.5
});

document.addEventListener('DOMContentLoaded', async () => {
  const initialData = await fetchData(pageNumber);
  renderPosts(initialData);
  const lastPost = document.querySelector('.post:last-child');
  if (lastPost) {
    observer.observe(lastPost);
  }
});