<script lang="ts">
	import { onMount } from "svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  export let form;

  let shortUrl = "";
  let shortUrlPlaceholder = "Generating...";
  
  onMount(async () => {
    shortUrlPlaceholder = await generateShortUrl();
  });

  async function generateShortUrl() {
    const shortUrl = Math.random().toString(36).substring(2, 7);
    // @ts-ignore
    if (data.body.find((item) => item.short === shortUrl)) {
      return generateShortUrl();
    } else {
      return shortUrl;
    }
  }
</script>

<div class="container">
  <form action="?/create" method="POST">
    <label>
      Long URL
      <input type="text" name="longUrl" required/>
    </label>
    <label>
      Short URL
        <input type="text" name="shortUrl" bind:value={shortUrl} placeholder={shortUrlPlaceholder}/>
        <input type="hidden" name="shortUrlPlaceholder" value={shortUrlPlaceholder}/>
    </label>
    <button type="submit">Submit</button>
  </form>
  {#if form?.processed}
    {#if form?.code === 200}
    <p>Form Success<br><a href="/{form?.short}">http://localhost:5173/{form?.short}</a></p>
    {:else if form?.code === 304}
    <p>Form Success | Already Exists<br><a href="/{form?.short}">http://localhost:5173/{form?.short}</a></p>
    {:else if form?.code === 409}
    <p>Form Error | Short URL Already Exists</p>
    {:else}
    <p>Form Error | Unknown Error</p>
    {/if}
  {/if}
</div>
