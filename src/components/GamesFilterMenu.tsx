import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import FilterDropdown from "./UI/FilterDropdown";
import FilterDropdownMultiselect from "./UI/FilterDropdownMultiselect";

export const GENRES = [
    { label: "All Genres", value: "" },
    { label: "Action", value: "1" },
    { label: "Adventure", value: "2" },
    { label: "Platformer", value: "3" },
    { label: "Role playing", value: "4" },
    { label: "Survival", value: "5" },
    { label: "Racing", value: "6" },
    { label: "Strategy", value: "7" },
    { label: "Puzzle", value: "8" },
    { label: "Simulation", value: "9" },
    { label: "Sports", value: "10" },
];

export const PLATFORMS = [
    { label: "All Platforms", value: "" },
    { label: "Browser", value: "1" },
    { label: "Windows", value: "2" },
    { label: "Linux", value: "3" },
    { label: "Mac", value: "4" },
];

export const RECENT_OPTIONS = [
    { label: "Any Time", value: "" },
    { label: "Last 30 Days", value: "1" },
    { label: "Last 7 Days", value: "2" },
    { label: "Last 24 Hours", value: "3" },
];

export const GAME_TYPES = [
    { label: "All Types", value: "" },
    { label: "Browser", value: "1" },
    { label: "Downloadable", value: "2" },
];

export const PAGE_SIZES = [12, 24, 48];

export type SortOption =
    | "trending"
    | "newest"
    | "alphabetical";

export interface GameFilters {
    search: string;
    sort: SortOption;
    genre: string;
    platform: string[];
    recent: string;
    gameType: string;
    pageSize: number;
}

interface GamesFilterMenuProps {
    filters: GameFilters;
    onChange: (
        filters: GameFilters
    ) => void;
    onSearch: () => void;
}

const GamesFilterMenu: React.FC<GamesFilterMenuProps> = ({
    filters,
    onChange,
    onSearch,
}) => {
    const updateFilter = <K extends keyof GameFilters>(
        key: K,
        value: GameFilters[K]
    ) => {
        onChange({
            ...filters,
            [key]: value,
        });
    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <>
            <section className="games-filters">
                <form
                    className="games-search"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={filters.search}
                        onChange={(e) =>
                            updateFilter(
                                "search",
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="submit"
                        aria-label="Search"
                    >
                        <FaMagnifyingGlass />
                    </button>
                </form>

                <div className="filter-row">
                    <FilterDropdown
                        label="Genre"
                        value={filters.genre}
                        options={GENRES}
                        onChange={(value) =>
                            updateFilter(
                                "genre",
                                value
                            )
                        }
                    />

                    <FilterDropdownMultiselect
                        label="Platform"
                        values={filters.platform}
                        options={PLATFORMS}
                        allLabel="All Platforms"
                        onChange={(values) =>
                            updateFilter(
                                "platform",
                                values
                            )
                        }
                    />

                    <FilterDropdown
                        label="Added"
                        value={filters.recent}
                        options={RECENT_OPTIONS}
                        onChange={(value) =>
                            updateFilter(
                                "recent",
                                value
                            )
                        }
                    />

                    <FilterDropdown
                        label="Type"
                        value={filters.gameType}
                        options={GAME_TYPES}
                        onChange={(value) =>
                            updateFilter(
                                "gameType",
                                value
                            )
                        }
                    />
                </div>
            </section>

            <section className="games-sort">
                <div className="sort-section">
                    <div className="sort-options">
                        <span className="games-sort-label">
                            Sort by:
                        </span>

                        <button
                            type="button"
                            className={
                                filters.sort ===
                                "trending"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                updateFilter(
                                    "sort",
                                    "trending"
                                )
                            }
                        >
                            Trending
                        </button>

                        <button
                            type="button"
                            className={
                                filters.sort ===
                                "newest"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                updateFilter(
                                    "sort",
                                    "newest"
                                )
                            }
                        >
                            Newest
                        </button>

                        <button
                            type="button"
                            className={
                                filters.sort ===
                                "alphabetical"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                updateFilter(
                                    "sort",
                                    "alphabetical"
                                )
                            }
                        >
                            A-Z
                        </button>
                    </div>
                </div>

                <label className="games-page-size">
                    <span>Games per page</span>

                    <select
                        value={filters.pageSize}
                        onChange={(e) =>
                            updateFilter(
                                "pageSize",
                                Number(e.target.value)
                            )
                        }
                    >
                        {PAGE_SIZES.map((size) => (
                            <option
                                key={size}
                                value={size}
                            >
                                {size}
                            </option>
                        ))}
                    </select>
                </label>
            </section>
        </>
    );
};

export default GamesFilterMenu;