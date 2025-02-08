import { invoke } from "@tauri-apps/api/core";
import { Menu, Submenu } from "@tauri-apps/api/menu";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  (async () => {
    const main = await Submenu.new({
      text: "tauri-help-menu-broken-repo",
      items: [
        {
          text: "Testing",
          action: () => alert("todo"),
        },
      ],
    });

    const help = await Submenu.new({
      text: "Help",
      items: [
        // Without an item the menu doesn't appear
        {
          text: "Privacy Policy",
          action: () => alert("todo"),
        },
      ],
    });
    // This
    await help.setAsHelpMenuForNSApp();

    const menu = await Menu.new({ items: [main, help] });
    await menu.setAsAppMenu();
  })();
});
