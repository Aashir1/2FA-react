import blue from "~/assets/blue.png";
import orange from "~/assets/orange.png";
import pink from "~/assets/pink.png";
import red from "~/assets/red.png";
import white from "~/assets/white.png";

export function getIcon() {
  const items = [blue, orange, pink, red, white];
  return items[Math.floor(Math.random() * items.length)];
}
