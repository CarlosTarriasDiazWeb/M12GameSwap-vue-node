import type { Product } from "./Product";
import type { UserClient } from "./UserClient";

export interface Purchase {
    purchase_id: number,
    purchase_created_at: Date,
    post: Product,
    user?: UserClient
}