<script>
  import 'modern-normalize/modern-normalize.css';
  import '../styles/main.scss';
  import Nprogress from 'nprogress'
  import 'nprogress/nprogress.css'
  import MicroModal from 'micromodal';
  import { hideAll } from 'tippy.js';
  import Navigation from '$lib/components/Navigation.svelte';
  import Header from '../lib/components/Header.svelte';
  import {page}  from '$app/stores';
  import {beforeNavigate, afterNavigate} from '$app/navigation';
  import {browser} from '$app/environment';
  import SearchForm from '$lib/components/SearchForm.svelte';
  // Define the 'data' prop
  export let data;


  if(browser){
    MicroModal.init();
  }

  let topbar = null;
  let scrollY;
  let headerOpacity = 0;

  $: if(topbar){
      headerOpacity = scrollY / (topbar.offsetHeight<1 ? scrollY / topbar.offsetHeight : 1);
  }
  $: user = data.user;
  $: userAllPlaylists = data.userAllPlaylists;

  beforeNavigate(() => {
    Nprogress.start()
    hideAll()
  })

  afterNavigate(() => {
    Nprogress.done()
  })

  Nprogress.configure({showSpinner: false})
  
</script>

<svelte:window bind:scrollY />

<svelte:head>
  <title>Spotify{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
</svelte:head>

{#if user}
  <a href="#main-content" class="skip-link">Skip to Content</a>
  
{/if}

<div id="main">
  {#if user}
    <div id="sidebar">
      <Navigation desktop = {true} {userAllPlaylists}/>
    </div>
  {/if}
  <div id="content">
    {#if user}
      <div id="topbar" bind:this={topbar}>
        <div class="topbar-bg" 
        style:background-color=  {$page.data.color ? $page.data.color : "var(--header-color)"} 
        style:opacity={`${headerOpacity}`} /> 
        <Header {userAllPlaylists}/>
      </div>
    {/if}  
    <main id="main-content"  class:logged-in={user}>
      {#if $page.url.pathname.startsWith('/search')}
        <div class="search-form">
          <SearchForm />
        </div>
		  {/if}
      <slot />
    </main>
  </div>
</div>
<!-- Render the component's children using the <slot /> element -->
<style lang="scss">
  #main {
    display: flex;
    :global(html.no-js) & {
      @include breakpoint.down('md') {
        display: block;
      }
    }
    #content {
      flex:1 ;
      #topbar {
        position: fixed;
        height: var(--header-height);
        padding: 0 15px;
        display: flex;
        align-items: center;
        width: 100%;
        z-index: 100;
        :global(html.no-js) & {
          position: sticky;
          top: 0;
          height: auto;
          padding: 10px 20px;
          background-color: var(--header-color);
          @include breakpoint.up('md') {
            position: fixed;
          }
        }
        .topbar-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          background-image: linear-gradient(rgba(0, 0, 0, 0.2)0 0 );
        }
        @include breakpoint.up('md') {
          padding: 0 30px;
          width: calc(100% - var(--sidebar-width));
        }
      }
      main#main-content {
        padding: 30px 15px 60px;
        .search-form {
					margin-bottom: 40px;
					@include breakpoint.up('lg') {
						display: none;
					}
					:global(input) {
						width: 100%;
					}
				}
        @include breakpoint.up('md') {
          padding: 30px 30px 60px;
        }
        &.logged-in {
          padding-top: calc(30px + var(--header-height));
          :global(html.no-js) & {
            @include breakpoint.down('md') {
              padding-top: 30px;
            }
          }
        }
      }
    }
  }	
</style>