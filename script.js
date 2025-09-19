const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const warning = document.getElementById("warning");

// Hide warning while typing
[name1Input, name2Input].forEach(input => {
  input.addEventListener("input", () => {
    if (name1Input.value.trim() && name2Input.value.trim()) {
      warning.style.display = "none";
    }
  });
});

function calculateLove() {
  let name1 = name1Input.value.trim().toLowerCase();
  let name2 = name2Input.value.trim().toLowerCase();

  if (!name1 || !name2) {
    warning.style.display = "block";
    warning.style.animation = "shake 0.3s ease"; 
    setTimeout(() => { warning.style.animation = ""; }, 300);
    return;
  } else {
    warning.style.display = "none";
  }

  let finalPercentage;
  let message;
  let steps = [];

  // Special couple: Xorn + Sora
  if (
    (name1 === "xorn" && name2 === "sora") ||
    (name1 === "sora" && name2 === "xorn")
  ) {
    finalPercentage = 100;
    message = "❤️ Perfect match!";
    steps = [[1, 0], [1, 0]]; // simple placeholder steps
  } else {
    // Original calculation
    let combined = (name1 + name2).replace(/ /g, "");

    let freq = [];
    for (let char of combined) {
      freq.push([...combined].filter(c => c === char).length);
    }

    steps.push([...freq]);

    while (freq.length > 2) {
      let newFreq = [];
      for (let i = 0; i < Math.floor(freq.length / 2); i++) {
        let sum = freq[i] + freq[freq.length - 1 - i];
        if (sum >= 10) {
          newFreq.push(...sum.toString().split("").map(Number));
        } else {
          newFreq.push(sum);
        }
      }
      if (freq.length % 2 === 1) {
        newFreq.push(freq[Math.floor(freq.length / 2)]);
      }
      freq = newFreq;
      steps.push([...freq]);
    }

    finalPercentage = parseInt(freq.join(""));
    if (finalPercentage > 100) finalPercentage = 100;

    // Map percentage to message
    if (finalPercentage > 80) message = "❤️ Perfect match!";
    else if (finalPercentage > 50) message = "💖 Good match!";
    else if (finalPercentage > 30) message = "💛 Could work...";
    else message = "💔 Not compatible!";
  }

  // Display results
  document.getElementById("percentage").innerText = finalPercentage + "%";
  document.getElementById("message").innerText = message;

  // Animate progress bar
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.width = finalPercentage + "%";
  }, 50);

  // Display steps
  let stepsList = document.getElementById("steps-list");
  stepsList.innerHTML = "";
  steps.forEach((s, i) => {
    let div = document.createElement("div");
    div.className = "step";
    div.innerHTML = `<span>${i + 1}</span><div class="numbers">${s.join(" ")}</div>`;
    stepsList.appendChild(div);
  });

  document.getElementById("result-box").classList.remove("hidden");
  document.getElementById("steps-box").classList.remove("hidden");
}
