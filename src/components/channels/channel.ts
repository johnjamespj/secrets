export interface Channel {
    id: string;
    name: string;
    // users: User[];
    // portal: Portal;
}

export interface Portal {
    messages: Message[]
}

export interface Message {
    timestamp: Date;
    user: User;
    message: string
}

export interface User {
    id: string;
    displayName: string;
}