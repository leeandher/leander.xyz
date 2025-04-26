import { crossfade } from "svelte/transition";
import { quintOut } from "svelte/easing";

export const [send, receive] = crossfade({
  duration: (d) => Math.sqrt(d * 200),
  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    return {
      duration: 200,
      easing: quintOut,
      css: (t) => `
				transform: ${transform} scale(${t});
			`,
    };
  },
});

// function comet(fromNode: Element, toNode: Element, params: {

// }) {
//   const {...params}
//   const fromRect = fromNode.getBoundingClientRect();
//   const toRect = toNode.getBoundingClientRect();
//   const dx = fromRect.left - toRect.left;
//   const dy = fromRect.top - toRect.top;
//   const dw = fromRect.width / toRect.width;
//   const dh = fromRect.height / toRect.height;
//   const distance = Math.sqrt(dx * dx + dy * dy);
//   const style = getComputedStyle(toNode);
//   const transform = style.transform === "none" ? "" : style.transform;
//   return {
//     delay,
//     duration:
//   }
// }
