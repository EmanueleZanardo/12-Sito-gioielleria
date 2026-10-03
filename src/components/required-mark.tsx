/**
 * Asterisco visivo per le etichette dei campi obbligatori.
 * `aria-hidden` evita che gli screen reader leggano "asterisco":
 * l'input associato è già marcato `required` (annunciato nativamente).
 */
export function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-gold">
      {' '}
      *
    </span>
  );
}
