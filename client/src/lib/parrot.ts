// Lets any part of the page open the Parrot AI companion chat (bottom-right).
export const PARROT_OPEN = 'parrot:open'

export function openParrot() {
  window.dispatchEvent(new Event(PARROT_OPEN))
}
