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