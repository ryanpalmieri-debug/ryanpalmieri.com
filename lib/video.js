// Convert Vimeo / YouTube URLs into background-autoplay embed URLs.
// Returns null if the URL isn't recognized.

export function toEmbedUrl(url) {
  if (!url) return null

  // Vimeo — matches vimeo.com/ID, vimeo.com/ID?share=..., player.vimeo.com/video/ID
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) {
    const id = vimeoMatch[1]
    return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`
  }

  // YouTube — matches youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  if (ytMatch) {
    const id = ytMatch[1]
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`
  }

  return null
}
