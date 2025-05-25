# Radbridge Website

A modern, responsive website built with Vite and Tailwind CSS. This website replaces the previous Webflow site and provides better control, performance, and cost savings.

## 🚀 Features

- **Modern Tech Stack**: Built with Vite, Tailwind CSS, and vanilla JavaScript
- **Responsive Design**: Mobile-first design that looks great on all devices
- **Fast Performance**: Optimized builds with Vite
- **Easy Deployment**: Automated deployment to GitHub Pages
- **Cost Effective**: Free hosting with GitHub Pages (vs $160/year with Webflow)

## 📁 Project Structure

```
radbridge-website/
├── src/
│   ├── style.css           # Main CSS file with Tailwind directives
│   └── main.js            # JavaScript functionality
├── public/                # Static assets
├── index.html            # Homepage
├── about.html            # About page
├── services.html         # Services page
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🛠 Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RadbridgeRowan/radbridge-website.git
cd radbridge-website
```

2. Install dependencies

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Colors

The brand colors are defined in `tailwind.config.js`:

- `radbridge-blue`: #4A6B7C
- `radbridge-gold`: #D4A574

### Fonts

The website uses Inter font family, loaded from Google Fonts.

### Adding New Pages

1. Create a new HTML file in the root directory
2. Copy the structure from an existing page
3. Update navigation links in all pages
4. Update the footer links

### Modifying Styles

- Global styles and Tailwind configuration: `src/style.css`
- Component-specific styles: Use Tailwind utility classes in HTML
- Custom components: Add to `@layer components` in `style.css`

## 🚀 Deployment to GitHub Pages

### Automatic Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch, thanks to the workflow in `.github/workflows/deploy.yml`.

### Initial Git Setup & First Push (if starting from scratch locally)

If you've just created the project locally and need to push it to a new GitHub repository:

1.  **Navigate to your project directory:**
    ```bash
    cd radbridge-website
    ```
2.  **Initialize Git (if you haven't already):**
    ```bash
    git init
    ```
3.  **Set your Git username and email (globally or locally):**
    ```bash
    git config user.name "Your Name"
    git config user.email "your.email@example.com"
    ```
4.  **Add all files and commit:**
    ```bash
    git add .
    git commit -m "Initial commit of Radbridge website project"
    ```
5.  **Rename the default branch to `main` (if it's not already):**
    ```bash
    git branch -M main
    ```
6.  **Add your GitHub repository as the remote origin:**
    ```bash
    git remote add origin https://github.com/RadbridgeRowan/radbridge-website.git
    ```
7.  **Push your code to GitHub:**
    ```bash
    git push -u origin main
    ```

### Enabling GitHub Pages

1.  **Go to your repository on GitHub:** `https://github.com/RadbridgeRowan/radbridge-website`
2.  Navigate to **Settings** > **Pages**.
3.  Under "Build and deployment", for **Source**, select **GitHub Actions**.
    - The `deploy.yml` workflow in your `.github/workflows` directory handles the build and deployment.
    - After a successful push to the `main` branch, the GitHub Action will run, build your site, and deploy it. Your site will typically be available at `https://RadbridgeRowan.github.io/radbridge-website/`.

### Custom Domain (Optional)

1.  Add a `CNAME` file to the `public/` directory in your project. This file should contain only your custom domain (e.g., `www.yourdomain.com`).
2.  Commit and push this change.
3.  In your DNS provider's settings, configure a CNAME record (or A/AAAA records for an apex domain) to point to `RadbridgeRowan.github.io`.
4.  In your GitHub repository settings (Settings > Pages), enter your custom domain and ensure "Enforce HTTPS" is checked once the domain is verified.

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# The built files will be in the `dist/` directory
# Upload these files to your hosting provider
```

## 📝 Content Management

### Adding New Content

- **Text Content**: Edit HTML files directly
- **Images**: Add to `public/` directory and reference in HTML
- **Blog Posts**: Consider adding a markdown-based solution if needed

### Form Handling

For contact forms, consider these options:

- **Formspree**: Easy form handling service
- **Netlify Forms**: If you switch to Netlify hosting
- **EmailJS**: Client-side email sending
- **Custom Backend**: Build with Node.js/Express if needed

## 🔧 Maintenance

### Regular Updates

- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Test across different browsers and devices

### Performance Monitoring

- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Optimize images and assets as needed

## 🆚 Comparison with Webflow

| Feature        | Webflow   | Current Setup       |
| -------------- | --------- | ------------------- |
| Cost           | $160/year | Free (GitHub Pages) |
| Customization  | Limited   | Full control        |
| Performance    | Good      | Excellent           |
| SEO Control    | Limited   | Full control        |
| Learning Curve | Low       | Medium              |
| Scalability    | Limited   | High                |

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**

   - Check Node.js version (should be 18+)
   - Delete `node_modules` and run `npm install`
   - Check for syntax errors in HTML/CSS/JS

2. **Styles Not Loading**

   - Ensure Tailwind is properly configured
   - Check that `style.css` is imported in `main.js`
   - Verify PostCSS configuration

3. **GitHub Pages Not Updating**
   - Check Actions tab for build errors
   - Ensure GitHub Pages is enabled in repository settings
   - Verify the workflow file is in `.github/workflows/`

## 📞 Support

For technical issues or questions about the website:

1. Check this README first
2. Review the GitHub Issues
3. Contact the development team

## 📄 License

© 2023 Radbridge Incorporated. All rights reserved.
