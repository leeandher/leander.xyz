export interface NavState {
  writings: "nav" | "showcase";
  work: "nav" | "showcase";
  wares: "nav" | "showcase";
}

export const navState = $state<NavState>({
  writings: "nav",
  work: "nav",
  wares: "nav",
});
