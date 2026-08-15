import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GameCard from "../components/GameCard";
import { getGamesPage } from "../utils/api";
import type { GameCardData } from "../types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/Games.css";

const GENRES = [
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

const PLATFORMS = [
    { label: "All Platforms", value: "" },
    { label: "Browser", value: "1" },
    { label: "Windows", value: "2" },
    { label: "Linux", value: "3" },
    { label: "Mac", value: "4" },
];

const RECENT_OPTIONS = [
    { label: "Any Time", value: "" },
    { label: "Last 30 Days", value: "1" },
    { label: "Last 7 Days", value: "2" },
    { label: "Last 24 Hours", value: "3" },
];

const GAME_TYPES = [
    { label: "All Types", value: "" },
    { label: "Browser", value: "1" },
    { label: "Downloadable", value: "2" },
];

const PAGE_SIZES = [12, 24, 48];

type SortOption = "trending" | "newest" | "alphabetical";

interface GameFilters {
    search: string;
    sort: SortOption;
    genre: string;
    platform: string[];
    recent: string;
    gameType: string;
    pageSize: number;
}

const Games: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    /*
     * =========================
     * DRAFT FILTERS
     * =========================
     *
     * These values change freely while the user interacts
     * with the page. They do NOT trigger an API request.
     */

    const [search, setSearch] = useState(
        searchParams.get("title") || ""
    );

    const [sort, setSort] = useState<SortOption>(
        (searchParams.get("sort") as SortOption) || "trending"
    );

    const [genre, setGenre] = useState(
        searchParams.get("genre") || ""
    );

    const [platform, setPlatform] = useState<string[]>(
        searchParams.getAll("platform")
    );

    const [recent, setRecent] = useState(
        searchParams.get("recent") || ""
    );

    const [gameType, setGameType] = useState(
        searchParams.get("type") || ""
    );

    const [pageSize, setPageSize] = useState(
        Number(searchParams.get("size") || 24)
    );

    /*
     * =========================
     * APPLIED FILTERS
     * =========================
     *
     * These are the values actually being sent to the API.
     * They only change when the user presses Search.
     */

    const [appliedFilters, setAppliedFilters] = useState<GameFilters>({
        search: searchParams.get("title") || "",
        sort: (searchParams.get("sort") as SortOption) || "trending",
        genre: searchParams.get("genre") || "",
        platform: searchParams.getAll("platform"),
        recent: searchParams.get("recent") || "",
        gameType: searchParams.get("type") || "",
        pageSize: Number(searchParams.get("size") || 24),
    });

    const [page, setPage] = useState(
        Number(searchParams.get("page") || 0)
    );

    const [games, setGames] = useState<GameCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /*
    * =========================
    * SYNC URL SEARCH
    * =========================
    *
    * Keeps the Games page search in sync when the
    * navbar changes ?title= while already on /games.
    */

    useEffect(() => {
        const urlSearch = searchParams.get("title") || "";

        if (urlSearch !== appliedFilters.search) {
            setSearch(urlSearch);

            setAppliedFilters((current) => ({
                ...current,
                search: urlSearch,
            }));

            setPage(0);
        }
    }, [searchParams]);

    /*
     * =========================
     * FETCH GAMES
     * =========================
     *
     * This only runs when:
     * - Search is submitted
     * - User changes page
     *
     * Typing/search filter changes do NOT trigger this.
     */

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError("");

            try {
                const result = await getGamesPage({
                    title: appliedFilters.search || undefined,

                    genre: appliedFilters.genre
                        ? Number(appliedFilters.genre)
                        : undefined,

                    platformOS: appliedFilters.platform.length > 0
                        ? appliedFilters.platform.map(Number)
                        : undefined,

                    mostRecent: appliedFilters.recent
                        ? Number(appliedFilters.recent)
                        : undefined,

                    gameType: appliedFilters.gameType
                        ? Number(appliedFilters.gameType)
                        : undefined,

                    page,
                    size: appliedFilters.pageSize,
                });

                const content =
                    result?.data?.listGames?.content ?? [];

                const formattedGames: GameCardData[] = content.map(
                    (game: any) => ({
                        gameProfileUUID: game.gameProfileUUID,
                        title: game.title,
                        description: game.shortDesc,
                        image: game.coverImage,
                        dev: "",
                        tags: game.genre ? [game.genre] : [],
                    })
                );

                /*
                 * The API currently doesn't expose a sort parameter,
                 * so alphabetical sorting is handled client-side.
                 */
                if (appliedFilters.sort === "alphabetical") {
                    formattedGames.sort((a, b) =>
                        a.title.localeCompare(b.title)
                    );
                }

                setGames(formattedGames);
            } catch (err) {
                console.error("Failed to fetch games:", err);
                setError("Unable to load games.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [appliedFilters, page]);

    /*
     * =========================
     * SEARCH / APPLY FILTERS
     * =========================
     */

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Apply all current selections at once
        setAppliedFilters({
            search,
            sort,
            genre,
            platform,
            recent,
            gameType,
            pageSize,
        });

        // Always return to the first page after a new search/filter
        setPage(0);

        /*
         * Update URL only when the search is submitted.
         * This also means we can share/bookmark the current search.
         */
        const params = new URLSearchParams();

        if (search) params.set("title", search);
        if (sort) params.set("sort", sort);
        if (genre) params.set("genre", genre);

        platform.forEach((p) => {
            params.append("platform", p);
        });

        if (recent) params.set("recent", recent);
        if (gameType) params.set("type", gameType);

        params.set("page", "0");
        params.set("size", pageSize.toString());

        setSearchParams(params);
    };

    /*
     * =========================
     * FILTER CONTROLS
     * =========================
     *
     * These ONLY update the draft values.
     * No API call happens here.
     */

    const handleSortChange = (value: SortOption) => {
        setSort(value);
    };

    const handleGenreChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setGenre(e.target.value);
    };

    const handlePlatformChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedPlatforms = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );

        // "All Platforms" means no platform filter
        if (selectedPlatforms.includes("")) {
            setPlatform([]);
        } else {
            setPlatform(selectedPlatforms);
        }
    };

    const handleRecentChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRecent(e.target.value);
    };

    const handleGameTypeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setGameType(e.target.value);
    };

    const handlePageSizeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setPageSize(Number(e.target.value));
    };

    /*
     * =========================
     * PAGINATION
     * =========================
     *
     * Pagination DOES immediately request another page.
     * This is intentional because the user explicitly asked
     * to navigate to another page of results.
     */

    const goToPage = (newPage: number) => {
        if (newPage < 0) return;

        setPage(newPage);

        const params = new URLSearchParams();

        if (appliedFilters.search) {
            params.set("title", appliedFilters.search);
        }

        params.set("sort", appliedFilters.sort);

        if (appliedFilters.genre) {
            params.set("genre", appliedFilters.genre);
        }

        appliedFilters.platform.forEach((p) => {
            params.append("platform", p);
        });

        if (appliedFilters.recent) {
            params.set("recent", appliedFilters.recent);
        }

        if (appliedFilters.gameType) {
            params.set("type", appliedFilters.gameType);
        }

        params.set("page", newPage.toString());
        params.set("size", appliedFilters.pageSize.toString());

        setSearchParams(params);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const hasNextPage =
        games.length === appliedFilters.pageSize;

    return (
        <div className="games-page">
            <main className="games-container">

                <header className="games-header">
                    <h1>Browse Games</h1>
                    <p>
                        Discover games from the Warped Citadel.
                    </p>
                </header>

                {/* =========================
            FILTERS
            ========================= */}

                <section className="games-filters">

                    <form
                        className="games-search"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            placeholder="Search games..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            type="submit"
                            aria-label="Search"
                        >
                            <FaMagnifyingGlass />
                        </button>
                    </form>

                    <div className="filter-row">

                        <label>
                            <span>Genre</span>

                            <select
                                value={genre}
                                onChange={handleGenreChange}
                            >
                                {GENRES.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span>Platform</span>

                            <select
                                multiple
                                value={platform}
                                onChange={handlePlatformChange}
                            >
                                {PLATFORMS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span>Added</span>

                            <select
                                value={recent}
                                onChange={handleRecentChange}
                            >
                                {RECENT_OPTIONS.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span>Type</span>

                            <select
                                value={gameType}
                                onChange={handleGameTypeChange}
                            >
                                {GAME_TYPES.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                    </div>
                </section>

                {/* =========================
            SORTING + PAGE SIZE
            ========================= */}

                <section className="games-sort">

                    <div className="sort-section">

                        <div className="sort-options">
                            <span className="games-sort-label">Sort by:</span>

                            <button
                                type="button"
                                className={
                                    sort === "trending"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handleSortChange("trending")
                                }
                            >
                                Trending
                            </button>

                            <button
                                type="button"
                                className={
                                    sort === "newest"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handleSortChange("newest")
                                }
                            >
                                Newest
                            </button>

                            <button
                                type="button"
                                className={
                                    sort === "alphabetical"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handleSortChange("alphabetical")
                                }
                            >
                                A-Z
                            </button>
                        </div>
                    </div>

                    <label className="games-page-size">
                        <span>Games per page</span>

                        <select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >
                            {PAGE_SIZES.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </label>

                </section>

                {/* =========================
            RESULTS
            ========================= */}

                {loading ? (
                    <div className="games-status">
                        <div className="error-pill">
                            Loading games...
                        </div>
                    </div>
                ) : error ? (
                    <div className="games-status">
                        <div className="error-pill">
                            {error}
                        </div>
                    </div>
                ) : games.length === 0 ? (
                    <div className="games-status">
                        <div className="error-pill">
                            No games found.
                        </div>
                    </div>
                ) : (
                    <section className="games-results">
                        <div className="games-grid">
                            {games.map((game) => (
                                <GameCard
                                    key={game.gameProfileUUID}
                                    game={game}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* =========================
            PAGINATION
            ========================= */}

                {!loading && games.length > 0 && (
                    <div className="games-pagination">

                        <button
                            disabled={page === 0}
                            onClick={() =>
                                goToPage(page - 1)
                            }
                        >
                            ← Previous
                        </button>

                        <span>
                            Page {page + 1}
                        </span>

                        <button
                            disabled={!hasNextPage}
                            onClick={() =>
                                goToPage(page + 1)
                            }
                        >
                            Next →
                        </button>

                    </div>
                )}

            </main>
        </div>
    );
};

export default Games;