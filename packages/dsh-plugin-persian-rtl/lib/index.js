/**
 * dsh-plugin-persian-rtl — Persian/RTL writing policy for every agent.
 *
 * The plugin owns no services and no tools. It registers one high-priority
 * system-prompt section, so the policy reaches the main agent, its subagents,
 * and every session started in this DSH profile. The policy is disabled by the
 * rule it states first: an English question is answered in English.
 *
 * The policy body lives in `policy.md` and is read on every prompt assembly, so
 * editing that file changes the next request without restarting the Host.
 *
 * @module dsh-plugin-persian-rtl
 */

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Cordis plugin name. */
export const name = 'persian-rtl'

/** The prompt registry this plugin contributes to. */
export const inject = ['systemPrompt']

/** Section name; unique so no first-party section can shadow it by accident. */
const SECTION_NAME = 'deployment:persian-rtl-orthography'

/**
 * Default order. 400 places the policy after the deployment persona (0) and
 * before plan/team policy (500) and every tool-guidance section, so it reads as
 * a writing rule rather than a tool note.
 */
const DEFAULT_ORDER = 400

/** Absolute path of the policy body shipped beside `lib/`. */
const POLICY_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'policy.md')

/**
 * Minimal policy used only when `policy.md` cannot be read, so a moved or
 * damaged file can never leave the agent without any rule.
 */
const FALLBACK = `## Persian writing policy (RTL and رسم‌الخط)

Answer in the user's language: Persian questions get Persian answers, English questions get English answers. Write Persian right-to-left with Persian punctuation and Persian digits. Separate every independent word with a full space; the half-space joins one word only. Use ی and ک (never ي and ك). Keep the tone plain and everyday.
`

/**
 * Read the policy body from disk.
 * @returns the policy markdown, or {@link FALLBACK} when the file is unreadable.
 */
function readPolicy() {
  try {
    const text = readFileSync(POLICY_PATH, 'utf8').trim()
    return text.length > 0 ? text : FALLBACK
  } catch {
    return FALLBACK
  }
}

/**
 * Compose the section text for one assembly: the file body plus optional
 * project-specific additions from the row configuration.
 */
function renderPolicy(extraRules) {
  const body = readPolicy()
  return extraRules.length > 0 ? `${body}\n\n### Project-specific additions\n\n${extraRules}\n` : body
}

/**
 * Register the writing policy for the calling scope.
 *
 * @param ctx - Cordis plugin context; the section is disposed with it.
 * @param config - optional row configuration:
 *   `order` overrides the section order,
 *   `extraRules` appends project-specific rules to the policy.
 */
export function apply(ctx, config) {
  const order = Number.isFinite(config?.order) ? Number(config.order) : DEFAULT_ORDER
  const extraRules = typeof config?.extraRules === 'string' ? config.extraRules.trim() : ''

  ctx.effect(
    () =>
      ctx.systemPrompt.section({
        name: SECTION_NAME,
        order,
        // Read on every assembly so policy edits apply to the next request.
        text: () => renderPolicy(extraRules),
        interpolate: false,
      }),
    'persian-rtl.section()',
  )
}

export { POLICY_PATH, SECTION_NAME }
