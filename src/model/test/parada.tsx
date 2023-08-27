export interface Parada{
    idParada?: number;
    paradaNumero?: number;
    calle?: string;
    colonia?: string;
    coordinada?: {
        latitude?: number;
        longitude?: number
    }
    tiempo?: number;
    idRuta?: number;
};