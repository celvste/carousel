function typeWriter(text, callback) {
  const storyText = document.getElementById('story-text');
  let index = 0;

  function type() {
      if (index < text.length) {
          storyText.textContent += text.charAt(index);
          index++;
          setTimeout(type, 50); // Adjust speed here
      } else if (callback) {
          setTimeout(callback, 1000); // Delay before next action
      }
  }

  storyText.textContent = ''; // Clear existing text
  type();
}

function chooseOption(option) {
  if (option === 1) {
      typeWriter("You decide to take the left path. The forest grows darker as you move forward.", () => {
          updateOptions(["Keep going", "Turn back"]);
      });
  } else if (option === 2) {
      typeWriter("You take the right path. A clearing opens up, revealing a small village.", () => {
          updateOptions(["Enter the village", "Walk past the village"]);
      });
  }
}

function updateOptions(options) {
  const responseOptions = document.getElementById('response-options');
  responseOptions.innerHTML = ''; // Clear existing buttons

  options.forEach((optionText, index) => {
      const button = document.createElement('button');
      button.className = 'response-button';
      button.textContent = optionText;
      button.onclick = () => chooseOption(index + 1); // Update with new choices
      responseOptions.appendChild(button);
  });
}

// Initialize with the first text
typeWriter("You find yourself at a crossroads. Which path do you choose?");
