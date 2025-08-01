export type MembershipTier = 'member' | 'vip' | 'vvip';

export interface Membership {
    id: number;
    userId: number;
    tier: MembershipTier;
    points: number;
    totalSpent: number;
    upgradedAt: string;
}


export interface User {
    id: number
    username: string
    email: string
    password: string
    phone: string
    role: 'admin' | 'member' | 'staff'
    tier: MembershipTier
    status: 'active' | 'inactive' | 'banned'
    createdAt: string
}

export interface GenreTranslation {
    locale: string
    name: string
}

export interface Genre {
    id: number
    translations: GenreTranslation[]
}

export interface MovieTranslation {
    locale: string
    name: string
    brief: string
    description: string
}

export interface Movie {
    id: number
    code: string
    translations: MovieTranslation[]
    genres: number[]
    duration: number
    posterImg: string
    trailer: string
    releaseDate: string
    status: 'coming_soon' | 'now_showing' | 'ended'
    directors: string[]
    casts: string[]
    ratings: number[]
}

export interface CinemaTranslation {
    locale: string
    name: string
    description: string
}

export interface Cinema {
    id: number
    translations: CinemaTranslation[]
    address: string
    city: string
    mapUrl: string
}

export interface Screen {
    id: number
    name: string
    cinemaId: number
    capacity: number
    type: 'standard' | 'VIP' | 'IMAX' | '3D' | '4D'
}

export interface Seat {
    id: number
    screenId: number
    row: string
    column: string
    isAvailable: boolean
}

export interface TimeSlot {
    id: number
    startTime: string
    endTime: string
    date: string
}

export interface MovieSchedule {
    id: number
    cinemaId: number
    movieId: number
    screenId: number
    timeSlotId: number
}

export interface SoldInvoice {
    id: number
    code: string
    date: string
    customerId: number
    staffId: number
    paymentMethod: 'cash' | 'credit_card' | 'momo' | 'paypal'
    createdAt: string
}

export interface Ticket {
    id: number
    price: number
    movieScheduleId: number
    seatId: number
    soldInvoiceId: number
    status: 'booked' | 'paid' | 'cancelled' | 'refunded'
    createdAt: string
}

export interface Rating {
    id: number
    userId: number
    movieId: number
    rating: number
    comment: string
    createdAt: string
}

export type VoucherType = 'percent' | 'fixed';

export interface Voucher {
    id: number;
    code: string;
    type: VoucherType;
    value: number;
    maxDiscount?: number;
    minOrder?: number;
    validFrom: string;
    validTo: string;
    usageLimit?: number;
    status: 'active' | 'inactive' | 'expired';
    description?: string;
    applicableTiers?: MembershipTier[];
}

export interface VoucherUsage {
    id: number;
    voucherId: number;
    userId: number;
    usedAt: string;
    soldInvoiceId: number;
}

export interface EventTranslation {
    locale: string;
    name: string;
    description: string;
    terms: string;
}

export interface Event {
    id: number;
    code: string;
    translations: EventTranslation[];
    type: 'discount' | 'combo' | 'special_screening' | 'giveaway';
    startDate: string;
    endDate: string;
    status: 'active' | 'inactive' | 'expired';
    image: string;

    applicableCinemas?: number[];
    applicableMovies?: number[];
    requiredTier?: MembershipTier;
}
