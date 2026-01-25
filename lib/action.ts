// generics for server action results

export type ActionResult<TData = string> =
  | { ok: true; data?: TData }
  | { ok: false; error: TData };

export function ok<TData = void>(data?: TData): ActionResult<TData> {
  return { ok: true, data };
}

export function fail<TData = void>(error: TData): ActionResult<TData> {
  return { ok: false, error };
}
