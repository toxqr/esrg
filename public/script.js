const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");

const messages = [
  {
    role: "assistant",
    content: "Hey! I am your AI chatbot. What do you want to talk about?"
  }
];

function render() {
  chat.innerHTML = "";
  messages.forEach((message) => {
    const div = document.createElement("div");
    div.className = `message ${message.role}`;
    div.textContent = message.content;
    chat.appendChild(div);
  });
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(userText) {
  messages.push({ role: "user", content: userText });
  messages.push({ role: "assistant", content: "Thinking..." });
  render();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages.filter((m) => m.content !== "Thinking...")
      })
    });

    const data = await response.json();

    messages[messages.length - 1] = {
      role: "assistant",
      content: data.reply || data.error || "Something went wrong."
    };
  } catch (error) {
    messages[messages.length - 1] = {
      role: "assistant",
      content: "Could not connect to the chatbot server."
    };
  }

  render();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  input.disabled = true;
  form.querySelector("button").disabled = true;

  await sendMessage(text);

  input.disabled = false;
  form.querySelector("button").disabled = false;
  input.focus();
});

render();
