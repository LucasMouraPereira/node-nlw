type Massage = { pollOptionId: string; votes: number };
type Subscriber = (massage: Massage) => void;

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {};
  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    this.channels[pollId].push(subscriber);
  }

  publish(pollId: string, massage: Massage) {
    if (!this.channels[pollId]) {
      return;
    }
    for (const subscriber of this.channels[pollId]) {
      subscriber(massage);
    }
  }
}

export const voting = new VotingPubSub();
