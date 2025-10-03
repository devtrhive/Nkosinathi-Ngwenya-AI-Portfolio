document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("nav ul li");
  const sections = document.querySelectorAll(".content-section");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // hide all
      sections.forEach(section => section.style.display = "none");

      // remove highlight
      navItems.forEach(i => i.classList.remove("active"));

      // highlight clicked
      item.classList.add("active");

      // show the chosen section
      const category = item.getAttribute("data-category");
      const section = document.getElementById(category);
      if (section) {
        section.style.display = "block";
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');  // Add glow
      } else {
        entry.target.classList.remove('active'); // Remove glow when out of view
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => {
    observer.observe(section);
  });
  
  // default section
  document.getElementById("general-chat").style.display = "block";
});
const API_URL = "https://www.chatbase.co/api/v1/chat";
const AGENT_ID = "phcz4KfrEM8srnOOYHBgG"; // your Chatbase agent ID
const API_KEY = "1806a362-f55f-4d72-80c5-39ea00b677a9"; // your Chatbase API key

const chatResponses = document.getElementById("chatResponses");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Save first message to localStorage
  localStorage.setItem("firstMessage", userMessage);

  // Redirect to full chat page
  window.location.href = "chat.html";
});

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // show user message
  chatResponses.innerHTML += `<div class="user-msg"><strong>You:</strong> ${userMessage}</div>`;
  userInput.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        chatbotId: AGENT_ID,   // ✅ Correct field
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await res.json();
    console.log("Chatbase raw response:", data);

    // ✅ Correct field for the reply
    let reply = data.output || data.output_text || data.text || "⚠️ No reply from Chatbase.";
    
    chatResponses.innerHTML += `<div class="bot-msg"><strong>Nkosii:</strong> ${reply}</div>`;
    chatResponses.scrollTop = chatResponses.scrollHeight;
  } catch (err) {
    console.error("Error calling Chatbase:", err);
    chatResponses.innerHTML += `<div class="bot-msg">⚠️ Connection error. Try again later.</div>`;
  }
}

sendBtn.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Save the message temporarily
  localStorage.setItem("firstMessage", userMessage);

  // Redirect to full chat page
  window.location.href = "chat.html";
});

userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    e.preventDefault(); // stop form refresh if inside a form
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    localStorage.setItem("firstMessage", userMessage);
    window.location.href = "chat.html";
  }
});
const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebar-toggle');
const overlay = document.getElementById('sidebar-overlay');

// Toggle sidebar and overlay
toggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Click overlay to close sidebar
overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});
const journeyWarning = document.getElementById('journey-mobile-warning');
const closeBtn = document.getElementById('close-warning');

// Show warning automatically when user opens Journey gallery on mobile
function showJourneyWarning() {
  if (window.innerWidth <= 768) {
    journeyWarning.style.display = 'block';
  }
}

// Close button
closeBtn.addEventListener('click', () => {
  journeyWarning.style.display = 'none';
});

// Optional: hide if user rotates to landscape
window.addEventListener('resize', () => {
  if (window.innerWidth > window.innerHeight && window.innerWidth <= 768) {
    journeyWarning.style.display = 'none'; // in landscape mode
  }
});
// Only run JS if mobile screen
if (window.innerWidth <= 768) {
  const journeyWarning = document.getElementById('journey-mobile-warning');
  const closeBtn = document.getElementById('close-warning');

  // Warning is already visible via CSS on mobile
  closeBtn.addEventListener('click', () => {
    journeyWarning.style.display = 'none';
  });

  // Optional: hide warning if device rotated to landscape
  window.addEventListener('resize', () => {
    if (window.innerWidth > window.innerHeight && window.innerWidth <= 768) {
      journeyWarning.style.display = 'none';
    }
  });
}
window.addEventListener("resize", () => {
  const gallery = document.querySelector(".journey-gallery");
  
  if (window.innerWidth > window.innerHeight && window.innerWidth <= 768) {
    // Landscape mobile
    gallery.style.gridTemplateColumns = "repeat(2, 1fr)";
    document.getElementById("journey-mobile-warning").style.display = "none";
  } else if (window.innerWidth <= 768) {
    // Portrait mobile
    gallery.style.gridTemplateColumns = "1fr";
    document.getElementById("journey-mobile-warning").style.display = "block";
  } else {
    // Desktop
    gallery.style.gridTemplateColumns = "repeat(3, 1fr)";
    document.getElementById("journey-mobile-warning").style.display = "none";
  }
});
