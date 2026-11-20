/**
 * Copies text to the clipboard. `navigator.clipboard` only exists in secure
 * contexts (https/localhost), so on plain http (e.g. testing over the LAN)
 * this falls back to a temporary textarea and `execCommand`.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	if (window.isSecureContext && navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text)
			return true
		} catch {
			// fall through to the legacy path
		}
	}

	const textarea = document.createElement('textarea')
	textarea.value = text
	textarea.setAttribute('readonly', '')
	textarea.style.position = 'fixed'
	textarea.style.top = '0'
	textarea.style.left = '0'
	textarea.style.opacity = '0'
	document.body.appendChild(textarea)
	textarea.focus()
	textarea.select()
	// iOS Safari ignores select() on readonly inputs without an explicit range
	textarea.setSelectionRange(0, text.length)
	try {
		return document.execCommand('copy')
	} catch {
		return false
	} finally {
		document.body.removeChild(textarea)
	}
}
