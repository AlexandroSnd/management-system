export type Ad = {
    id: number,
    title: string,
    price: number,
    images: string[],
    category: string,
    createdAt: string,
    description: string,
    characteristics: Record<string, string>,
    seller: Seller,
    moderationHistory: ModerationStep[],
    priority: string,
    status: string
}

export type ModerationStep = {
    moderatorName: string,
    timestamp: string,
    action: string,
    comment?: string
}

export type Seller = {
    id: string,
    name: string,
    rating: number,
    totalAds: number,
    registeredAt: string
}