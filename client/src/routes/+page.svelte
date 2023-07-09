<script lang="ts">
	import { create } from "domain";
	import { onMount } from "svelte";
  export let data;
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

  async function createShortUrl(event: Event) {
    const res = await fetch("/api/short", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long: form.longUrl,
        short: form.shortUrl,
      }),
    });
    const data = await res.json();
    return data;
  }

  $: console.log(shortUrl || shortUrlPlaceholder);
</script>

<div class="container">
  <form on:submit|preventDefault={createShortUrl} method="POST">
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
  {#if form?.success}
    <p>Form Success<br><a href="/{form?.short}">http://localhost:5173/{form?.short}</a></p>
  {/if}
</div>
