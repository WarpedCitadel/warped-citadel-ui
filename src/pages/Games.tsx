import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getGamesPage } from "../utils/api";
import type { GameCardData } from "../types";
import GamesFilterMenu, { type GameFilters, type SortOption, } from "../components/GamesFilterMenu";
import GamesList from "../components/GamesList";
import "../styles/Games.css";

const Games: React.FC = () => {
    const [
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    /*
     * =========================
     * DRAFT FILTERS
     * =========================
     */

    const [
        filters,
        setFilters,
    ] = useState<GameFilters>({
        search:
            searchParams.get("title") || "",

        sort:
            (searchParams.get(
                "sort"
            ) as SortOption) || "trending",

        genre:
            searchParams.get("genre") || "",

        platform:
            searchParams.getAll("platform"),

        recent:
            searchParams.get("recent") || "",

        gameType:
            searchParams.get("type") || "",

        pageSize:
            Number(
                searchParams.get("size") || 24
            ),
    });

    /*
     * =========================
     * APPLIED FILTERS
     * =========================
     */

    const [
        appliedFilters,
        setAppliedFilters,
    ] = useState<GameFilters>({
        search:
            searchParams.get("title") || "",

        sort:
            (searchParams.get(
                "sort"
            ) as SortOption) || "trending",

        genre:
            searchParams.get("genre") || "",

        platform:
            searchParams.getAll("platform"),

        recent:
            searchParams.get("recent") || "",

        gameType:
            searchParams.get("type") || "",

        pageSize:
            Number(
                searchParams.get("size") || 24
            ),
    });

    const [
        page,
        setPage,
    ] = useState(
        Number(
            searchParams.get("page") || 0
        )
    );

    const [
        games,
        setGames,
    ] = useState<GameCardData[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    /*
     * =========================
     * SYNC URL SEARCH
     * =========================
     */

    useEffect(() => {
        const urlSearch =
            searchParams.get("title") || "";

        if (
            urlSearch !==
            appliedFilters.search
        ) {
            setFilters((current) => ({
                ...current,
                search: urlSearch,
            }));

            setAppliedFilters(
                (current) => ({
                    ...current,
                    search: urlSearch,
                })
            );

            setPage(0);
        }
    }, [searchParams]);

    /*
     * =========================
     * FETCH GAMES
     * =========================
     */

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError("");

            try {
                const result =
                    await getGamesPage({
                        title:
                            appliedFilters.search ||
                            undefined,

                        genre:
                            appliedFilters.genre
                                ? Number(
                                      appliedFilters.genre
                                  )
                                : undefined,

                        platformOS:
                            appliedFilters.platform
                                .length > 0
                                ? appliedFilters.platform.map(
                                      Number
                                  )
                                : undefined,

                        mostRecent:
                            appliedFilters.recent
                                ? Number(
                                      appliedFilters.recent
                                  )
                                : undefined,

                        gameType:
                            appliedFilters.gameType
                                ? Number(
                                      appliedFilters.gameType
                                  )
                                : undefined,

                        page,

                        size:
                            appliedFilters.pageSize,
                    });

                const content =
                    result?.data?.listGames
                        ?.content ?? [];

                const formattedGames: GameCardData[] =
                    content.map(
                        (game: any) => ({
                            gameProfileUUID:
                                game.gameProfileUUID,

                            title:
                                game.title,

                            description:
                                game.shortDesc,

                            image:
                                game.coverImage,

                            dev: "",

                            tags:
                                game.genre
                                    ? [game.genre]
                                    : [],
                        })
                    );

                /*
                 * API currently does not expose
                 * sorting, so A-Z is client-side.
                 */

                if (
                    appliedFilters.sort ===
                    "alphabetical"
                ) {
                    formattedGames.sort(
                        (a, b) =>
                            a.title.localeCompare(
                                b.title
                            )
                    );
                }

                setGames(formattedGames);
            } catch (err) {
                console.error(
                    "Failed to fetch games:",
                    err
                );

                setError(
                    "Unable to load games."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [appliedFilters, page]);

    /*
     * =========================
     * APPLY FILTERS
     * =========================
     */

    const handleSearch = () => {
        setAppliedFilters(filters);
        setPage(0);

        const params =
            new URLSearchParams();

        if (filters.search) {
            params.set(
                "title",
                filters.search
            );
        }

        if (filters.sort) {
            params.set(
                "sort",
                filters.sort
            );
        }

        if (filters.genre) {
            params.set(
                "genre",
                filters.genre
            );
        }

        filters.platform.forEach(
            (platform) => {
                params.append(
                    "platform",
                    platform
                );
            }
        );

        if (filters.recent) {
            params.set(
                "recent",
                filters.recent
            );
        }

        if (filters.gameType) {
            params.set(
                "type",
                filters.gameType
            );
        }

        params.set("page", "0");

        params.set(
            "size",
            filters.pageSize.toString()
        );

        setSearchParams(params);
    };

    /*
     * =========================
     * PAGINATION
     * =========================
     */

    const goToPage = (
        newPage: number
    ) => {
        if (newPage < 0) {
            return;
        }

        setPage(newPage);

        const params =
            new URLSearchParams();

        if (appliedFilters.search) {
            params.set(
                "title",
                appliedFilters.search
            );
        }

        params.set(
            "sort",
            appliedFilters.sort
        );

        if (appliedFilters.genre) {
            params.set(
                "genre",
                appliedFilters.genre
            );
        }

        appliedFilters.platform.forEach(
            (platform) => {
                params.append(
                    "platform",
                    platform
                );
            }
        );

        if (appliedFilters.recent) {
            params.set(
                "recent",
                appliedFilters.recent
            );
        }

        if (appliedFilters.gameType) {
            params.set(
                "type",
                appliedFilters.gameType
            );
        }

        params.set(
            "page",
            newPage.toString()
        );

        params.set(
            "size",
            appliedFilters.pageSize.toString()
        );

        setSearchParams(params);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="games-page">
            <main className="games-container">

                <header className="games-header">
                    <h1>
                        Browse Games
                    </h1>

                    <p>
                        Discover games from
                        the Warped Citadel.
                    </p>
                </header>

                <GamesFilterMenu
                    filters={filters}
                    onChange={setFilters}
                    onSearch={handleSearch}
                />

                <GamesList
                    games={games}
                    loading={loading}
                    error={error}
                    page={page}
                    filters={appliedFilters}
                    onPageChange={goToPage}
                />

            </main>
        </div>
    );
};

export default Games;