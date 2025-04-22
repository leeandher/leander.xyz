<script lang="ts">
  interface Props {
    text?: string;
  }
  const { text }: Props = $props();
</script>

<span class="absolute block -z-1 inset-0 top-full h-0.75 rounded-full bg-snap"
></span>
<a href="/writings">{text ? text : "writings"}</a>
