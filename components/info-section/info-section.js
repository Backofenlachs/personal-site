
const stylesheet = document.createElement("link");

stylesheet.rel = "stylesheet";
stylesheet.href = new URL("./info-section.css", import.meta.url).href;

document.head.append(stylesheet);

const icon = `
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg class="info-section__icon"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         aria-hidden="true">

        <path d="M5 12H19" />
        <path class="vertical" d="M12 5L12 19" />
    </svg>
`;

class InfoSection extends HTMLElement {

    connectedCallback() {
        if (this.button) return;

        this.button = this.querySelector("button");
        this.content = this.querySelector("div");

        if (!this.button || !this.content) {
            throw new Error("InfoSection: Invalid HTML structure.: missing button or content div.");
        }

        // Add button icon
        this.button.insertAdjacentHTML("beforeend", icon);

        this.setOpen(this.hasAttribute("open"));

        this.button.addEventListener("click", () => {
            const shouldOpen = !this.hasAttribute("open");
            
            // DEVNOTE: only one info-section open at a time.
            // TEMP: when by increasing application complexity this logic should be moved to the higher level, component.
            document.querySelectorAll("info-section").forEach(section => {
                if (section !== this && section.content) {
                    section.setOpen(false);
                }
            });

            this.setOpen(shouldOpen);
        });
    }

    setOpen(open) {
        if(!this.button || !this.content) {
            throw new Error("InfoSection: button and content not properly initialized.");
        }

        this.button.setAttribute("aria-expanded", String(open));
        this.content.inert = !open;
        this.toggleAttribute("open", open);
    }
}

customElements.define("info-section", InfoSection);
