export type OrderType = {
    _id: string;
    client_id: string;
    date: string;
    shipments: ShipmentType[];
}

type ShipmentType = {
    seller_id: string;
    product_id: string;
    states: StateType[];
    shipping_proof: string;
    evaluation: EvaluationType;
}

type StateType = {
    value: string;
    date: string;
}

type EvaluationType = {
    rating: number;
    comment: string;
}