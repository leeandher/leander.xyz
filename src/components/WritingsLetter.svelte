<script lang="ts">
  import { receive } from "../styles/transition";
  export const writingKey = "WRITING";
</script>

<a class="text-snap" href="/writings" in:receive={{ key: writingKey }}>w</a>
