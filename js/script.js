// ---------- Loading Screen ----------
window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  setTimeout(() => {
    loading.style.display = "none";
  }, 2500); // 2,5 Sekunden
});

// ---------- Events Modal ----------
const eventsBtn = document.getElementById("events-btn");
const eventsModal = document.getElementById("events-modal");
const closeModal = document.querySelector(".close");

if (eventsBtn) {
  eventsBtn.addEventListener("click", () => {
    eventsModal.style.display = "flex";
  });
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    eventsModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === eventsModal) {
    eventsModal.style.display = "none";
  }
});

// ---------- Forum ----------
const postTitleInput = document.getElementById("post-title");
const postContentInput = document.getElementById("post-content");
const createPostBtn = document.getElementById("create-post");
const forumPosts = document.getElementById("forum-posts");

function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
  forumPosts.innerHTML = "";
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
    forumPosts.appendChild(postElement);
  });
}

function savePost(title, content) {
  const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
  posts.push({ title, content });
  localStorage.setItem("forumPosts", JSON.stringify(posts));
  loadPosts();
}

if (createPostBtn) {
  createPostBtn.addEventListener("click", () => {
    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();
    if (title && content) {
      savePost(title, content);
      postTitleInput.value = "";
      postContentInput.value = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", loadPosts);

// -------- Server Status per Script --------
function setServerStatus(serverId, statusText, isOnline) {
    const statusElement = document.getElementById(serverId);
    if (statusElement) {
        statusElement.textContent = statusText;
        statusElement.className = "status " + (isOnline ? "online" : "offline");
    }
}

// -------- Einfach editierbare Konfiguration --------
const serverConfig = {
    "website-status": {
        text: "Online - All good",
        online: true
    },
    "germany-status": {
        text: "Online - All good",
        online: true
    }
};

// -------- Automatisch anwenden --------
document.addEventListener("DOMContentLoaded", () => {
    for (const [id, config] of Object.entries(serverConfig)) {
        setServerStatus(id, config.text, config.online);
    }
});


