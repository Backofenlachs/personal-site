
const stylesheet = document.createElement("link");

stylesheet.rel = "stylesheet";
stylesheet.href = new URL("./info-section.css", import.meta.url).href;

document.head.append(stylesheet);


class InfoSection extends HTMLElement {

    connectedCallback() {
        if (this.button) return;

        this.button = this.querySelector("button");
        this.content = this.querySelector("div");

        if (!this.button || !this.content) {
            throw new Error("InfoSection: Invalid HTML structure.: missing button or content div.");
        }

        this.setOpen(this.hasAttribute("open"));

        this.button.addEventListener("click", () => {
            const shouldOpen = !this.hasAttribute("open");

            document.querySelectorAll("info-section").forEach(section => {
                if (section !== this && section.content) {
                    section.setOpen(false);
                }
            });

            this.setOpen(shouldOpen);
        });
    }

    setOpen(open) {
        this.content.hidden = !open;
        this.button.setAttribute("aria-expanded", String(open));
        this.toggleAttribute("open", open);
    }
}

customElements.define("info-section", InfoSection);
