// Line one of the headline is CSS keyframes, which start when the page first paints — not
// when Vue mounts, which on a slow connection can be a second later. The scripted parts of the
// hero (line two, the product demo) read this clock so they land on the same beat.
// startTime, not currentTime: a finished animation's currentTime stops at its end.
export function introElapsed() {
  const a = document.querySelector('.dt-k')?.getAnimations?.()[0]
  return a?.startTime == null ? 0 : Number(document.timeline.currentTime) - Number(a.startTime)
}

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
