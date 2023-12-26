const HIDDEN_CLASS = "hidden";
const MARK_AS_DONE_CLASS = "checkbox-done";

// Remove Trial dialog
const dialog = document.querySelector("#top-dialog");
const closeDialog = document.querySelector("#close-top-dialog");
closeDialog.addEventListener("click", () => dialog.classList.add("hidden"));

// setup menu toggler
const menuTrigger = document.querySelector("#setup-menu");
const menuOptions = document.querySelector("#setup-options");

menuTrigger.addEventListener("click", () => {
  const isExpanded = menuTrigger.attributes["aria-expanded"].value === "true";
  menuOptions.classList.toggle(HIDDEN_CLASS);
  if (isExpanded) {
    menuTrigger.ariaExpanded = false;
  } else {
    menuTrigger.ariaExpanded = true;
  }
});

const setupItems = [
  {
    title: "Customize your online store",
    caption:
      "Choose a theme and add your logo, colors, and images to reflect your brand. Learn more",
    buttonCaption: "Customize theme",
  },
  {
    title: "Add your first product",
    caption:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    buttonCaption: "Add product",
  },
  {
    title: "Add a custom domain",
    caption:
      "Your current domain is 222219.myshopify.com but you can add a custom domain to help customers find your online store.",
    buttonCaption: "Add domain",
  },
  {
    title: "Name your store",
    caption:
      "Your temporary store name is currently Davii collections. The store name appears in your admin and your online store.",
    buttonCaption: "Name store",
  },
  {
    title: "Set up a payment provider",
    caption:
      "Choose a payment provider to start accepting payments. You’ll need to create an account with the payment provider and set it up with your Shopify store.",
    buttonCaption: "Set up payment",
  },
];

let executed = false;

function expandSetupItem(id) {
  const NOT_FOCUSED = "not-focused";
  const FOCUSED = "focused";
  const expandSetups = document.querySelectorAll("#setup-options-item");

  expandSetups.forEach((item, index) => {
    // ensure there's only one focused class and the rest will be not-focused
    if (index === id) {
      item.addEventListener("click", () => {
        item.classList.remove(NOT_FOCUSED);
        item.classList.add(FOCUSED);
      });
    } else {
      item.classList.remove(FOCUSED);
      item.classList.add(NOT_FOCUSED);
    }
  });
  // Run once (onload)
  if (!executed) {
    executed = true;
    expandSetups[0].classList.add(FOCUSED);
    expandSetups[0].classList.remove(NOT_FOCUSED);
  }
}

function setupUI() {
  const setup = document.querySelector("#setup-options");
  setup.innerHTML = setupItems.map(
    ({ title, caption, buttonCaption }, index) => {
      return `<li
      id="setup-options-item"
      key="${index}"
      role="menuitem"
      class="setup-options-item not-focused"
    >
      <div>
        <button
          id="shopping-item-checkbox"
          class="shopping-item-checkbox"
          aria-label="Mark ${title}"
          onclick="handleMark(${index})"
        >
          <svg
            class="not-completed-icon"
            id="not-completed-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke="#8A8A8A"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="4 6"
            />
          </svg>
          <svg
            class="hidden"
            id="loading-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2"
              stroke="#8A8A8A"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            class="hidden"
            id="completed-icon"
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#303030"></circle>
            <path
              d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
              fill="#fff"
            ></path>
          </svg>
        </button>
      </div>
      <div class="setup-content" 
      onclick="expandSetupItem(${index})"
      >
        <div
          class="setup-content-header"
          id="setup-content-menu"
          class="setup-content-menu"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="setup-content"
        >
          <h2 class="setup-heading">${title}</h2>
        </div>
        <div
          class="setup-content-menu"
          role="menu"
          id="setup-content"
          aria-labelledby="setup-content-menu"
        >
          <p> ${caption}
            <br /><span>Learn more</span>
          </p>
          <button>${buttonCaption}</button>
        </div>
      </div>
    </li>`;
    }
  );
  expandSetupItem();
}

function markDone({ element, completeIcon, notCompleteIcon, loadingIcon }) {
  loadingIcon.classList.remove(HIDDEN_CLASS);
  notCompleteIcon.classList.add(HIDDEN_CLASS);
  element.classList.add(MARK_AS_DONE_CLASS);
  setTimeout(() => {
    completeIcon.classList.remove(HIDDEN_CLASS);
    loadingIcon.classList.add(HIDDEN_CLASS);
  }, 1000);
}

function markNotDone({ element, completeIcon, notCompleteIcon, loadingIcon }) {
  completeIcon.classList.add(HIDDEN_CLASS);
  loadingIcon.classList.remove(HIDDEN_CLASS);
  element.classList.remove(MARK_AS_DONE_CLASS);
  setTimeout(() => {
    notCompleteIcon.classList.remove(HIDDEN_CLASS);
    loadingIcon.classList.add(HIDDEN_CLASS);
  }, 1000);
}

function handleMarkDoneOrNoteDone(element) {
  const markasDone = element.classList.contains(MARK_AS_DONE_CLASS);
  const completeIcon = element.querySelector("#completed-icon");
  const notCompleteIcon = element.querySelector("#not-completed-icon");
  const loadingIcon = element.querySelector("#loading-icon");
  // Compress them into a single unit
  const result = { element, completeIcon, notCompleteIcon, loadingIcon };
  if (markasDone) {
    markNotDone(result);
  } else {
    markDone(result);
  }

  // Control Progress
  const progress = document.getElementsByClassName(MARK_AS_DONE_CLASS).length;
  // Progress bar
  const progressTrack = document.querySelector("#progress-track");
  progressTrack.style.width = `${progress * 20}%`;

  const progressText = document.querySelector(".progress p");
  progressText.textContent = `${progress}/5 completed`;
}

function handleMark(id) {
  const checkboxButtons = document.querySelectorAll("#shopping-item-checkbox");
  checkboxButtons.forEach((element, index) => {
    if (index === id) {
      element.addEventListener("click", handleMarkDoneOrNoteDone(element));
    } else {
      return;
    }
  });
}
