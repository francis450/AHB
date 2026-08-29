// Frappe returns user-facing errors from `frappe.throw()` inside `_server_messages`
// (a JSON string holding a list of JSON strings). The top-level `exc` field is a
// raw Python traceback and must never be shown to a visitor. This helper digs out
// the clean message, falling back to `exception` / a provided default.
export const extractFrappeError = (data: unknown, fallback: string): string => {
  if (!data || typeof data !== 'object') return fallback;
  const record = data as Record<string, unknown>;

  const serverMessages = record._server_messages;
  if (typeof serverMessages === 'string') {
    try {
      const parsed = JSON.parse(serverMessages) as unknown;
      if (Array.isArray(parsed) && parsed.length) {
        const first = parsed[0];
        const message = typeof first === 'string' ? first : JSON.stringify(first);
        try {
          const asObject = JSON.parse(message) as { message?: unknown };
          if (asObject && typeof asObject.message === 'string') {
            return stripHtml(asObject.message);
          }
        } catch {
          return stripHtml(message);
        }
      }
    } catch {
      /* fall through */
    }
  }

  if (typeof record.message === 'string' && record.message.trim()) return record.message;

  if (typeof record.exception === 'string' && record.exception.trim()) {
    // "frappe.exceptions.ValidationError: <message>" -> "<message>"
    const colon = record.exception.indexOf(': ');
    return colon >= 0 ? record.exception.slice(colon + 2) : record.exception;
  }

  return fallback;
};

const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, '').trim();
