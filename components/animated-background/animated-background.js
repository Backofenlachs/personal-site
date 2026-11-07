
const stylesheet = document.createElement("link");

stylesheet.rel = "stylesheet";
stylesheet.href = new URL("./animated-background.css", import.meta.url).href;

document.head.append(stylesheet);


class AnimatedBackground extends HTMLElement {

    connectedCallback() {
        if (!window.matchMedia(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
        ).matches) return;

        this.onPointerMove = (event) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 10;
            const y = (event.clientY / window.innerHeight - 0.5) * 10;

            this.style.setProperty("--offset-x", `${x}px`);
            this.style.setProperty("--offset-y", `${y}px`);
        };

        window.addEventListener("pointermove", this.onPointerMove);
    }

    disconnectedCallback() {
        if (this.onPointerMove) {
            window.removeEventListener("pointermove", this.onPointerMove);
        }
    }
}

customElements.define("animated-background", AnimatedBackground);
