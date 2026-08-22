import React from "react";
import GameCard from "../components/GameCard";
import type { GameCardData } from "../types";
import type { GameFilters } from "./GamesFilterMenu";

interface GamesListProps {
    games: GameCardData[];
    loading: boolean;
    error: string;
    page: number;
    filters: GameFilters;
    onPageChange: (page: number) => void;
}

const GamesList: React.FC<GamesListProps> = ({
    games,
    loading,
    error,
    page,
    filters,
    onPageChange,
}) => {
    const hasNextPage =
        games.length === filters.pageSize;

    if (loading) {
        return (
            <div className="games-status">
                <div className="error-pill">
                    Loading games...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="games-status">
                <div className="error-pill">
                    {error}
                </div>
            </div>
        );
    }

    if (games.length === 0) {
        return (
            <div className="games-status">
                <div className="error-pill">
                    No games found.
                </div>
            </div>
        );
    }

    return (
        <>
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

            <div className="games-pagination">
                <button
                    disabled={page === 0}
                    onClick={() =>
                        onPageChange(page - 1)
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
                        onPageChange(page + 1)
                    }
                >
                    Next →
                </button>
            </div>
        </>
    );
};

export default GamesList;