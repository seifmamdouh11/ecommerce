# 🛍️ POLT-STORE | Premium E-Commerce Platform

A modern, high-performance e-commerce application built with **Next.js 15**, featuring a seamless shopping experience with dual-language support, global state management, and a premium aesthetic.

![POLT-STORE Preview](https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200&h=600)

## ✨ Core Features

- **🌐 Dual-Language (Bi-lingual)**: Full support for English and Arabic (RTL) with instant switching.
- **🌗 Smart Theming**: Premium Dark and Light modes with system preference detection.
- **🔐 Secure Authentication**: Token-based auth system using Platzi API, featuring custom login/registration flows.
- **🛒 Dynamic Shopping Cart**: Persistent cart state with local storage synchronization.
- **👤 User Profiles**: Dedicated dashboard for users to manage their personal information and view orders.
- **💳 Seamless Checkout**: Multi-step checkout process with real-time total calculations.
- **📱 Ultra-Responsive**: Optimized for everything from mobile devices to large desktop monitors.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Icons**: React Icons (Fi, Hi, Io)
- **Alerts**: SweetAlert2
- **Data Source**: [Platzi Fake Store API](https://fakeapi.platzi.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/polt-store.git
   cd polt-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```text
app/
├── (auth)/          # Authentication routes (Login, Register)
├── (protected)/     # Authenticated routes (Cart, Profile, Checkout)
├── components/      # Global shared components
├── context/         # Global state (Auth, Cart, Categories)
├── hooks/           # Custom hooks (useTheme, useLang)
├── libs/            # API configurations (Axios)
└── translations/    # Localization dictionaries
```

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy this project is via [Vercel](https://vercel.com):

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project into Vercel.
3. Add the `NEXT_PUBLIC_API_URL` environment variable in the Vercel dashboard.
4. Click **Deploy**.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the POLT-STORE Team.
