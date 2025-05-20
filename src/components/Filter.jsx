import { useEffect, useState } from "react";
import "../styles/filter.css";

function Filter({ beers, setFilteredBeers }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        let filtered = beers.filter((beer) =>
            beer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortOption) {
            case "price-asc":
                filtered.sort((a, b) =>
                    (a.product_variants[0]?.price_without_tax ?? 0) - (b.product_variants[0]?.price_without_tax ?? 0)
                );
                break;
            case "price-desc":
                filtered.sort((a, b) =>
                    (b.product_variants[0]?.price_without_tax ?? 0) - (a.product_variants[0]?.price_without_tax ?? 0)
                );
                break;
            case "alcohol-asc":
                filtered.sort((a, b) =>
                    (a.alcohol_degree ?? 0) - (b.alcohol_degree ?? 0)
                );
                break;
            case "alcohol-desc":
                filtered.sort((a, b) =>
                    (b.alcohol_degree ?? 0) - (a.alcohol_degree ?? 0)
                );
                break;
            case "volume-pack-six":
                filtered.sort((a, b) =>
                    parseVolume(a.product_variants[0]?.volume) - parseVolume(b.product_variants[0]?.volume)
                );
                break;
            case "volume":
                filtered.sort((a, b) =>
                    parseVolume(b.product_variants[0]?.volume) - parseVolume(a.product_variants[0]?.volume)
            );
            case "1":
                filtered = filtered.filter((beer) => beer.category_id === 1);
                break;
            case "2":
                filtered = filtered.filter((beer) => beer.category_id === 2);
                break;
            case "3":
                filtered = filtered.filter((beer) => beer.category_id === 3);
                break;
            case "4":
                filtered = filtered.filter((beer) => beer.category_id === 4);
                break;
            default:
                break;
        }

        setFilteredBeers(filtered);
    }, [searchTerm, sortOption, beers, setFilteredBeers]);

    const handleReset = () => {
        setSearchTerm("");
        setSortOption("");
        setFilteredBeers(beers);
    };
    console.log("Filtered beers:", beers);

    return (
        <div className="filter-container">
        <h3>Filtrer les produits</h3>
        <div className="filter">
            <input
                type="text"
                placeholder="Rechercher une bière..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="filter-button">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-select"
                >
                    <option value="">-- Trier par --</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="alcohol-asc">Degré d'alcool croissant</option>
                    <option value="alcohol-desc">Degré d'alcool décroissant</option>
                    <option value="volume-pack-six">6 x 25 cl</option>
                    <option value="volume">Volume</option>
                    <option value="1">Blonde</option>
                    <option value="2">Ambrée</option>
                    <option value="3">Foncée</option>
                    <option value="4">IPA</option> 
                </select>
                <button onClick={handleReset} className="reset-button">Réinitialiser</button>
            </div>
        </div>
        </div>

    );
}

function parseVolume(volumeStr) {
    if (!volumeStr) return 0;
    // Pour "6 x 25 cl"
    const matchPack = volumeStr.match(/(\d+)\s*x\s*(\d+)\s*cl/i);
    if (matchPack) {
        return parseInt(matchPack[1], 10) * parseInt(matchPack[2], 10);
    }
    // Pour "33 cl"
    const matchSingle = volumeStr.match(/(\d+)\s*cl/i);
    if (matchSingle) {
        return parseInt(matchSingle[1], 10);
    }
    return 0;
}

export default Filter;