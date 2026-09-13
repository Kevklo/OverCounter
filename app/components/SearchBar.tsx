"use client";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search hero...",
}: SearchBarProps) => {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-linear-to-b from-slate-50 via-slate-200 to-slate-400 p-1.5 shadow-md">
        <span className="pointer-events-none flex items-center pl-3 text-slate-500">
          <svg
            className="h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </span>
        <input
          type="search"
          id="search"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="m-1 w-full min-w-0 bg-transparent px-2 py-2 text-sm text-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
