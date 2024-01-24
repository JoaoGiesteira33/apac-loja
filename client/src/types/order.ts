export type OrderType = {
    _id: string;
    client_id: string;
    date: Date;
    shipments: ShipmentType[];
};

export type ShipmentType = {
    _id: string;
    seller_id: string;
    product_id: string;
    states: StateType[];
    shipping_proof: string;
    evaluation: EvaluationType;
};

export type StateType = {
    value: string;
    date: Date;
};

export type EvaluationType = {
    rating: number;
    comment: string;
};
