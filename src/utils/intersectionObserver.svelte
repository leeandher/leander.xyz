<script lang="ts" module>
  import type { Action } from "svelte/action";

  interface ActionParameters {
    viewCallback: (viewRatio: number) => void;
    observerThresholds?: number[];
    viewThreshold?: number;
  }

  export const intersectionObserver: Action<HTMLElement, ActionParameters> = (
    node,
    {
      viewCallback,
      observerThresholds = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    }
  ) => {
    $effect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => viewCallback(entry.intersectionRatio));
        },
        { root: null, threshold: observerThresholds }
      );
      observer.observe(node);

      return () => {
        observer.unobserve(node);
      };
    });
  };
</script>
