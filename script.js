const themes = [
    {
        background: "#32292F",
        primary: "#99E1D9"
    },

    {
        background: "#020202",
        primary: "#B2D5E5"
    },

    {
        background: "#171717",
        primary: "#C6FF34"
    },

    {
        background: "#36255C",
        primary: "#D2C3F6"
    },

    {
        background: "#1D1D1D",
        primary: "#E5BDDF"
    }
];

let themeIndex = 0;

const colorButton = document.querySelector(".color-btn");

colorButton.addEventListener("click", function() {
    themeIndex++;

    if (themeIndex >= themes.length) {
        themeIndex = 0;
    }

    const theme = themes[themeIndex];

    document.documentElement.style.setProperty(
        "--primary",
        theme.primary
    );

    document.documentElement.style.setProperty(
        "--secondary",
        theme.primary
    );
    document.documentElement.style.setProperty(
        "--background-bottom",
        "#020202"
    );
  const overlay = document.querySelector(".theme-overlay");

  overlay.style.background = `linear-gradient(to bottom, ${theme.background}, ${theme.background}, #020202)`;

  overlay.style.opacity = "1";

  setTimeout(() => {
    document.documentElement.style.setProperty(
      "--background-top",
      theme.background
    );

    document.documentElement.style.setProperty(
      "--background-middle",
      theme.background
    );

    overlay.style.opacity = "0";
  }, 600);
});

for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    document.body.appendChild(particle);

    // Kích thước
    const size = Math.random() * 4 + 2;

    // Độ sáng
    const baseOpacity = Math.random() * 0.5 + 0.2;

    // Tốc độ rất chậm
    const speed = Math.random() * 15 + 5;

    // Độ lệch sáng riêng
    const twinkleSpeed = Math.random() * 0.002 + 0.001;
    const twinkleOffset = Math.random() * Math.PI * 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Glow phụ thuộc vào kích thước
    particle.style.boxShadow =
        `0 0 ${size * 2}px rgba(255, 255, 255, 0.25)`;

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    let lastTime = performance.now();

    function move(currentTime = performance.now()) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Di chuyển sang phải + hơi xuống
        x += speed * deltaTime / 1000;
        y += speed * 0.3 * deltaTime / 1000;

        // Độ sáng thay đổi cực nhẹ
        const twinkle =
            Math.sin(currentTime * twinkleSpeed + twinkleOffset);

        particle.style.opacity =
            baseOpacity + twinkle * 0.08;

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        // Ra khỏi màn hình thì quay lại
        if (x > window.innerWidth + 10) {
            x = -10;
        }

        if (y > window.innerHeight + 10) {
            y = -10;
        }

        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);
}