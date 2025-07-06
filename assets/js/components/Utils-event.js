

export function DispatchCustomEvent(element, customEventName, detail) {
	const event = new CustomEvent( customEventName, {
		bubbles: true,
		composed: true,
		detail: detail
	});
	element.dispatchEvent(event);
}