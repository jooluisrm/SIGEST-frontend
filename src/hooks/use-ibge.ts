// src/hooks/useibge.ts

import { useState, useEffect } from "react";
import { Estado, Cidade } from "@/types/endereco";

export const useIBGE = (selectedStateUF: string | undefined) => {
    
    const [states, setStates] = useState<Estado[]>([]);
    const [cities, setCities] = useState<Cidade[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    // Busca os estados
    useEffect(() => {
        setLoadingStates(true);
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
            .then(res => res.json())
            .then(data => setStates(data))
            .catch(err => console.error("Erro ao buscar estados:", err))
            .finally(() => setLoadingStates(false));
    }, []);

    // Busca as cidades quando o estado muda
    useEffect(() => {
        if (!selectedStateUF) {
            setCities([]);
            return;
        }
        setLoadingCities(true);
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedStateUF}/municipios`)
            .then(res => res.json())
            .then(data => setCities(data))
            .catch(err => console.error("Erro ao buscar cidades:", err))
            .finally(() => setLoadingCities(false));
    }, [selectedStateUF]);

    return { states, cities, loadingStates, loadingCities };
};