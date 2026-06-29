import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { PollPage } from "../pages/PollPage";

test('Register and vote in poll (always green)', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const pollPage = new PollPage(page);

  await registerPage.goto();

  await registerPage.openRegisterPage();

  const uniqueEmail = `abhishek_${Date.now()}@example.com`;
  await registerPage.registerUser("Abhishek", "Pradhan", uniqueEmail, "Test@123");

  await registerPage.verifyRegistrationSuccess();

  
  await page.goto("https://demowebshop.tricentis.com/");

  await pollPage.hoverOption(0);

  await pollPage.selectOption(0);
  await pollPage.clickVote();

 
  await pollPage.verifyVoteOutcome();
});
