"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  FaArrowUpFromBracket,
  FaChevronDown,
  FaGripVertical,
  FaImages,
  FaMagnifyingGlass,
  FaPlus,
  FaSpinner,
  FaTrash,
} from "react-icons/fa6";

import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/admin/client";
import type { MediaFile } from "@/lib/db/media";
import { iconNames } from "@/lib/icons";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/15 aria-invalid:border-destructive";

export function FieldShell({
  label,
  help,
  error,
  htmlFor,
  children,
  className,
}: {
  label: string;
  help?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <Label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[0.8rem] font-semibold text-slate-600"
      >
        {label}
      </Label>
      {children}
      {help ? (
        <p className="mt-1 text-[0.75rem] leading-[1.5] text-slate-400">
          {help}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-1 text-[0.75rem] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The gradient run in a heading is marked with `[[brackets]]`, so the input
 * shows what the site will do with it rather than leaving the syntax a mystery.
 */
export function HeadingHint({ value }: { value: string }) {
  const parts = String(value).split(/(\[\[[^\]]*\]\])/g);
  return (
    <p className="mt-1.5 text-[0.78rem] leading-[1.5] text-slate-500">
      <span className="text-slate-400">Preview: </span>
      {parts.map((part, index) =>
        part.startsWith("[[") && part.endsWith("]]") ? (
          <span key={index} className="font-semibold text-brand">
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={index}>{part.replace(/\n/g, " ")}</span>
        ),
      )}
    </p>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  invalid,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
    <Input
      id={id}
      value={value}
      placeholder={placeholder}
      aria-invalid={invalid}
      onChange={(event) => onChange(event.target.value)}
      className={inputClass}
    />
  );
}

export function TextAreaInput({
  id,
  value,
  onChange,
  rows = 3,
  invalid,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  invalid?: boolean;
}) {
  return (
    <Textarea
      id={id}
      value={value}
      rows={rows}
      aria-invalid={invalid}
      onChange={(event) => onChange(event.target.value)}
      className={cn(inputClass, "resize-y leading-[1.7]")}
    />
  );
}

/**
 * An image field. The path can be typed in — anything already under `public/`
 * works, as does an absolute URL — but the usual route is the Upload button,
 * which stores the file in MongoDB and fills the field with the path that
 * serves it. Library reopens anything uploaded before.
 */
export function ImageInput({
  id,
  value,
  onChange,
  invalid,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [library, setLibrary] = React.useState<MediaFile[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function upload(file: File) {
    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    const result = await apiFetch<{ file: MediaFile }>("/api/admin/media", {
      method: "POST",
      body,
    });
    setUploading(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    onChange(result.data.file.url);
    // Keep the open library in step rather than refetching it.
    setLibrary((current) =>
      current ? [result.data.file, ...current] : current,
    );
    toast.success("Image uploaded.");
  }

  async function openLibrary() {
    setOpen(true);
    if (library) return;

    setLoading(true);
    const result = await apiFetch<{ files: MediaFile[] }>("/api/admin/media");
    setLoading(false);

    if (!result.ok) {
      toast.error(result.error);
      setOpen(false);
      return;
    }
    setLibrary(result.data.files);
  }

  async function remove(file: MediaFile) {
    if (!window.confirm(`Delete "${file.filename}" from the library?`)) return;

    const result = await apiFetch(`/api/admin/media/${file.id}`, {
      method: "DELETE",
    });
    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setLibrary((current) =>
      (current ?? []).filter((entry) => entry.id !== file.id),
    );
    if (value === file.url) onChange("");
  }

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {value ? (
            // A plain <img>: the path is arbitrary and may not be an optimisable
            // local asset, and this is a dashboard thumbnail rather than page art.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="size-full object-cover"
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />
          ) : (
            <span className="text-[0.65rem] text-slate-400">none</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <TextInput
            id={id}
            value={value}
            onChange={onChange}
            placeholder="/images/example.jpg"
            invalid={invalid}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                // Reset first, so picking the same file twice fires again.
                event.target.value = "";
                if (file) void upload(file);
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileInput.current?.click()}
            >
              {uploading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaArrowUpFromBracket />
              )}
              {uploading ? "Uploading…" : "Upload"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => (open ? setOpen(false) : void openLibrary())}
            >
              <FaImages />
              Library
            </Button>
            {value ? (
              <button
                type="button"
                onClick={() => onChange("")}
                className="cursor-pointer text-[0.78rem] text-slate-400 hover:text-destructive"
              >
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {open ? (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          {loading ? (
            <p className="flex items-center gap-2 px-1 py-2 text-[0.8rem] text-slate-500">
              <FaSpinner className="animate-spin" /> Loading the library…
            </p>
          ) : (library?.length ?? 0) === 0 ? (
            <p className="px-1 py-2 text-[0.8rem] text-slate-500">
              Nothing uploaded yet. Use Upload to add the first image.
            </p>
          ) : (
            <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
              {(library ?? []).map((file) => (
                <div key={file.id} className="group relative">
                  <button
                    type="button"
                    title={file.filename}
                    onClick={() => {
                      onChange(file.url);
                      setOpen(false);
                    }}
                    className={cn(
                      "block w-full cursor-pointer overflow-hidden rounded-lg border-2 bg-white transition-colors",
                      value === file.url
                        ? "border-brand"
                        : "border-transparent hover:border-brand/40",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="aspect-4/3 w-full object-cover"
                    />
                    <span className="block truncate px-1.5 py-1 text-[0.68rem] text-slate-500">
                      {file.filename}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${file.filename}`}
                    onClick={() => void remove(file)}
                    className="absolute top-1 right-1 hidden size-6 cursor-pointer place-items-center rounded-md bg-white/90 text-slate-500 shadow-sm group-hover:grid hover:text-destructive"
                  >
                    <FaTrash className="size-2.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function ColorInput({
  id,
  value,
  onChange,
  invalid,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  const safe = /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#6366f1";
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        aria-label="Pick a colour"
        value={safe}
        onChange={(event) => onChange(event.target.value)}
        className="size-9 shrink-0 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
      />
      <TextInput id={id} value={value} onChange={onChange} invalid={invalid} />
    </div>
  );
}

export function SwitchInput({
  id,
  value,
  onChange,
  label,
}: {
  id?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => onChange(!value)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        value ? "bg-brand" : "bg-slate-300",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 rounded-full bg-white shadow transition-transform",
          value ? "translate-x-[22px]" : "translate-x-[2px]",
        )}
      />
    </button>
  );
}

export function SelectInput({
  id,
  value,
  onChange,
  options,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(inputClass, "cursor-pointer appearance-none pr-9")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FaChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-3 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

/**
 * Only the icons in the registry can be picked, because only those are bundled
 * — a free-text field would let a typo blank out an icon on the live site.
 */
export function IconInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const needle = query.trim().toLowerCase();
  const matches = needle
    ? iconNames.filter((name) => name.toLowerCase().includes(needle))
    : iconNames;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={cn(inputClass, "flex cursor-pointer items-center gap-2.5 text-left")}
      >
        <Icon name={value} className="size-4 shrink-0 text-brand" />
        <span className="min-w-0 flex-1 truncate">{value || "Pick an icon"}</span>
        <FaChevronDown aria-hidden className="size-3 shrink-0 text-slate-400" />
      </button>

      {open ? (
        <div className="absolute z-50 mt-1 w-full min-w-[260px] rounded-xl border border-slate-200 bg-white p-2 shadow-[0_20px_45px_-20px_rgb(15_23_42_/_0.35)]">
          <div className="relative mb-2">
            <FaMagnifyingGlass
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-2.5 size-3 -translate-y-1/2 text-slate-400"
            />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search icons"
              className={cn(inputClass, "pl-7 text-[0.85rem]")}
            />
          </div>
          <div className="grid max-h-[220px] grid-cols-6 gap-1 overflow-y-auto">
            {matches.map((name) => (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                  setQuery("");
                }}
                className={cn(
                  "grid aspect-square cursor-pointer place-items-center rounded-lg text-[0.95rem] transition-colors",
                  name === value
                    ? "bg-brand text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-brand",
                )}
              >
                <Icon name={name} />
              </button>
            ))}
            {matches.length === 0 ? (
              <p className="col-span-6 py-4 text-center text-[0.8rem] text-slate-400">
                No icon matches &ldquo;{query.trim()}&rdquo;.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** A reorderable list of plain strings: features, tags, bullet points. */
export function StringListInput({
  values,
  onChange,
  addLabel = "Add item",
}: {
  values: string[];
  onChange: (values: string[]) => void;
  addLabel?: string;
}) {
  const list = Array.isArray(values) ? values : [];

  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length) return;
    const next = [...list];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item!);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {list.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex shrink-0 flex-col pt-1 text-slate-300">
            <button
              type="button"
              aria-label="Move up"
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
              className="cursor-pointer px-1 text-[0.6rem] leading-none hover:text-brand disabled:cursor-default disabled:opacity-30"
            >
              ▲
            </button>
            <button
              type="button"
              aria-label="Move down"
              disabled={index === list.length - 1}
              onClick={() => move(index, index + 1)}
              className="cursor-pointer px-1 text-[0.6rem] leading-none hover:text-brand disabled:cursor-default disabled:opacity-30"
            >
              ▼
            </button>
          </div>
          <Textarea
            value={item}
            rows={1}
            onChange={(event) => {
              const next = [...list];
              next[index] = event.target.value;
              onChange(next);
            }}
            className={cn(inputClass, "min-h-9 resize-y py-1.5")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Remove item"
            onClick={() => onChange(list.filter((_, i) => i !== index))}
            className="mt-0.5 shrink-0 text-slate-400 hover:text-destructive"
          >
            <FaTrash />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...list, ""])}
      >
        <FaPlus /> {addLabel}
      </Button>
    </div>
  );
}

/** The collapsible row wrapper used for every item in an object list. */
export function ListItemCard({
  title,
  index,
  count,
  onMove,
  onRemove,
  children,
}: {
  title: string;
  index: number;
  count: number;
  onMove: (to: number) => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 bg-slate-50/80 px-3 py-2">
        <FaGripVertical aria-hidden className="size-3 shrink-0 text-slate-300" />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left"
        >
          <FaChevronDown
            aria-hidden
            className={cn(
              "size-3 shrink-0 text-slate-400 transition-transform",
              open && "rotate-180",
            )}
          />
          <span className="truncate text-[0.88rem] font-semibold text-ink">
            {title || "Untitled"}
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Move up"
            disabled={index === 0}
            onClick={() => onMove(index - 1)}
            className="text-slate-400 hover:text-brand"
          >
            ▲
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Move down"
            disabled={index === count - 1}
            onClick={() => onMove(index + 1)}
            className="text-slate-400 hover:text-brand"
          >
            ▼
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Remove"
            onClick={onRemove}
            className="text-slate-400 hover:text-destructive"
          >
            <FaTrash />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="space-y-4 border-t border-slate-200 p-4">{children}</div>
      ) : null}
    </div>
  );
}
