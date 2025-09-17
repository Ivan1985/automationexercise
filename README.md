# Playwright Automation – automationexercise.com

This project contains automated **E2E** and **API** tests for [automationexercise.com](https://automationexercise.com), built with [Playwright](https://playwright.dev/).

---

## 📂 Project Structure

```
tests/
  auth.spec.js          # Login / Logout tests
  cart.spec.js          # Search + Add to Cart tests
  api.products.spec.js  # API tests
pages/
  home.page.js
  auth.page.js
  products.page.js
  cart.page.js
utils/
  helper.js             # utilities (unique email, masking password)
auth/
  state.json            # storage state (auto-generated)
  user.json             # test user details (auto-generated)
playwright.config.js
global-setup.mjs        # registers a user before tests
```

- **Pages** → selectors and actions (Page Object Model).  
- **Utils** → helper functions (unique email/name, password masking).  
- **Auth** → user and session data saved during global setup.  

---

## ⚙️ Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-repo/automationexercise.git
   cd automationexercise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

4. **Create a `.env` file**
   ```env
   BASE_URL=https://automationexercise.com
   TEST_PASSWORD=somePass
   NAME_PREFIX=Ivan QA
   EMAIL_PREFIX=ivan.qa
   ```

---

## ▶️ Running Tests

- Run all tests (headless):
  ```bash
  npx playwright test
  ```

- Run headed mode:
  ```bash
  npx playwright test --headed
  ```

- Run by project (browser):
  ```bash
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit
  ```

- Run only API tests:
  ```bash
  npx playwright test --grep "@API"
  ```

- Show the last HTML report:
  ```bash
  npx playwright show-report
  ```

---

## ✅ Implemented Scenarios

### **Task 1: User Registration**
- Registers a new user.
- Verifies “Account Created!” message and logged-in state.
- Password is masked in logs.

### **Task 2: Search and Add to Cart**
- Searches for *T-shirt*.  
- Opens **View Product**, captures name + price.  
- Adds product to cart.  
- Verifies in cart:  
  - Product name matches,  
  - Price matches,  
  - Quantity = 1,  
  - Total = price × quantity.

### **Task 3: Login & Logout**
- Positive flow: login with valid credentials → verify → logout.  
- Negative flow: wrong password → “Your email or password is incorrect!”.

### **API Tests**
- `GET /api/productsList` → returns 200, logs all products.  
- `POST /api/productsList` → expected 405, but currently returns 200 → marked as `fixme`.

---

## 🔄 Global Setup

Before running tests, `global-setup.mjs` will:
- Register a new user.
- Save credentials in `auth/user.json`.
- Save session in `auth/state.json`.

This ensures:  
- We don’t re-register users for every test.  
- Login tests always reuse the generated account.  

---

## 🚀 CI/CD (GitHub Actions)

- Workflow: `.github/workflows/playwright.yml`  
- Runs tests on every **push** and **pull request**.  
- Uses **GitHub Secrets** for sensitive data (`TEST_PASSWORD`, `EMAIL_PREFIX`, etc.).  
- Uploads **HTML report** as an artifact after every run.

---

## 🔒 Security

- Passwords are never logged in clear text (masked as `********`).  
- No sensitive data is hardcoded in tests.  
- Credentials are provided via `.env` (local) or GitHub Secrets (CI).

---

## 📊 Result

A complete **Playwright test automation framework** with:  
- Page Object Model structure,  
- Global user setup,  
- Positive & negative E2E scenarios,  
- API tests,  
- CI/CD pipeline with GitHub Actions,  
- Secure handling of credentials.

---

## ⚡ Quick Start

If you just want to clone and run:

```bash
git clone https://github.com/your-repo/automationexercise.git
cd automationexercise
npm install
npx playwright install --with-deps
npx playwright test
```
