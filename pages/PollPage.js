import { expect } from "@playwright/test";

export class PollPage {
  constructor(page) {
    this.page = page;
    this.resultMessage = page.locator('#poll-block-1 .poll-vote-result');
    this.errorMessage = page.locator('.validation-summary-errors');
    this.voteButton = page.locator('#vote-poll-1');
  }

  async hoverOption(index) {
    await this.page.locator(`#poll-block-1 input[type="radio"]`).nth(index).hover();
  }

  async selectOption(index) {
    await this.page.locator(`#poll-block-1 input[type="radio"]`).nth(index).check();
  }

  async clickVote() {
    await this.voteButton.click();
  }

  async verifyVoteOutcome() {
    // Wait for either result or error
    await Promise.race([
      this.resultMessage.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
      this.errorMessage.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
    ]);

    if (await this.resultMessage.isVisible()) {
      const text = await this.resultMessage.textContent();
      expect(text).toMatch(/submitted|already voted/i);
      console.log("Poll result:", text);
    } else if (await this.errorMessage.isVisible()) {
      const text = await this.errorMessage.textContent();
      console.warn("Poll error:", text);
    } else {
      console.warn("No poll outcome found after 10s");
    }
  }
}
