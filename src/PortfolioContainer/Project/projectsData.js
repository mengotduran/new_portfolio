import velocaris from "../../Img/Projects/velocaris.png";
import reportcard from "../../Img/Projects/reportcard.png";
import miq from "../../Img/Projects/miq.png";
import nullpluseins from "../../Img/Projects/nullpluseins.png";
import motionApp from "../../Img/Projects/motion-app.jpg";
import motionPro from "../../Img/Projects/motion-pro.jpg";

export const projects = [
  {
    id: "motion",
    title: "Motion App & Motion Pro",
    tagline: "Ride hailing platform, live in production",
    description:
      "Passenger, driver and mechanic apps published on the Play Store and App Store",
    badge: "Mobile",
    image: motionApp,
    screenshots: [motionApp, motionPro],
    overview:
      "Motion is a ride hailing platform made up of two published apps: Motion App for passengers and Motion Pro for drivers. Passengers request rides from Motion App, drivers see and accept incoming requests in Motion Pro, and the two apps communicate in real time to match trips, share live driver location and coordinate the ride from pickup to drop off. Motion Pro also has a mechanic role, letting drivers request roadside help without leaving the app.",
    features: [
      "Ride request and booking flow for passengers in Motion App",
      "Real time driver location tracking and trip matching between passenger and driver apps",
      "Driver side trip management in Motion Pro, from accepting a request through to completing the ride",
      "Separate mechanic role inside Motion Pro, mechanics list the services they currently offer",
      "In app mechanic booking for drivers, requests are routed to available mechanics through a dedicated endpoint",
      "Published and live on both the Apple App Store and Google Play Store",
    ],
    storeLinks: [
      {
        app: "Motion App (Passenger)",
        ios: "https://apps.apple.com/us/app/motion-app-easy-ride/id6761183875",
        android:
          "https://play.google.com/store/apps/details?id=com.motionride.motionrider",
      },
      {
        app: "Motion Pro (Driver & Mechanic)",
        ios: "https://apps.apple.com/us/app/motion-pro-driver-app/id6760689314",
        android:
          "https://play.google.com/store/apps/details?id=com.motionride.motionride",
      },
    ],
  },
  {
    id: "velocaris",
    title: "Velocaris",
    tagline: "Premium e-commerce platform for cars and motorcycles",
    description: "E-commerce platform for premium cars and motorcycles",
    badge: "E-Commerce",
    image: velocaris,
    live: "https://velocaris.vercel.app/",
    overview:
      "Velocaris is a full featured e-commerce platform built for automotive enthusiasts. It showcases a curated catalog of premium cars and motorcycles, including supercars, sport bikes, muscle cars and adventure vehicles, with a sleek, dark, editorial style storefront.",
    features: [
      "Browsable catalog with category filters (Supercars, Sport Bikes, Muscle Cars, Adventure)",
      "New arrival and sale badges across the product range",
      "User accounts with sign up and login",
      "Wishlist for saving liked vehicles",
      "Shopping cart and checkout flow",
      "Order history and order tracking",
      "FAQ, shipping policy and returns information",
      "Newsletter sign up for new releases and exclusive offers",
    ],
    credentials: [
      { role: "Admin", email: "doe@gmail.com", password: "Johndoe4#" },
    ],
    credentialsNote:
      "Regular customer accounts can be created directly from the website's sign up page.",
  },
  {
    id: "reportcard",
    title: "Report Card",
    tagline: "School report card management system",
    description: "School management system for student report cards",
    badge: "EdTech",
    image: reportcard,
    live: "https://reportcard-web.vercel.app/login",
    overview:
      "Report Card is a school management web application that lets schools generate, design and distribute student report cards digitally. Administrators and class teachers can manage students, classes, subjects and grades, then design branded report cards ready for print or download.",
    features: [
      "Dashboards for Admin and Class Master (teacher) roles",
      "Student, class, subject and term management",
      "Grading module for recording scores and computing results",
      "Report card designer with multiple templates (Classic GCE, Bilingual, Modern, Official)",
      "Custom branding, including school logo, watermark, colors and layout",
      "Generated report cards ready for export per term and session",
    ],
    credentials: [
      { role: "Admin", email: "recruiter@demo.com", password: "demo1234" },
      { role: "Class Master", email: "teacher@demo.com", password: "demo1234" },
    ],
    credentialsNote:
      "Accounts on this platform are provisioned by the school administrator, there is no public sign up.",
  },
  {
    id: "miq",
    title: "MiQ",
    tagline: "Discrimination reporting and mapping platform for NRW",
    description: "Professional client project, discrimination reporting platform",
    badge: "Client Work",
    image: miq,
    live: "https://miq.nrw/de",
    overview:
      "MiQ is a reporting and information center for North Rhine Westphalia (NRW) where people who have experienced or witnessed discrimination can submit a report. The platform guides reporters through what can be reported, who can report, and in which languages, then collects the details of the incident, including where it happened.",
    features: [
      "Guided incident reporting form covering what happened, where and who was involved",
      "Interactive map that plots reported incidents to visualize where discrimination is occurring across the region",
      "Multi language support for submitting reports",
      "Informational FAQ section explaining the reporting process and reporters' rights",
      "Resources and contact options for follow up support and advice",
    ],
  },
  {
    id: "nullpluseins",
    title: "0+1 Festival",
    tagline: "Event platform for the 0+1 Festival (Diversity and Complexity)",
    description: "Professional client project, festival event platform",
    badge: "Client Work",
    image: nullpluseins,
    live: "https://nullpluseinsfestival.de/#/",
    overview:
      "The 0+1 Festival (Nullpluseins) is a festival for diversity and complexity based in Dortmund. The website presents the festival's program of talks and discussions with invited experts, and allows visitors to register for events directly online.",
    features: [
      "Festival program listing with event dates, times and venues",
      "Profiles of invited speakers and experts",
      "Online registration for individual events and discussions",
      "About Us and archive pages covering past editions of the festival",
      "Contact section for inquiries",
    ],
  },
  {
    id: "gpt-from-scratch",
    title: "GPT From Scratch",
    tagline: "A GPT style transformer built from scratch, plus a RoPE ablation study",
    description: "Currently building, a transformer language model from scratch",
    badge: "In Progress",
    comingSoon: true,
    overview:
      "A from scratch implementation of a GPT style transformer language model in pure PyTorch, no Hugging Face transformers library involved. The project trains a baseline model with learned positional embeddings alongside a second variant using Rotary Position Embeddings (RoPE), then compares the two head to head on validation perplexity and sample text generations.",
    features: [
      "Custom MultiHeadAttention module with scaled dot product attention and causal masking via torch.tril",
      "TransformerBlock combining attention, a GELU feed forward MLP, LayerNorm and residual connections, stacked 4 to 6 layers at nanoGPT scale (around 10 to 25M parameters)",
      "Baseline model with learned positional embeddings vs a RoPE variant that rotates query and key vectors with sine and cosine before the attention dot product",
      "Custom training loop with AdamW optimizer, cross entropy next token loss, cosine learning rate schedule with warmup, and mixed precision training",
      "Character level or BPE (tiktoken) tokenizer trained on a custom corpus of lecture notes and exam papers, blended with a general text corpus for fluency",
      "Evaluation via held out validation perplexity, comparing the baseline and RoPE models under identical training conditions",
      "Experiment tracking with Weights & Biases and training on a free Colab/Kaggle T4 GPU",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "NumPy",
      "tiktoken",
      "Matplotlib",
      "tqdm",
      "Weights & Biases",
      "Jupyter",
      "Google Colab / Kaggle",
    ],
  },
];

export const getProjectById = (id) => projects.find((p) => p.id === id);
