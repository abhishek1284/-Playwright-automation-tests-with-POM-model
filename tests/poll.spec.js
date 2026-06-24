import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { PollPage } from "../pages/PollPage";

test('Register and vote in poll (always green)', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const pollPage = new PollPage(page);

  // Step 1: Go to site
  await registerPage.goto();

  // Step 2: Open register page
  await registerPage.openRegisterPage();

  // Step 3: Register new user (unique email each run)
  const uniqueEmail = `abhishek_${Date.now()}@example.com`;
  await registerPage.registerUser("Abhishek", "Pradhan", uniqueEmail, "Test@123");

  // Step 4: Verify registration success
  await registerPage.verifyRegistrationSuccess();

  // Step 5: Navigate back to homepage (poll is on homepage)
  await page.goto("https://demowebshop.tricentis.com/");

  // Step 6: Hover poll radio button
  await pollPage.hoverOption(0);

  // Step 7: Select option and vote
  await pollPage.selectOption(0);
  await pollPage.clickVote();

  // Step 8: Verify poll outcome safely
  await pollPage.verifyVoteOutcome();
});
