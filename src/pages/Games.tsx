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

const Games: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [games, setGames] = useState<GameCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState(
        searchParams.get("title") || ""
    );

    const [sort, setSort] = useState<SortOption>(
        (searchParams.get("sort") as SortOption) || "trending"
    );

    const [genre, setGenre] = useState(
        searchParams.get("genre") || ""
    );

    const [platform, setPlatform] = useState(
        searchParams.get("platform") || ""
    );

    const [recent, setRecent] = useState(
        searchParams.get("recent") || ""
    );

    const [gameType, setGameType] = useState(
        searchParams.get("type") || ""
    );

    const [page, setPage] = useState(
        Number(searchParams.get("page") || 0)
    );

    const [pageSize, setPageSize] = useState(
        Number(searchParams.get("size") || 24)
    );

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError("");

            try {
                const result = await getGamesPage({
                    title: search || undefined,
                    genre: genre ? Number(genre) : undefined,
                    platformOS: platform ? Number(platform) : undefined,
                    mostRecent: recent ? Number(recent) : undefined,
                    gameType: gameType ? Number(gameType) : undefined,
                    page,
                    size: pageSize,
                });

                const content = result?.data?.listGames?.content ?? [];

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

                // Alphabetical sorting is done client-side because
                // the current API doesn't expose a sort parameter.
                if (sort === "alphabetical") {
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
    }, [
        search,
        genre,
        platform,
        recent,
        gameType,
        page,
        pageSize,
        sort,
    ]);

    const updateFilters = (
        updates: Record<string, string>
    ) => {
        const params: Record<string, string> = {
            title: search,
            sort,
            genre,
            platform,
            recent,
            type: gameType,
            page: page.toString(),
            size: pageSize.toString(),
            ...updates,
        };

        Object.keys(params).forEach((key) => {
            if (!params[key]) {
                delete params[key];
            }
        });

        setSearchParams(params);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        setPage(0);

        updateFilters({
            title: search,
            page: "0",
        });
    };

    const handleSortChange = (value: SortOption) => {
        setSort(value);
        setPage(0);

        updateFilters({
            sort: value,
            page: "0",
        });
    };

    const handleGenreChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;

        setGenre(value);
        setPage(0);

        updateFilters({
            genre: value,
            page: "0",
        });
    };

    const handlePlatformChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;

        setPlatform(value);
        setPage(0);

        updateFilters({
            platform: value,
            page: "0",
        });
    };

    const handleRecentChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;

        setRecent(value);
        setPage(0);

        updateFilters({
            recent: value,
            page: "0",
        });
    };

    const handleGameTypeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;

        setGameType(value);
        setPage(0);

        updateFilters({
            type: value,
            page: "0",
        });
    };

    const handlePageSizeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = Number(e.target.value);

        setPageSize(value);
        setPage(0);

        updateFilters({
            size: value.toString(),
            page: "0",
        });
    };

    const goToPage = (newPage: number) => {
        if (newPage < 0) return;

        setPage(newPage);

        updateFilters({
            page: newPage.toString(),
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const hasNextPage = games.length === pageSize;

    return (
        <div className="games-page">
            <main className="games-container">

                <header className="games-header">
                    <h1>Browse Games</h1>
                    <p>
                        Discover games from the Warped Citadel.
                    </p>
                </header>

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

                        <button type="submit" aria-label="Search">
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

                {/* Sorting */}
                <section className="games-sort">
                    <div className="sort-options">
                        <span className="games-sort-label">Sort by:</span>

                        <button
                            className={sort === "trending" ? "active" : ""}
                            onClick={() => handleSortChange("trending")}
                        >
                            Trending
                        </button>

                        <button
                            className={sort === "newest" ? "active" : ""}
                            onClick={() => handleSortChange("newest")}
                        >
                            Newest
                        </button>

                        <button
                            className={sort === "alphabetical" ? "active" : ""}
                            onClick={() => handleSortChange("alphabetical")}
                        >
                            A-Z
                        </button>
                    </div>

                    <div className="games-page-size">
                        <select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                        >
                            {PAGE_SIZES.map((size) => (
                                <option key={size} value={size}>
                                    {size} per page
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

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

                {!loading && games.length > 0 && (
                    <div className="games-pagination">
                        <button
                            disabled={page === 0}
                            onClick={() => goToPage(page - 1)}
                        >
                            ← Previous
                        </button>

                        <span>
                            Page {page + 1}
                        </span>

                        <button
                            disabled={!hasNextPage}
                            onClick={() => goToPage(page + 1)}
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