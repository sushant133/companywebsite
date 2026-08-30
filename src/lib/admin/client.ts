/**
 * The dashboard's side of the admin API. Every call goes through here so error
 * handling, the JSON envelope and field-level validation messages are shaped
 * the same way everywhere.
 */

export type ApiFailure = {
  ok: false;
  error: string;
  status: number;
  /** Field path -> message, as produced by `fieldErrors` on the server. */
  fields?: Record<string, string>;
};

export type ApiSuccess<T> = { ok: true; data: T };

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { json?: unknown },
): Promise<ApiResult<T>> {
  const { json, ...rest } = init ?? {};

  try {
    const response = await fetch(path, {
      ...rest,
      headers: {
        ...(json === undefined ? {} : { "content-type": "application/json" }),
        ...rest.headers,
      },
      body: json === undefined ? rest.body : JSON.stringify(json),
      // The session cookie is what authenticates every one of these.
      credentials: "same-origin",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.ok) {
      return {
        ok: false,
        status: response.status,
        error:
          payload?.error ??
          `Request failed (${response.status}). Please try again.`,
        fields: payload?.fields,
      };
    }

    return { ok: true, data: payload.data as T };
  } catch {
    return {
      ok: false,
      status: 0,
      error: "Could not reach the server. Check your connection and try again.",
    };
  }
}

/** Reads a value at a dotted path, e.g. `contact.phones.0`. */
export function getPath(source: unknown, path: string): unknown {
  if (!path) return source;
  return path.split(".").reduce<unknown>((value, key) => {
    if (value === null || value === undefined) return undefined;
    return (value as Record<string, unknown>)[key];
  }, source);
}

/**
 * Returns a copy of `source` with `path` set to `value`. Copies rather than
 * mutating so React sees a new object and the editor re-renders.
 */
export function setPath<T>(source: T, path: string, value: unknown): T {
  if (!path) return value as T;

  const [head, ...rest] = path.split(".");
  const key = head!;

  if (Array.isArray(source)) {
    const index = Number(key);
    const next = [...source];
    next[index] = rest.length
      ? setPath(next[index], rest.join("."), value)
      : value;
    return next as T;
  }

  const base = (source ?? {}) as Record<string, unknown>;
  return {
    ...base,
    [key]: rest.length ? setPath(base[key], rest.join("."), value) : value,
  } as T;
}

export function joinPath(...parts: (string | number)[]): string {
  return parts.filter((part) => part !== "").join(".");
}
