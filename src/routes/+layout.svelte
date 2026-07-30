<script>
  import '../style.css'
  import { onMount } from 'svelte'

  let { children } = $props()

  onMount(() => {
    const barks = ['woof!', 'bork!', 'grrr', 'awoo!', '...🦴?']
    function onClick(e) {
      const dog = document.getElementById('oneko')
      if (!dog) return
      // oneko has pointer-events: none, so hit-test by distance instead
      const dx = e.clientX - (dog.offsetLeft + 16)
      const dy = e.clientY - (dog.offsetTop + 16)
      if (dx * dx + dy * dy > 32 * 32) return
      const bark = document.createElement('span')
      bark.className = 'bark'
      bark.textContent = barks[Math.floor(Math.random() * barks.length)]
      bark.style.left = `${dog.offsetLeft + 8}px`
      bark.style.top = `${dog.offsetTop - 24}px`
      document.body.appendChild(bark)
      setTimeout(() => bark.remove(), 900)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  })
</script>

{@render children()}
