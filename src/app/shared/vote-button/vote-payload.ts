import { VoteType } from "./votetype";

export interface VotePayload {
    voteType?: VoteType,
    postId?: number
}