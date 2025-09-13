    const name1Input = document.getElementById("name1");
    const name2Input = document.getElementById("name2");
    const warning = document.getElementById("warning");

    // hide warning while typing
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

      // 1. Combine names
      let combined = (name1 + name2).replace(/ /g, "");

      // 2. Count frequencies
      let freq = [];
      for (let char of combined) {
        freq.push([...combined].filter(c => c === char).length);
      }

      let steps = [];
      steps.push([...freq]);

      // 3. Pair and sum until we reach 2 numbers
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

      let finalPercentage = parseInt(freq.join(""));
      if (finalPercentage > 100) finalPercentage = 100;

      document.getElementById("percentage").innerText = finalPercentage + "%";

      // progress bar animation fix
      const progressBar = document.getElementById("progress-bar");
      progressBar.style.width = "0%";
      setTimeout(() => {
        progressBar.style.width = finalPercentage + "%";
      }, 50);

      let msg = "Perfect Match! 💕";
      if (finalPercentage < 50) msg = "Keep Trying! 💪";
      else if (finalPercentage < 75) msg = "Nice Compatibility! 🌸";
      document.getElementById("message").innerText = msg;

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
