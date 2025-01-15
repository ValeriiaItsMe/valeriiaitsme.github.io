document.addEventListener("DOMContentLoaded", () => {
  const examples = document.querySelector(".examples");
  const doneButton = document.querySelector(".done-button");

  const number = 4; // Число для умножения
  const totalExamples = 10; // Количество примеров
  let currentExample = 1;

  function createExample() {
    if (currentExample > totalExamples) {
      doneButton.style.display = "block";
      doneButton.disabled = true;
      return;
    }

    const exampleRow = document.createElement("div");
    exampleRow.classList.add("example-row");

    const exampleBox = document.createElement("div");
    exampleBox.classList.add("example-box");

    const exampleText = document.createElement("span");
    exampleText.textContent = `${number} × ${currentExample} = `;

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("answer-input");

    const greenBlocksRow = document.createElement("div");
    greenBlocksRow.classList.add("green-blocks-row");

    exampleBox.appendChild(exampleText);
    exampleBox.appendChild(input);
    exampleRow.appendChild(exampleBox);
    exampleRow.appendChild(greenBlocksRow);
    examples.appendChild(exampleRow);

    input.focus();

    input.addEventListener("input", () => {
      doneButton.disabled = input.value.trim() === "";
    });

    doneButton.addEventListener("click", () => {
      const userAnswer = parseInt(input.value.trim(), 10);
      const correctAnswer = number * currentExample;

      if (userAnswer === correctAnswer) {
        exampleText.textContent += ` ${correctAnswer}`;
        input.remove();
        doneButton.disabled = true;

        for (let i = 0; i < 4; i++) {
          const block = document.createElement("div");
          block.classList.add("block");
          greenBlocksRow.appendChild(block);
        }

        currentExample++;
        createExample();
      } else {
        input.classList.add("error-input");
        doneButton.classList.add("wrong");

        setTimeout(() => {
          input.classList.remove("error-input");
          doneButton.classList.remove("wrong");
          input.value = "";
          input.focus();
        }, 1000);
      }
    });
  }

  doneButton.disabled = true;
  createExample();
});
