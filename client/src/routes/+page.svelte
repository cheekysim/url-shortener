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

  function fixFormReset(el: HTMLInputElement) {
		const form = el.form
		if (!form) return
		const handleReset = () => {
			// Set timeout is needed since `el.value` is only updated on the next frame
			setTimeout(() => {
				el.dispatchEvent(new Event('input'))
			}, 0)
		}
		form.addEventListener('reset', handleReset)
		return {
			destroy() {
				form.removeEventListener('reset', handleReset)
			}
		}
	}
</script>

<section class="container">
  <form action="?/create" method="POST" class="main-form">
    <div class="inputs">
      <label>
        <h4>Long URL</h4>
        <input type="text" name="longUrl" required/>
      </label>
      <label>
        <h4>Short URL</h4>
          <input type="text" name="shortUrl" bind:value={shortUrl} placeholder={shortUrlPlaceholder}/>
          <input type="hidden" name="shortUrlPlaceholder" value={shortUrlPlaceholder}/>
      </label>
    </div>
    {#if form?.processed}
      {#if form?.code === 200 || form?.code === 304}
        <div class="output">
          <a href="/{form?.short}">{form?.short.length < 7 ? "url.cheekysim.com/" : "/"}{form?.short}</a>
          <div class="copy-container">
            <button type="button" title="Copy URL" on:click={() => navigator.clipboard.writeText(`https://url.cheekysim.com/${form?.short}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
            </button>
          </div>
          <div class="regen-container">
            <button type="submit" title="Generate New">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
            </button>
          </div>
        </div>
      {:else if form?.code === 409}
      <div class="output">
          <p>Form Error | Short URL Already Exists</p>
          <div class="regen-container">
            <button type="submit" title="Generate New">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
            </button>
          </div>
        </div>
      {:else if form?.code === 413}
      <div class="output">
          <p>Form Error | Short URL Too Long</p>
          <div class="regen-container">
            <button type="submit" title="Generate New">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
            </button>
          </div>
        </div>
      {:else}
        <p>Form Error | Unknown Error</p>
        <div class="regen-container">
          <button type="submit" title="Generate New">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
          </button>
        </div>
      {/if}
    {:else}
      <button type="submit" class="generate">Generate Short URL</button>
    {/if}
  </form>
  <div class="form-background"></div>
</section>
