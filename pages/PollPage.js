import { expect } from "@playwright/test";

export class PollPage {
  constructor(page) {
    this.page = page;
    this.radioOptions = page.locator('#poll-block-1 input[type="radio"]');
    this.voteButton = page.locator('#vote-poll-1');
    this.resultMessage = page.locator('#poll-block-1 .poll-vote-result');
  }

  async hoverOption(index = 0) {
    await this.radioOptions.nth(index).hover();
  }

  async selectOption(index = 0) {
    await this.radioOptions.nth(index).check();
  }

  async clickVote() {
    await this.voteButton.click();
  }

  async verifyVoteSuccess() {
    await expect(this.resultMessage).toBeVisible({ timeout: 5000 });
    const text = await this.resultMessage.textContent();
    // Accept both possible outcomes
    expect(text).toMatch(/submitted|already voted/i);
    console.log("Poll result message:", text);
  }
}
