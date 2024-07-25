
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

inputForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const input = inputField.value;
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  let response = generateResponse(input);

  if (!response) {
    // Fallback to web search
    const searchTerm = encodeURIComponent(input);
    response = `I'm sorry, I couldn't find information on "${input}". You might try searching <a href="https://www.google.com/search?q=${searchTerm}" target="_blank">here</a>.`;
  }

  message = document.createElement('div');
  message.classList.add('chatbot-message', 'chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({behavior: "smooth"});
});


function generateResponse(input) {
  const questionResponses = {
    "hello": "Hello, how can I help you today? 😊",
    "help": "I'm here to assist you with any questions or concerns you may have. 📩",
    "internet": "I'm sorry, I'm not able to browse the internet or access external information. Is there anything else I can help with? 💻",
    "offensive": "I'm sorry, I'm not programmed to handle offensive or inappropriate language. Please refrain from using such language in our conversation. 🚫",
    "weather": "I can provide you with weather updates for specific locations. Please specify the location you're interested in. ☀️⛈️❄️",
    "time": "The current time is [current time].",
    "joke": "Sure, here's a joke for you: [I'm Just Joking]. 😄",
    "news": "I can't fetch the latest news, but I can provide general information on various topics. What topic are you interested in?",
    "how are you?": "I'm just a bot, but I'm here and ready to assist you! How can I help you today? 😊",
    "what is your name?": "I'm an AI assistant created to help you. You can call me [Bot's Name]. How can I assist you further?",
    "where are you from?": "I exist in the digital realm, here to serve you wherever you are! What can I do for you today?",
    "what can you do?": "I can do a lot of things! Ask me anything from providing information, telling jokes, to helping with calculations. How can I assist you today?",
    "can you sing?": "I can't sing, but I can provide song lyrics if you'd like! Just let me know which song you're interested in.",
    "what is the meaning of life?": "Ah, the eternal question! The meaning of life is subjective and can vary from person to person. What's meaningful to you?",
    "What's the weather like today?":"To get the current weather, you can check a reliable weather website or use a weather app on your phone. If you need help finding one, let me know!",
    "Can you recommend a good book to read?":"Absolutely! What genre are you interested in? I can suggest a book based on your preferences.",
    "How can I stay motivated?": "Staying motivated can be challenging, but setting achievable goals, breaking tasks into smaller steps, and celebrating your progress can help. Also, find what inspires you and remind yourself of your why!",
    "What's the capital of France?":"The capital of France is Paris.",
    "How can I learn programming?": "Learning programming can be fun and rewarding! There are many online resources like coding tutorials, courses, and coding challenges available. Do you have a specific programming language in mind?",
    "How do I start a business?":"Starting a business involves several steps, such as identifying a niche, conducting market research, creating a business plan, securing funding, and registering your business. Are you looking for specific advice on any of these steps?",
    "What's the best way to learn a new language?": "Immersion, practice, and consistency are key! Try to immerse yourself in the language by listening to music, watching movies, and practicing with native speakers. Also, consider using language learning apps and attending language classes.",
    "Who invented the lightbulb?":"The modern electric lightbulb was invented by Thomas Edison in 1879.",
    "How do I stay healthy?": "Staying healthy involves a balanced diet, regular exercise, enough sleep, managing stress, and avoiding harmful habits like smoking and excessive drinking. Remember to listen to your body and seek medical advice when needed.",
  };

  input = input.toLowerCase();
  for (const question in questionResponses) {
    if (input.includes(question)) {
      return questionResponses[question];
    }
  }


 
  const mathResponse = solveMathProblem(input);
  if (mathResponse) {
    return mathResponse;
  }

 
  return null;
}


function solveMathProblem(input) {
 
  const mathRegex = /(\d+(\.\d+)?)\s*([+\-*\/])\s*(\d+(\.\d+)?)/;
  const match = input.match(mathRegex);
  if (!match) return null;

 
  const operand1 = parseFloat(match[1]);
  const operator = match[3];
  const operand2 = parseFloat(match[4]);

  
  let result;
  switch (operator) {
    case '+':
      result = operand1 + operand2;
      break;
    case '-':
      result = operand1 - operand2;
      break;
    case '*':
      result = operand1 * operand2;
      break;
    case '/':
      if (operand2 === 0) return "Division by zero is not allowed.";
      result = operand1 / operand2;
      break;
    default:
      return null;
  }
  return `The result is ${result}`;
}



