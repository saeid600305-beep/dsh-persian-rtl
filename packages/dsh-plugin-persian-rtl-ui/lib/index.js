/**
 * dsh-plugin-persian-rtl-ui — host half.
 *
 * The host contributes nothing. This package exists so its `dsh.client`
 * declaration reaches the Web module graph: `lib/client.js` is the whole
 * feature. Keeping the UI half in its own package lets the writing-policy
 * bundle stay host-only and lets either half be disabled independently.
 *
 * @module dsh-plugin-persian-rtl-ui
 */

/** Cordis plugin name. */
export const name = 'persian-rtl-ui'

/**
 * No host-side behavior: the client module does all the work.
 */
export function apply() {}
