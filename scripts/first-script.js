// Initial array of sentences to display
let sentences = [
  "(you are an utterly desperate soul.)",
  "(you know neither where this utter desperation sprung from, nor why it haunts you so.)", 
  "(all you know is that that is all you have ever felt, all you feel and all you will ever feel.)",
  "(sometimes, however, you feel content...)",
  "(...with this utter desperation that you have grown accustomed to.)",
  "...",
  "...",
  "(in the abyss of your utterly desperate existence, a shrill voice cuts through to you urgently.)",
  "hey.", 
  "HEY!",
  "yeah, you there. i know you can hear me.",
  "wake up."
];

const conversationTree = {
  start: {
    choices: {
      choice0: {
        text: "(wake up)",
        next: "choice0"
      },
      choice1: {
        text: "(pretend to continue sleeping)",
        next: "choice1"
      }
    }
  },
  choice0: {
    sentences: ["(your eyelids flutter open hesitantly. all you see is... nothing, really.)","finally.", "eyes up here, buddy."],
    choices: {
      choice00: {
        text: "... who are you?",
        next: "choice00"
      },
      choice01: {
        text: "...where am i?",
        next: "choice01"
      }
    }
  },
  choice1: {
    sentences: ["...really?", "i'm not stupid.","(it is pretty clear you're faking it. how can someone be so bad at acting like they're asleep?)"],
    choices: {
      choice0: {
        text: "(wake up reluctantly)",
        next: "choice0"
      },
      choice11: {
        text: "(continue ignoring)",
        next: "choice11"
      }
    }
  },
  choice11: {
    sentences: ["...","...","are we really doing this?", "(are we?)"],
    choices: {
      choice0:{
        text: "(wake up very reluctantly)",
        next:"choice0"
      },
      choice111:{
        text:"(continue ignoring)",
        next:"choice111"
      }
    }
  },
  choice111: {
    sentences: ["i'm gonna kill you.","i don't care that you're alread dead.","i'm seriously gonna kill you.", "(...huh? did he just say something important?)","(ah, it doesn't matter.)","(your eyelids feel heavier and heavier... are you seriously falling asleep?)"],
    choices: {
      choice0:{
        text: "(wake up very, very reluctantly)",
        next:"choice0"
      },
      choice111:{
        text:"(continue ignoring)",
        next:"choice1111"
      }
    }
  },
  choice111: {
    sentences: ["PLEASE wake up.","PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE PLEASE.","...please?","(with your eyes shut, all you see is the void. it feels warm and moist, a most apt location for the empty husk of a human being that you are.)"],
    choices: {
      choice0:{
        text: "(wake up very, very, very reluctantly)",
        next:"choice0"
      },
      choice1111:{
        text:"(continue ignoring)",
        next:"choice1111"
      }
    }
  },
  choice1111:{
    sentences: ["...","i will leave.","...","i really will.", "(the void beckons you sweetly. if you just reached out towards it, you think it would caress you with all the gentleness of a new mother.)"],
    choices: {
      choice0:{
        text:"(wake up very, very, very, VERY reluctantly)",
        next:"choice0"
      },
      choice11111:{
        text:"(continue ignoring)",
        next:"choice11111"
      }
    }
  },
  choice11111:{
    sentences: ["(you hear a loud exclamation in a tongue you cannot understand, then the pattering of footsteps fading away, accompanied by another string of words in the same strange language.)","...","...","...","(ah... peace. finally. you are left alone in the void.)"],
    choices: {
      choice111110:{
        text:"zzz",
        next:"asleep"
      }
    }
  },
  asleep:{
    sentences:["(you have succumbed to the void.)"],
  },
  choice00: {
    sentences: ["i'm your mom.", "...","obviously i'm the grim reaper, bozo.", "(you can't help but feel a bit offended. was it obvious?)"],
    choices: {
      choice000: {
        text: "i'm... dead?",
        next:"choice000"
      },
      choice01: {
        text: "um, and where am i?",
        next:"choice01"
      },
      choice002: {
        text: "i think i'm in love with you."
      }
    }
  },
  choice01: {
    sentences: ["in the afterlife.", "or... well, it's more like some awkward in-the-middle zone.", "i suppose."],
    choices: {
      choice000: {
        text: "i'm... dead?",
        next:"choice000"
      },
      choice00: {
        text: "then who are you?",
        next:"choice00"
      }
    }
  },
  choice000:{
    sentences:["you don't remember?","you fell asleep while trying to make instant ramen and got burnt to a crisp.","(now that he mentions it, the faint smell of bacon wafts towards your nose. it smells... pretty good. you don't know what to think about that.)","it was hilarious. your fat ass just snored through the whole shebang."],
    choices: {
      choice0000: {
        text: "(incoherent screaming)",
        next: "choice0000",
      },
      choice0001:{
        text: "oh my god. just kill me now.",
        next: "choice00001"
      }
    },
  },
  choice0000: {
    sentences: ["yeesh, we got a screamer."],
    choices: {
      choice00001: {
        text: ""
      }
    }
  },
  choice0001: {
    sentences: ["haha, not gonna happen. you're already dead, buddy."],
    choices: {
      choice00001: {
        text: ""
      }
    }
  }
};

// Current node in the conversation
let currentNode = conversationTree.start;

// Function to type text letter by letter
function typeText(text, element, callback) {
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            setTimeout(callback, 1000);a // Timeout before showing the next sentence
        }
    }, 40); // Adjust typing speed by changing the interval duration
}

// Function to start the typing effect
function startTyping(sentences, element) {
    let currentSentence = 0;

    function typeNextSentence() {
        if (currentSentence < sentences.length) {
            element.textContent = ""; // Clear previous text
            typeText(sentences[currentSentence], element, () => {
                currentSentence++;
                if (currentSentence < sentences.length) {
                    typeNextSentence();
                } else {
                    showChoices(); // Show choices after the last sentence
                }
            });
        }
    }

    typeNextSentence();
}

// Function to display choices
function showChoices() {
  const choiceBox = document.querySelector(".choice-box");
  choiceBox.innerHTML = ""; // Clear previous choices
  const choices = currentNode.choices;

  // Loop through choices and create buttons
  Object.keys(choices).forEach((choiceKey) => {
    const choice = choices[choiceKey];
    const button = document.createElement("button");
    button.classList.add("choice-btn");
    button.setAttribute("data-choice", choiceKey);
    button.textContent = choice.text;
    choiceBox.appendChild(button);
    
    // Add event listener for the button
    button.addEventListener("click", function() {
      handleChoice(choiceKey);
    });
  });

  choiceBox.style.display = "flex"; // Show the choice box
}

// Function to handle user's choice and continue the conversation
function handleChoice(choiceKey) {
  // Get the next node in the conversation based on the choice
  currentNode = conversationTree[choiceKey];
  
  // Update sentences to the selected response
  sentences = currentNode.sentences;
  document.querySelector(".choice-box").style.display = "none";
  
  // Clear the text and restart typing effect
  const textElement = document.querySelector(".js-text");
  textElement.textContent = ""; // Clear text
  startTyping(sentences, textElement); // Restart typing with new sentences
}

// Start the typing effect on page load
const textElement = document.querySelector(".js-text");
startTyping(sentences, textElement);
